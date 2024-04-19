import React from 'react'
import { Button } from './ui/button'

function PetPageCard({owner,name}) {
  return (
    <div className='flex flex-col bg-slate-300	rounded-lg p-6  text-center'>
        <div className='md:text-xl text-sm'>Owner of <b>{name}</b></div>
        <div className='py-4 px-1'>
            <div ><img src={owner.photo} alt="" /></div>
            <div className='text-2xl'> {owner.name} </div>
        </div>
        <div>
            <Button > Chat with the Owner</Button>
        </div>
    </div>
  )
}

export default PetPageCard