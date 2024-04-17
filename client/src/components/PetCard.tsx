import { HeartIcon } from "@radix-ui/react-icons";

function PetCard({
  image,
  name,
  gender,
  health,
  description,
  location,
}: Record<string, string | null>) {
  return (
    <div
      className="border-[0.1px] border-[#00000033] border-[1px] w-64 sm:w-72 rounded-2xl overflow-hidden relative shadow-[0_0_7px_3px_rgba(0,0,0,0.1),0_0_1px_1px_rgba(0,0,0,0.1)] cursor-default hover:shadow-[0_0_8px_4px_rgba(0,0,0,0.2),0_0_1px_1px_rgba(0,0,0,0.2)] hover:border-[#00000055] transition-all"
      style={{ height: "500px" }}
    >
      <div className="overflow-hidden" style={{ height: "300px" }}>
        <img
          src={image!}
          width={200}
          height={300}
          className=" object-cover h-full w-full"
        />
      </div>
      <div className="mt-4 mx-3">
        <div className=" text-2xl mb-2 flex flex-row justify-between items-center">
          <div>{name}</div>
          <HeartIcon height={25} width={25} />
        </div>
        <div className="flex flex-row gap-2 mb-2">
          <div>{gender}</div>
          <div>•</div>
          <div>{health}</div>
        </div>
        <div>{description}</div>
        <div className="absolute bottom-2">{location}</div>
      </div>
    </div>
  );
}

export default PetCard;
