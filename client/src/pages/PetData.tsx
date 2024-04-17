import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import axios from 'axios';
import PetPageCard from '@/components/PetPageCard';

function PetData() {
  
    const [data,setData] = useState<Record<string,string> | null>();
    const [loading,setLoading] = useState(true);
    const id = useParams().id
    const getData = async() =>{
        try {
            const data = await axios.get(`${import.meta.env.VITE_BACKEND_PATH}/api/pet/${id}`)
            setData(data?.data?.data)
            setLoading(false)
            console.log(data.data.data)
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        console.log(id)
        getData()
    },[])
    if(loading){
        return <Loading />
    }
  return (
    <div className=' flex justify-center bg-slate-50 min-h-screen
    '>
        <div className='p-4'>

        <div className=' max-w-8xl'>
            <div className='grid grid-cols-3 gap-4'>
                <div className=' col-span-2 flex flex-col'>
                    <div className=' bg-gray-900 flex justify-center items-center h-96 w-[600px] '>
                    <img src={data!.Image} alt="" className=' max-w-full max-h-full ' />
                    </div>
                    <div className='text-4xl mt-4'>Hey Myself {data.name}</div>
                    <div className='mt-8'>
                        <div className=' text-2xl'>About Me</div>
                       <div className='grid grid-cols-2 gap-y-2 text-lg mt-3'>
                            <div>I am a {data.type}</div>
                            <div><span className='font-bold mr-1'> Personality: </span>  {data.personality}</div>
                            <div><span className='font-bold mr-1'> Breed: </span> {data.breed}</div>
                            <div><span className='font-bold mr-1'> Color: </span>{data.color}</div>
                            <div><span className='font-bold mr-1'> Gender: </span>{data.gender}</div>
                            <div><span className='font-bold mr-1'> Weight: </span>{data.weight}kg</div>
                            <div><span className='font-bold mr-1'> City: </span>{data.city}</div>
                            <div><span className='font-bold mr-1'> Age: </span>{data.age} year</div>

                       </div>
                    </div>
                </div>
                <div className=' col-span-1'>
                    <PetPageCard owner={data.owner} name={data.name} />
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default PetData