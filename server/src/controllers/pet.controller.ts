import type { Request, Response } from "express";
import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler";
import { exclude, prisma } from "../utils/prisma";
import { uploadOnCloudinary } from "../utils/cloudinary";
import ApiResponse from "../utils/ApiResponse";
import redisClient from "../utils/redis";
import dotenv from "dotenv";
dotenv.config();

const pet_schema = z.object({
  color: z.string(),
  type: z.enum(["cat", "dog"]),
  breed: z.string(), // can be enum
  gender: z.enum(["male", "female"]),
  personality: z.string(),
  city: z.string(),
  weight: z.enum(["0-15", "15-30", "30-45", "45+"]),
  age: z.string(),
  name: z.string(),
});

const uploadPet = asyncHandler(async (req: Request, res: Response) => {
  console.log("here");
  const pet = req.body;
  const filteredPet = pet_schema.parse(pet);
  const userId = req.user?.id!;

  const imagePath = req.file!.path;
  const response = await uploadOnCloudinary(imagePath);
  const data = await prisma.pet.create({
    data: {
      age: Number(filteredPet.age),
      breed: filteredPet.breed,
      city: filteredPet.city,
      color: filteredPet.color,
      gender: filteredPet.gender,
      Image: response?.url!,
      name: filteredPet.name,
      personality: filteredPet.personality,
      type: filteredPet.type,
      weight: filteredPet.weight,
      userId,
    },
  });
  storePetRedis({
    age: Number(filteredPet.age),
    breed: filteredPet.breed,
    city: filteredPet.city,
    color: filteredPet.color,
    gender: filteredPet.gender,
    Image: response?.url!,
    name: filteredPet.name,
    personality: filteredPet.personality,
    type: filteredPet.type,
    weight: filteredPet.weight,
    userId,
    id: data.id,
  });

  res.status(200).json(new ApiResponse(200, data, "Pet Created"));
});

type Animal = "dog" | "cat";

const explorePets = asyncHandler(async (req: Request, res: Response) => {
  // console.log("explore:", req.query);
  let query = req.query as Record<string, string>;
  for (let q in query) {
    if (query[q].length === 0) {
      delete query[q];
    }
  }
  let age = 0;
  if (query.age) {
    age = parseInt(query["age"], 10);
  }
  let color = query["color"]?.split("%2C");

  try {
    // console.log("kk");
    const isCached = await getIsCached();
    // console.log("isCached", isCached);

    if (isCached) {
      // console.log(isCached);
      const data: any = await getPetsRedis({
        weight: query["weight"],
        age: query["age"], // need to talk to afeef or rohit !rem
        breed: query["breed"],
        city: query["city"],
        color: color, // need to talk to afeef or rohit !rem
        gender: query["gender"],
        personality: query["personality"],
        type: query["type"], // need to talk to afeef or rohit !rem
      });

      // console.log(data);
      const jsonData = data.map((each: string) => JSON.parse(each));
      console.log("data from redis");

      return res.status(200).json(new ApiResponse(200, jsonData));
    } else {
      throw new Error("no cache found!");
    }
  } catch (err: any) {
    // console.log("errrrr", err);
    console.log("fallback in err");
    const data = await prisma.pet.findMany({
      where: {
        weight: query["weight"],
        age: {
          gte: age,
        },
        breed: query["breed"],
        city: query["city"],
        color: { in: color },
        gender: query["gender"],
        personality: query["personality"],
        type: query["type"] as Animal,
      },
    });

    // console.log(data);
    res.status(200).json(new ApiResponse(200, data));

    await storeAllPetsRedis(data);
    setIsCached();
  }
});

const getPet = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await prisma.pet.findFirstOrThrow({
    where: {
      id,
    },
    include: {
      owner: true,
    },
  });
  const filteredData = {
    ...data,
    owner: exclude(data.owner, ["password", "refreshToken"]),
  };
  res.status(200).json(new ApiResponse(200, filteredData));
});

async function storePetRedis(filteredPet: any) {
  const petKey = `cuddly_v1:${filteredPet.type}:${filteredPet.breed}:${filteredPet.personality}:${filteredPet.color}:${filteredPet.age}:${filteredPet.city}:${filteredPet.gender}:${filteredPet.weight}:${filteredPet.id}`;

  redisClient.setex(
    petKey,
    Number(process.env.REDIS_DEF_EXP),
    JSON.stringify(filteredPet)
  );
}

function getIsCached() {
  return new Promise((resolve: any, reject: any) => {
    redisClient.get("cuddly_v1_cached", (err: any, results: any) => {
      // console.log("res", results);
      if (err) {
        reject(err);
        return null;
      }
      if (results === "true") {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
}

function setIsCached() {
  redisClient.setex(
    "cuddly_v1_cached",
    Number(process.env.REDIS_DEF_EXP),
    "true"
  );
}

function storeAllPetsRedis(data: any) {
  return new Promise((resolve: any, reject: any) => {
    const pipeline = redisClient.pipeline();

    data.forEach((item: any) => {
      const petKey = `cuddly_v1:${item.type}:${item.breed}:${item.personality}:${item.color}:${item.age}:${item.city}:${item.gender}:${item.weight}:${item.id}`;

      pipeline.setex(
        petKey,
        Number(process.env.REDIS_DEF_EXP),
        JSON.stringify(item)
      );
    });

    pipeline.exec((err: any, results: any) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
    console.log("Data catched all");
  });
}

function getPetsRedis(filters: any) {
  // console.log("filters", filters);
  return new Promise(async (resolve: any, reject: any) => {
    try {
      let allValues: Array<any> = [];
      if (filters.color && filters.color?.length !== 0) {
        for (const eachColor of filters.color) {
          allValues = allValues.concat(
            await getPetsForEachColor({ ...filters, color: eachColor })
          );
        }
      } else {
        allValues = allValues.concat(
          await getPetsForEachColor({ ...filters, color: "*" })
        );
      }
      // console.log("aalval", allValues);
      resolve(allValues);
    } catch (err) {
      reject(err);
    }
  });
}

function getPetsForEachColor(filters: any) {
  return new Promise((resolve: any, reject: any) => {
    const petKey = `cuddly_v1:${filters.type || "*"}:${filters.breed || "*"}:${
      filters.personality || "*"
    }:${filters.color || "*"}:${filters.age || "*"}:${filters.city || "*"}:${
      filters.gender || "*"
    }:${filters.weight || "*"}:*`;

    redisClient.keys(petKey, (err: any, keys: any) => {
      if (err) {
        reject(err);
        return null;
      }
      const pipeline = redisClient.pipeline();

      keys.forEach((key: any) => {
        pipeline.get(key);
      });

      pipeline.exec((err: any, results: any) => {
        if (err) {
          reject(err);
          return null;
        }

        const values = results.map(([err, value]: Array<any>) => {
          if (err) {
            reject(err);
            return null;
          }
          return value;
        });

        resolve(values);
      });
    });
  });
}

const clearcache = asyncHandler(async (req: Request, res: Response) => {
  redisClient.flushdb(() => {
    console.log("Redis Flushed!");
    res.status(200).json({ msg: "Redis Flushed" });
  });
});

export { uploadPet, explorePets, getPet, clearcache };
