import React, { useEffect, useState } from "react";
import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import PetCard from "@/components/PetCard";
import axios from "axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";

const filter_schema = z.object({
  color: z.array(z.string()).optional(),
  type: z.optional(z.enum(["cat", "dog"])),
  breed: z.string().optional(), // can be enum
  gender: z.enum(["male", "female"]).optional(),
  personality: z.string().optional(),
  city: z.string().optional(),
  weight: z.enum(["0-15", "15-30", "30-45", "45+"]).optional(),
  age: z.string().optional(),
});

type Filters = z.infer<typeof filter_schema>;

type typeSchema = "cat" | "dog";


function Discover() {
  const [data, setData] = useState<Array<any>>();
  const [type, setType] = useState<"cat" | "dog" | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const getData = async () => {
      let data = await axios.get(
        `${import.meta.env.VITE_BACKEND_PATH}/api/explore?` + searchParams
      );
      data = data.data;
      console.log(data.data);
      setData(data?.data);
    };
    getData();
  }, [searchParams]);
  const form = useForm<Filters>({
    resolver: zodResolver(filter_schema),
  });

  const onSubmit = (e) => {
    console.log("yes");
    console.log(e);
    for (let i in e) {
      if (e[i] === undefined) {
        delete e[i];
      }
    }
    if (e["color"]) e["color"] = encodeURIComponent(e["color"].join(","));
    setSearchParams(e);
  };
  // useEffect(()=>{
  //   const res =
  // },[searchParams])
  const handleClearFilters =()=>{
    setSearchParams({})
  }
  return (
    <>

    <Navbar  />
    <div className="flex h-full w-full justify-center z-10">
      <div className="max-w-7xl w-full p-4">
        <div className="w-full text-center">
          <div className="text-3xl my-8">
            Yay we found {data ? data.length : 0} pets for you
          </div>

          <div className="flex justify-between">
            <div className="">
              <Sheet>
                <SheetTrigger>
                  <Button variant="outline">Filters</Button>
                </SheetTrigger>
                <SheetContent side={"left"} className="z-[2000]">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <SheetHeader>
                        <SheetTitle>Apply filters</SheetTitle>
                        <SheetDescription className="text-left">
                          <div className="overflow-y-auto max-h-[82vh] mb-3">
                            <div className="py-4">
                              <h2 className="mb-4 font-semibold text-gray-600">
                                Animal
                              </h2>
                              <FormField
                                name="type"
                                control={form.control}
                                render={({ field }) => {
                                  return (
                                    <FormItem>
                                      <RadioGroup
                                        onValueChange={(e) => {
                                          field.onChange(e);
                                          setType(e as typeSchema);
                                        }}
                                        defaultValue={searchParams.get("type")}
                                        >
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem
                                            value="cat"
                                            id="type"
                                            />
                                          <Label htmlFor="cat">Cat</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem
                                            value="dog"
                                            id="type"
                                          />
                                          <Label htmlFor="dog">Dog</Label>
                                        </div>
                                      </RadioGroup>
                                    </FormItem>
                                  );
                                }}
                              />
                            </div>
                            <div className="py-4 ">
                              <h2 className="mb-4 font-semibold text-gray-600">
                                Weight
                              </h2>
                              <FormField
                                name="weight"
                                control={form.control}
                                render={({ field }) => {
                                  return (
                                    <FormItem>
                                      <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={searchParams.get(
                                          "weight"
                                        )}
                                        >
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem
                                            value="0-15"
                                            id="0-15"
                                            />
                                          <Label htmlFor="0-15">0-15 kg</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem
                                            value="15-30"
                                            id="15-30"
                                            />
                                          <Label htmlFor="15-30">
                                            15-30 kg
                                          </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem
                                            value="30-45"
                                            id="30-45"
                                            />
                                          <Label htmlFor="30-45">
                                            30-45 kg
                                          </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem
                                            value="45+"
                                            id="45+"
                                            />
                                          <Label htmlFor="45+">45+ kg</Label>
                                        </div>
                                      </RadioGroup>
                                    </FormItem>
                                  );
                                }}
                              />
                            </div>
                            {type !== null && (
                              <div className="py-4">
                                <h2 className="mb-4 font-semibold text-gray-600">
                                  Breed
                                </h2>
                                {type === "cat" && (
                                  <FormField
                                    control={form.control}
                                    name="breed"
                                    render={({ field }) => {
                                      return (
                                        <FormItem>
                                          <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={searchParams.get(
                                              "breed"
                                            )}
                                            >
                                            <div className="flex items-center space-x-2">
                                              <RadioGroupItem
                                                value="ragdoll"
                                                id="breed"
                                                />
                                              <Label htmlFor="ragdoll">
                                                RagDoll
                                              </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                              <RadioGroupItem
                                                value="maine-coon"
                                                id="breed"
                                                />
                                              <Label htmlFor="maine-coon">
                                                Maine Coon
                                              </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                              <RadioGroupItem
                                                value="shorthair"
                                                id="breed"
                                                />
                                              <Label htmlFor="shorthair">
                                                ShortHair
                                              </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                              <RadioGroupItem
                                                value="persian"
                                                id="breed"
                                                />
                                              <Label htmlFor="persian">
                                                Persian
                                              </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                              <RadioGroupItem
                                                value="siberian"
                                                id="breed"
                                              />
                                              <Label htmlFor="siberian">
                                                Siberian
                                              </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                              <RadioGroupItem
                                                value="others"
                                                id="others"
                                                />
                                              <Label htmlFor="others">
                                                Others
                                              </Label>
                                            </div>
                                          </RadioGroup>
                                        </FormItem>
                                      );
                                    }}
                                  />
                                )}
                                {type === "dog" && (
                                  <FormField
                                  control={form.control}
                                  name="breed"
                                  render={({ field }) => {
                                    return (
                                      <FormItem>
                                          <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={searchParams.get(
                                              "breed"
                                            )}
                                            >
                                            <div className="flex items-center space-x-2">
                                              <RadioGroupItem
                                                value="bulldog"
                                                id="breed"
                                                />
                                              <Label htmlFor="bulldog">
                                                BullDog
                                              </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                              <RadioGroupItem
                                                value="labrador"
                                                id="breed"
                                                />
                                              <Label htmlFor="labrador">
                                                Labrador
                                              </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                              <RadioGroupItem
                                                value="german-shepherd"
                                                id="breed"
                                                />
                                              <Label htmlFor="german-shepherd">
                                                German Shepherd
                                              </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                              <RadioGroupItem
                                                value="rottweiler"
                                                id="breed"
                                                />
                                              <Label htmlFor="rottweiler">
                                                Rottweiler
                                              </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                              <RadioGroupItem
                                                value="golden-retriever"
                                                id="breed"
                                                />
                                              <Label htmlFor="golden-retriever">
                                                Golden Retriever
                                              </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                              <RadioGroupItem
                                                value="others"
                                                id="others"
                                                />
                                              <Label htmlFor="others">
                                                Others
                                              </Label>
                                            </div>
                                          </RadioGroup>
                                        </FormItem>
                                      );
                                    }}
                                  />
                                )}
                                {/* breed select */}
                              </div>
                            )}
                            <div className="py-4">
                              <h2 className="mb-4 font-semibold text-gray-600">
                                City
                              </h2>
                              <FormField
                                name="city"
                                control={form.control}
                                render={({ field }) => {
                                  return (
                                    <FormItem>
                                      <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={searchParams.get("city")}
                                        >
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem
                                            value="kolkata"
                                            id="kolkata"
                                          />
                                          <Label htmlFor="kolkata">
                                            Kolkata
                                          </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem
                                            value="banglore"
                                            id="banglore"
                                          />
                                          <Label htmlFor="banglore">
                                            Banglore
                                          </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem
                                            value="mumbai"
                                            id="mumbai"
                                          />
                                          <Label htmlFor="mumbai">Mumbai</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem
                                            value="noida"
                                            id="noida"
                                            />
                                          <Label htmlFor="noida">Noida</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem
                                            value="others"
                                            id="others"
                                            />
                                          <Label htmlFor="others">Others</Label>
                                        </div>
                                      </RadioGroup>
                                    </FormItem>
                                  );
                                }}
                              />
                            </div>
                            <div className="py-4">
                              <h2 className="mb-4 font-semibold text-gray-600">
                                Color
                              </h2>
                              <FormField
                                name="color"
                                control={form.control}
                                render={() => {
                                  return (
                                    <FormItem>
                                      <FormField
                                        name="color"
                                        control={form.control}
                                        render={({ field }) => {
                                          return (
                                            <FormItem>
                                              <FormControl>
                                                <Checkbox
                                                  defaultChecked={searchParams
                                                    .get("color")
                                                    ?.split("%2C")
                                                    .includes("black")}
                                                    checked={field.value?.includes(
                                                      "black"
                                                    )}
                                                  onCheckedChange={(
                                                    checked
                                                  ) => {
                                                    if (
                                                      field.value === undefined
                                                    ) {
                                                      return field.onChange([
                                                        "black",
                                                      ]);
                                                    }
                                                    return checked
                                                      ? field.onChange([
                                                        ...field.value,
                                                        "black",
                                                      ])
                                                      : field.onChange(
                                                        field.value?.filter(
                                                          (value) =>
                                                            value !== "black"
                                                        )
                                                      );
                                                    }}
                                                />
                                              </FormControl>
                                              <FormLabel>black</FormLabel>
                                            </FormItem>
                                          );
                                        }}
                                      />
                                      <FormField
                                        name="color"
                                        control={form.control}
                                        render={({ field }) => {
                                          return (
                                            <FormItem>
                                              <FormControl>
                                                <Checkbox
                                                  defaultChecked={searchParams
                                                    .get("color")
                                                    ?.split("%2C")
                                                    .includes("gray")}
                                                  checked={field.value?.includes(
                                                    "gray"
                                                  )}
                                                  onCheckedChange={(
                                                    checked
                                                  ) => {
                                                    if (
                                                      field.value === undefined
                                                    ) {
                                                      return field.onChange([
                                                        "gray",
                                                      ]);
                                                    }
                                                    return checked
                                                    ? field.onChange([
                                                      ...field.value,
                                                      "gray",
                                                    ])
                                                    : field.onChange(
                                                      field.value?.filter(
                                                        (value) =>
                                                          value !== "gray"
                                                      )
                                                    );
                                                  }}
                                                />
                                              </FormControl>
                                              <FormLabel>gray</FormLabel>
                                            </FormItem>
                                          );
                                        }}
                                      />
                                      <FormField
                                        name="color"
                                        control={form.control}
                                        render={({ field }) => {
                                          return (
                                            <FormItem>
                                              <FormControl>
                                                <Checkbox
                                                  defaultChecked={searchParams
                                                    .get("color")
                                                    ?.split("%2C")
                                                    .includes("brown")}
                                                  checked={field.value?.includes(
                                                    "brown"
                                                  )}
                                                  onCheckedChange={(
                                                    checked
                                                  ) => {
                                                    if (
                                                      field.value === undefined
                                                    ) {
                                                      return field.onChange([
                                                        "brown",
                                                      ]);
                                                    }
                                                    return checked
                                                      ? field.onChange([
                                                        ...field.value,
                                                        "brown",
                                                      ])
                                                      : field.onChange(
                                                        field.value?.filter(
                                                          (value) =>
                                                            value !== "brown"
                                                        )
                                                      );
                                                    }}
                                                />
                                              </FormControl>
                                              <FormLabel>brown</FormLabel>
                                            </FormItem>
                                          );
                                        }}
                                      />
                                      <FormField
                                        name="color"
                                        control={form.control}
                                        render={({ field }) => {
                                          return (
                                            <FormItem>
                                              <FormControl>
                                                <Checkbox
                                                  defaultChecked={searchParams
                                                    .get("color")
                                                    ?.split("%2C")
                                                    .includes("white")}
                                                    checked={field.value?.includes(
                                                      "white"
                                                    )}
                                                    onCheckedChange={(
                                                    checked
                                                  ) => {
                                                    if (
                                                      field.value === undefined
                                                    ) {
                                                      return field.onChange([
                                                        "white",
                                                      ]);
                                                    }
                                                    return checked
                                                      ? field.onChange([
                                                        ...field.value,
                                                        "white",
                                                      ])
                                                      : field.onChange(
                                                        field.value?.filter(
                                                          (value) =>
                                                            value !== "white"
                                                        )
                                                      );
                                                    }}
                                                />
                                              </FormControl>
                                              <FormLabel>White</FormLabel>
                                            </FormItem>
                                          );
                                        }}
                                      />
                                      <FormField
                                        name="color"
                                        control={form.control}
                                        render={({ field }) => {
                                          return (
                                            <FormItem>
                                              <FormControl>
                                                <Checkbox
                                                  defaultChecked={searchParams
                                                    .get("color")
                                                    ?.split("%2C")
                                                    .includes("others")}
                                                    checked={field.value?.includes(
                                                      "others"
                                                    )}
                                                    onCheckedChange={(
                                                      checked
                                                  ) => {
                                                    if (
                                                      field.value === undefined
                                                    ) {
                                                      return field.onChange([
                                                        "others",
                                                      ]);
                                                    }
                                                    return checked
                                                      ? field.onChange([
                                                        ...field.value,
                                                        "others",
                                                      ])
                                                      : field.onChange(
                                                        field.value?.filter(
                                                          (value) =>
                                                            value !== "others"
                                                        )
                                                      );
                                                    }}
                                                />
                                              </FormControl>
                                              <FormLabel>Others</FormLabel>
                                            </FormItem>
                                          );
                                        }}
                                      />
                                    </FormItem>
                                  );
                                }}
                              />
                            </div>
                            <div className="py-4">
                              <h2 className="mb-4 font-semibold text-gray-600">
                                Gender
                              </h2>
                              <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => {
                                  return (
                                    <FormItem>
                                      <RadioGroup
                                        onValueChange={field.onChange}
                                        >
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem
                                            value="male"
                                            id="male"
                                            />
                                          <Label htmlFor="male">Male</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem
                                            value="female"
                                            id="female"
                                            />
                                          <Label htmlFor="female">Female</Label>
                                        </div>
                                      </RadioGroup>
                                    </FormItem>
                                  );
                                }}
                              />
                            </div>
                          </div>
                        </SheetDescription>
                      </SheetHeader>
                      <SheetFooter>
                        <div className="flex flex-row gap-4">
                          
                      <SheetTrigger>
                          <Button type="reset" onClick={handleClearFilters}>Clear Filters</Button>
                        </SheetTrigger>
                        <SheetTrigger>
                          <Button type="submit">Apply Filters</Button>
                        </SheetTrigger>
                        </div>
                      </SheetFooter>
                    </form>
                  </Form>
                </SheetContent>
              </Sheet>
            </div>
            <div>
              {/* <DropdownMenuRadioGroupDemo /> */}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 align-middle justify-center">
            {data &&
              data.map((res) => {
                return (
                  <div>
                    <Link to={`/pet/${res.id}`}>
                    <PetCard
                      name={res.name}
                      image={res.Image}
                      gender={res.gender}
                      location={res.city}
                      breed={res.breed}
                      />
                      </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
              </>
  );
}

export default Discover;
