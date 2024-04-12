import React, { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import PetCard from '@/components/PetCard'
import axios from 'axios'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@radix-ui/react-label'
import { Checkbox } from '@/components/ui/checkbox'


function DropdownMenuRadioGroupDemo() {
  const [position, setPosition] = React.useState("bottom")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Sort By</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Latest</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Dummy</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Discover() {
  const [data, setData] = useState<Array<any>>()
  useEffect(() => {
    const getData = async () => {
      let data = await axios.get(`${import.meta.env.VITE_BACKEND_PATH}/api/explore`)
      data = data.data
      console.log(data.data)
      setData(data?.data)

    }
    getData()

  }, [])
  return (
    <div className='flex h-full w-full justify-center'>

      <div className='max-w-7xl w-full p-4'>
        <div className='w-full text-center'>

          {/* header */}
          <div className='text-3xl my-8'>Yay we found 232 pets for you</div>
          <div className='flex justify-between'>
            <div>
              <Sheet>
                <SheetTrigger><Button variant="outline">Filters</Button></SheetTrigger>
                <SheetContent side={"left"}>
                  <SheetHeader>
                    <SheetTitle>Apply filters</SheetTitle>
                    <SheetDescription className=''>
                      <div className='overflow-y-auto max-h-[85vh]'>
                      <div className='py-4'>
                        <h2 className='mb-4 font-semibold text-gray-600'>Animal</h2>
                        <RadioGroup >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cat" id="cat" />
                            <Label htmlFor="cat">Cat</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="dog" id="dog" />
                            <Label htmlFor="dog">Dog</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className='py-4 '>
                        <h2 className='mb-4 font-semibold text-gray-600'>Weight</h2>
                        <RadioGroup >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="0-15" id="0-15" />
                            <Label htmlFor="0-15">0-15 kg</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="15-30" id="15-30" />
                            <Label htmlFor="15-30">15-30 kg</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="30-45" id="30-45" />
                            <Label htmlFor="30-45">30-45 kg</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="45+" id="45+" />
                            <Label htmlFor="45+">45+ kg</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className='py-4'>
                        <h2 className='mb-4 font-semibold text-gray-600'>Breed</h2>
                        {/* breed select */}
                      </div>
                      <div className='py-4'>
                        <h2 className='mb-4 font-semibold text-gray-600'>City</h2>
                        <RadioGroup >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="kolkata" id="kolkata" />
                            <Label htmlFor="kolkata">Kolkata</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="banglore" id="banglore" />
                            <Label htmlFor="banglore">Banglore</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mumbai" id="mumbai" />
                            <Label htmlFor="mumbai">Mumbai</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="noida" id="noida" />
                            <Label htmlFor="noida">Noida</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="others" id="others" />
                            <Label htmlFor="others">Others</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className='py-4'>
                        <h2 className='mb-4 font-semibold text-gray-600'>Color</h2>
                        <div className="grid gap-2">
                          <div className="flex items-center gap-2">
                            <Checkbox id="brown" />
                            <Label className="font-normal" htmlFor="brown">
                              Brown
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="black" />
                            <Label className="font-normal" htmlFor="black">
                               Black
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="gray" />
                            <Label className="font-normal" htmlFor="gray">
                              Gray
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="white" />
                            <Label className="font-normal" htmlFor="white">
                              White
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="others" />
                            <Label className="font-normal" htmlFor="others">
                              Others
                            </Label>
                          </div>
                        </div>
                      </div>
                      <div className='py-4'>
                        <h2 className='mb-4 font-semibold text-gray-600'>Gender</h2>
                        <RadioGroup >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    </SheetDescription>
                  </SheetHeader>
                <SheetFooter>
                  <Button>Apply Filters</Button>
                </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
            <div><DropdownMenuRadioGroupDemo /></div>

          </div>
          <div className='mt-8'>
            {
              data && data.map((res) => {
                return <div>
                  <PetCard name={res.name} image={res.Image} gender={res.gender} location={res.city} />
                </div>
              })
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Discover