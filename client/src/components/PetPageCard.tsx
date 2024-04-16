import React from 'react'
import { Button } from './ui/button'

function PetPageCard({owner,name}) {
  return (
    <div className='flex flex-col bg-white p-2'>
        <div>Owner of {name}</div>
        <div className='py-4 px-1'>
            <div><img src={owner.photo} alt="" /></div>
            <div> {owner.name} </div>
        </div>
        <div>
            <Button > Chat with the Owner</Button>
        </div>
    </div>
  )
}

export default PetPageCard