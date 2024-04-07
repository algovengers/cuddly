import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
 
import { Button } from "@/components/ui/button"


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
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

function Discover() {
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
                                        <SheetDescription>

                                        </SheetDescription>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>
                        </div>
                        <div><DropdownMenuRadioGroupDemo/></div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Discover