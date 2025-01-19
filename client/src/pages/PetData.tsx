import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";
import PetPageCard from "@/components/PetPageCard";
import Navbar from "@/components/Navbar";

function PetData() {
  const [data, setData] = useState<Record<string, string> | null>();
  const [loading, setLoading] = useState(true);
  const id = useParams().id;
  const getData = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_PATH}/api/pet/${id}`
      );
      setData(data?.data?.data);
      setLoading(false);
      console.log(data.data.data);
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    console.log(id);
    getData();
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <div
      className=" flex flex-col justify-center items-center bg-slate-50 min-h-screen relative
    "
    >
      <div className="w-full absolute top-0 left-0">
        <Navbar />
      </div>
      <div className="p-4 mt-14">
        <div className=" xsm:max-w-4/6 bg-white p-6 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:gap-4 gap-y-4">
            <div className=" col-span-2 flex md:flex-row flex-col gap-6 ">
              <div className="  flex justify-center items-start  h-full md:m-0 m-auto md:w-[400px] w-[320px] rounded-lg ">
                <img
                  src={data!.Image}
                  alt=""
                  className=" max-w-full max-h-full rounded-lg w-full"
                />
              </div>
              <div className="pet-details ml-2 gap-4 flex flex-col">
                <div className="text-4xl mt-4 font-bold">
                  Hey Myself {data.name}
                </div>
                <div className="mt-8">
                  <div className=" text-lg font-light tracking-widest	">
                    ABOUT ME
                  </div>
                  <div className="grid grid-cols-2 gap-2 md:text-lg text-base mt-3">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        I am a{" "}
                      </div>
                      <div className="font-medium"> {data.type}</div>
                    </div>

                    <div>
                      <span className="text-sm text-muted-foreground">
                        {" "}
                        Personality{" "}
                      </span>
                      <div className="font-medium ">{data.personality}</div>
                    </div>

                    <div>
                      <span className="text-sm text-muted-foreground">
                        {" "}
                        Breed{" "}
                      </span>
                      <div className="font-medium ">{data.breed}</div>
                    </div>

                    <div>
                      <span className="text-sm text-muted-foreground">
                        Color{" "}
                      </span>
                      <div className="font-medium ">{data.color}</div>
                    </div>

                    <div>
                      <span className="text-sm text-muted-foreground">
                        Gender{" "}
                      </span>
                      <div className="font-medium ">{data.gender}</div>
                    </div>

                    <div>
                      <span className="text-sm text-muted-foreground">
                        Weight
                      </span>
                      <div className="font-medium ">{data.weight}kg</div>
                    </div>

                    <div>
                      <span className="text-sm text-muted-foreground">
                        City{" "}
                      </span>
                      <div className="font-medium ">{data.city}</div>
                    </div>

                    <div>
                      <span className="text-sm text-muted-foreground">
                        Age{" "}
                      </span>
                      <div className="font-medium ">{data.age}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-200 h-px w-full"></div>

                <div className=" col-span-1">
                  <PetPageCard owner={data.owner}  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetData;
