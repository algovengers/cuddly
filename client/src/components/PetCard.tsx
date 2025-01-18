function PetCard({
  image,
  name,
  gender,
  location,
  breed
}: Record<string, string | null>) {
  return (
    <div
      className=" border-[#00000033] border-[1px] w-64 sm:w-72 h-96 rounded-2xl overflow-hidden relative  cursor-default hover:shadow-[0_0_4px_2px_rgba(0,0,0,0.1),0_0_2px_0_rgba(0,0,0,0.1)] hover:border-[#0000001f] transition-all"
    >
      <div className="overflow-hidden h-72" >
        <img
          src={image!}
          width={200}
          height={300}
          className=" object-cover h-full w-full"
        />
      </div>
      <div className="mt-3 mx-3">
        <div className=" text-lg mb-2 flex flex-row justify-between items-center">
          <div>{name.toUpperCase() ||"Tom"}</div>
        </div>
        <div className="flex flex-row gap-2 mb-2 text-xs">
          <div>{gender.toUpperCase() || "Male"}</div>
          <div>•</div>
          <div>{breed.toLocaleUpperCase() || "Healthy"}</div>
        </div>
        {/* <div>{description}</div> */}
        <div className="absolute bottom-2 flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-base">location_on</span>{location.toUpperCase()}</div>
      </div>
    </div>
  );
}

export default PetCard;
