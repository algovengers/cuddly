import type { Request, Response } from "express";
import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler";
import { prisma } from "../utils/prisma";
import { uploadOnCloudinary } from "../utils/cloudinary";
import ApiResponse from "../utils/ApiResponse";

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
    console.log("here")
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
  res.status(200).json(new ApiResponse(200, data, "Pet Created"));
});

type Animal = "dog" | "cat"

const explorePets = asyncHandler(async(req:Request,res:Response)=>{
  let query = req.query as Record<string,string>
  console.log(query)
  for(let q in query){
    if(query[q].length===0){
      delete query[q]
    }
  }
  let age = 0
  if(query.age){
    age = parseInt(query['age'],10)
  }
  const data = await prisma.pet.findMany({
    where : {
      weight : query['weight'],
      age :{
        gte : age
      },
      breed : query['breed'],
      city : query['city'],
      color : query['color'],
      gender : query['gender'],
      personality : query['personality'],
      type : query['type'] as Animal
    }
  })
  // console.log(data)
  res.status(200).json(new ApiResponse(200,data))
})

export { uploadPet,explorePets };
