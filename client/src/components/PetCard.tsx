import { HeartIcon } from '@radix-ui/react-icons'

function PetCard({image , name , gender , health , description , location}: Record<string , string |null>) {
  return (
    <div className='border-[0.1px] border-black w-64 sm:w-96 rounded overflow-hidden relative' style={{height:'500px'}}>
    <div className='overflow-hidden p-4' style={{height:'300px'}}><img src={image!} width={400} height={400}  className=' object-cover h-full w-full' /></div>
    <div className='mt-4 ml-2 mr-2'>
        <div className='font-bold text-2xl mb-2 flex flex-row justify-between items-center'>
            <div>{name}</div>
            <HeartIcon height={25} width={25} />
            </div>
        <div className='flex flex-row gap-2 mb-2'>
            <div>{gender}</div>
            <div>•</div>
            <div>{health}</div>
        </div>
        <div>{description}</div>
        <div className='absolute bottom-1'>{location}</div>
    </div>
</div>
  )
}

export default PetCard