import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import axios from 'axios';
import PetPageCard from '@/components/PetPageCard';
import Navbar from '@/components/Navbar';

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
            // console.log(error);
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
    <div className=' flex flex-col justify-center items-center bg-slate-50 min-h-screen relative
    '>
        <div className='w-full absolute top-0 left-0'>

        <Navbar/>
        </div>
        <div className='p-4 mt-14'>

        <div className=' xsm:max-w-4/6'>
            <div className='grid grid-cols-1 md:gap-4 gap-y-4'>
                <div className=' col-span-2 flex md:flex-row flex-col gap-6 '>
                    <div className=' bg-gray-900 flex justify-center items-center h-full md:m-0 m-auto md:w-[400px] w-[320px] rounded-lg '>
                    <img src={data!.Image} alt="" className=' max-w-full max-h-full ' />
                    </div>
                    <div className="pet-details ml-2">

                        <div className='text-4xl mt-4'>Hey Myself {data.name}</div>
                        <div className='mt-8'>
                            <div className=' text-lg font-light tracking-widest	'>ABOUT ME</div>
                        <div className='grid grid-cols-2 gap-6 md:text-lg text-base mt-3'>
                                <div>I am a {data.type}</div>
                                <div><span className='font-medium mr-1'> Personality: </span>  {data.personality}</div>
                                <div><span className='font-medium mr-1'> Breed: </span> {data.breed}</div>
                                <div><span className='font-medium mr-1'> Color: </span>{data.color}</div>
                                <div><span className='font-medium mr-1'> Gender: </span>{data.gender}</div>
                                <div><span className='font-medium mr-1'> Weight: </span>{data.weight}kg</div>
                                <div><span className='font-medium mr-1'> City: </span>{data.city}</div>
                                <div><span className='font-medium mr-1'> Age: </span>{data.age} year</div>

                        </div>
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



