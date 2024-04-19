import { useEffect, useState } from "react";
import styles from "./css/Upload.module.css";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
// import { useSelector } from "react-redux";
import axios from "axios";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import './upload.css';
import LoadingComponent from "@/components/LoadingComponent";


// The schema is same as the schema at the backend except name field
// If the schema is modified here then it should be modified in the 
// backend also

const formSchema = z.object({
    color: z.string().optional(),
    type: z.enum(["cat", "dog"]).optional(),
    breed: z.string().optional(), // can be enum
    gender: z.enum(["male", "female"]),
    personality: z.string().optional(),
    city: z.string().optional(),
    weight: z.enum(["0-15", "15-30", "30-45", "45+"]),
    age: z.coerce.number().min(0).max(10000),
})

type Form = z.infer<typeof formSchema>

const ImageUpload = ({
    selectedImage,
    setSelectedImage,
    showImage,
    setShowImage,
}: any) => {
    const handleImageUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            previewImage(file);
            setSelectedImage(file);
        }
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
    };

    const handleDrop = (e: any) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];
        if (file) {
            previewImage(file);
        }
    };

    function previewImage(file: any) {
        const reader = new FileReader();

        reader.onload = (e) => {
            setShowImage(e.target!.result);
        };

        reader.readAsDataURL(file);
    }

    return (
        <div className="h-full flex flex-col justify-center">
            <div className="sm:text-xl font-bold">Upload Image of Your Pet</div>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                id="fileInput"
            />
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput")!.click()}
                style={{
                    border: "2px dashed #ccc",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                    height: "70%",
                }}
                className="mt-auto mb-auto flex flex-col"
            >
                {showImage ? (
                    <img
                        src={showImage}
                        alt="Preview"
                        style={{ maxWidth: "100%", height: "", maxHeight: "100%" }}
                        className="m-auto"
                    />
                ) : (
                    <p className="m-auto">Drag and drop or click to select an image</p>
                )}
            </div>
        </div>
    );
};


function Upload() {
    const user = useSelector((state: RootState) => state.user)
    const history = useNavigate()
    useEffect(() => {
        if (!user.isLoading && !user.isAuth) {
            // Redirect to login page
            history("/login");
        }
        // console.log("gg", user.isAuth);
        // console.log("ggs", user);
    }, [user.isAuth, history, user.isLoading]);

    type typeSchema = "cat" | "dog"
    const [type, setType] = useState<"cat" | "dog" | null>(null)
    const [breed, setBreed] = useState<string | null>(null)
    const [color, setColor] = useState<string | null>(null)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            age: 0,
        }
    })
    const [tab, setTab] = useState(0);
    const [uploading, setUploading] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [showImage, setShowImage] = useState(null);
    const [name, setName] = useState("");
    const [data, setData] = useState<z.infer<typeof formSchema> | null>(null)

    const navigate = useNavigate()
    const onSumbit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
        setData(values)
        setTab((prev) => prev + 1)
    }
    //   const userId = useSelector((state) => state.auth.userId);
    async function UploadImage() {
        const formData = new FormData();
        setUploading(true)
        formData.append('name', name)
        for (const [key, value] of Object.entries(data!)) {
            formData.append(key, value.toString())
        }
        formData.append('Image', selectedImage!)
        try {
            const data = await axios.post(
                import.meta.env.VITE_BACKEND_PATH + "/api/upload-a-pet",
                formData, {
                withCredentials: true
            }
            );
            setUploading(false)
            navigate('/discover')
            // Handle the response if needed
        } catch (error) {
            if (error instanceof Error)
                console.log(error.message);
            setUploading(false)
        }

    }
    async function handleAIdetection() {
        try {
            const formData = new FormData()
            formData.append('Image', selectedImage!)
            const data = await axios.post(import.meta.env.VITE_BACKEND_PATH + "/api/detect",
                formData, {
                withCredentials: true
            }
            )
            const values = data.data.data.text
            console.log(values)
            setType(values.type)
            setBreed(values.breed)
            setColor(values.color)
            setTab((prev) => prev + 1)


        } catch (error) {

        }
    }
    useEffect(() => {
        if (tab == 1) {
            //Call AI API here
            handleAIdetection()
        }
    }, [tab]);

    return (
        <>
            <div className="grid sm:grid-cols-5 grid-cols-1 w-full h-screen upload-page-container">
                <div
                    className="col-span-2 h-full flex flex-col justify-center gap-4 sm:pb-60 pb-16 progress-list-container"
                    style={{ background: "#F2DF7D" }}
                >
                    <div className={styles.leftColumn}>
                        <div className="flex flex-col gap-10 sm:fixed progress-list">
                            <div className="flex flex-row gap-2 items-center text-lg">
                                <div className={styles.wrapper}>
                                    <div
                                        className={` ${tab == 0 ? styles.selected : styles.unselected
                                            } ${styles.circle}`}
                                    ></div>
                                </div>
                                <div className={`${tab === 0 ? "md:text-3xl text-lg font-medium" : ""} `}>
                                    Upload a Picture
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 items-center text-lg">
                                <div className={styles.wrapper}>
                                    <div
                                        className={` ${tab == 1 ? styles.selected : styles.unselected
                                            } ${styles.circle}`}
                                    ></div>
                                </div>
                                <div className={`${tab === 1 ? "text-3xl" : ""}`}>
                                    AI detection
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 items-center text-lg">
                                <div className={styles.wrapper}>
                                    <div
                                        className={` ${tab == 2 ? styles.selected : styles.unselected
                                            } ${styles.circle}`}
                                    ></div>
                                </div>
                                <div className={`${tab === 2 ? "text-3xl" : ""}`}>
                                    Pet Details
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 items-center text-lg">
                                <div className={styles.wrapper}>
                                    <div
                                        className={` ${tab == 3 ? styles.selected : styles.unselected
                                            } `}
                                    ></div>
                                </div>
                                <div className={`${tab === 3 ? "text-3xl" : ""}`}>
                                    Confirmation
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 lg:h-screen  h-full">
                    {tab == 0 && (
                        <div className="h-full flex flex-col justify-center p-8">
                            <ImageUpload
                                selectedImage={selectedImage}
                                setSelectedImage={setSelectedImage}
                                showImage={showImage}
                                setShowImage={setShowImage}
                            />
                            <div className="flex flex-row justify-end p-4">
                                <div>
                                    {
                                        showImage !== null && <Button onClick={() => setTab(1)}>Upload</Button>
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                    {tab == 1 && (
                        <div className="h-full flex flex-col justify-center p-8">
                            <div>

                                <LoadingComponent />
                                <div>Detecting with AI</div>
                            </div>
                        </div>
                    )}
                    {tab == 2 && (
                        <div className="flex flex-col gap-8 h-full items-center justify-center">
                            <div className="lg:text-4xl text-xl">
                                Confirm your pet details
                            </div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSumbit)} className="flex flex-col gap-4">
                                    <div className="flex sm:gap-16 gap-4">

                                        <FormField control={form.control} name="color" defaultValue={color}
                                            render={({ field }: any) => {
                                                return (
                                                    <FormItem>
                                                        <Select onValueChange={field.onChange} defaultValue={color}>
                                                            <FormControl>
                                                                <SelectTrigger className="w-[180px]">
                                                                    <SelectValue placeholder="Choose the color" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="black">Black</SelectItem>
                                                                    <SelectItem value="brown">Brown</SelectItem>
                                                                    <SelectItem value="gray">Gray</SelectItem>
                                                                    <SelectItem value="white">White</SelectItem>
                                                                    <SelectItem value="others">Other</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                        <FormField control={form.control} name="type" defaultValue={type}
                                            render={({ field }: any) => {
                                                return (
                                                    <FormItem>
                                                        <Select onValueChange={(e) => {
                                                            field.onChange(e)
                                                            setType(e as typeSchema)
                                                            console.log(e)
                                                        }}
                                                            defaultValue={type}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger className="w-[180px]">
                                                                    <SelectValue
                                                                        placeholder="Select a Pet"
                                                                    />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="cat">Cat</SelectItem>
                                                                <SelectItem value="dog">Dog</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )
                                            }}

                                        />
                                    </div>
                                    <div className="flex sm:gap-16 gap-4">

                                        <FormField
                                            name="breed"
                                            defaultValue={breed}
                                            control={form.control}
                                            render={({ field }) => {
                                                return <FormItem>
                                                    <Select onValueChange={field.onChange}
                                                        defaultValue={breed}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Select the Breed" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {type === "cat" &&
                                                                    <>
                                                                        <SelectItem value="ragdoll">Ragdoll</SelectItem>
                                                                        <SelectItem value="maine-coon">Maine Coon</SelectItem>
                                                                        <SelectItem value="shorthair">Shorthair</SelectItem>
                                                                        <SelectItem value="persian">Persian Cats</SelectItem>
                                                                        <SelectItem value="siberian">Siberian</SelectItem>
                                                                        <SelectItem value="others">Others</SelectItem>

                                                                    </>

                                                                }
                                                                {type === "dog" &&
                                                                    <>
                                                                        <SelectItem value="bulldog">BullDog</SelectItem>
                                                                        <SelectItem value="labrador">Labrador</SelectItem>
                                                                        <SelectItem value="german-shepherd">German shepherd</SelectItem>
                                                                        <SelectItem value="rottweiler">Rottweiler</SelectItem>
                                                                        <SelectItem value="golden-retriever">Golden Retriever</SelectItem>
                                                                        <SelectItem value="others">Others</SelectItem>

                                                                    </>

                                                                }
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            }} />
                                        <FormField
                                            name="gender"
                                            control={form.control}
                                            render={({ field }) => {
                                                return <FormItem>
                                                    <FormControl>
                                                        <ToggleGroup type="single" variant="outline" onValueChange={field.onChange}>
                                                            <ToggleGroupItem value="male">Male</ToggleGroupItem>
                                                            <ToggleGroupItem value="female">Female</ToggleGroupItem>
                                                        </ToggleGroup>
                                                    </FormControl>
                                                </FormItem>
                                            }}
                                        />
                                    </div>
                                    <div className="flex sm:gap-16 gap-4">

                                        <FormField
                                            name="personality"
                                            control={form.control}
                                            render={({ field }) => {
                                                return <FormItem>
                                                    <Select onValueChange={field.onChange}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Select the Personality" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value="angry">Angry</SelectItem>
                                                                <SelectItem value="cute">Cute</SelectItem>
                                                                <SelectItem value="lazy">Lazy</SelectItem>
                                                                <SelectItem value="others">Others</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>

                                                    <FormMessage />

                                                </FormItem>
                                            }}
                                        />
                                        <FormField
                                            name="city"
                                            control={form.control}
                                            render={({ field }) => {
                                                return <FormItem>
                                                    <Select onValueChange={field.onChange}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Select the city" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value="kolkata">Kolkata</SelectItem>
                                                                <SelectItem value="mumbai">Mumbai</SelectItem>
                                                                <SelectItem value="banglore">Banglore</SelectItem>
                                                                <SelectItem value="noida">Noida</SelectItem>
                                                                <SelectItem value="others">Others</SelectItem>

                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            }}
                                        />
                                    </div>
                                    <FormField
                                        name="weight"
                                        control={form.control}
                                        render={({ field }) => {
                                            return <FormItem>
                                                <FormControl>

                                                    <ToggleGroup type="single" variant="outline" className="justify-start mt-4" onValueChange={field.onChange}>
                                                        <ToggleGroupItem value="0-15">0-15 kg</ToggleGroupItem>
                                                        <ToggleGroupItem value="15-30">15-30 kg</ToggleGroupItem>
                                                        <ToggleGroupItem value="30-45">30-45 kg</ToggleGroupItem>
                                                        <ToggleGroupItem value="45+">45+ kg</ToggleGroupItem>

                                                    </ToggleGroup>
                                                </FormControl>
                                            </FormItem>
                                        }}
                                    />
                                    <FormField
                                        name="age"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type="number" {...field} placeholder="Enter the age of your pet" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {/* <FormMessage /> */}
                                    <div className="flex flex-row justify-end p-4">
                                        <div>
                                            <Button type="submit">Next</Button>
                                        </div>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    )}
                    {tab == 3 && (
                        <div className="h-full flex flex-col justify-center p-8">
                            <Input
                                placeholder="Enter the name "
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <div className="flex flex-row justify-end p-4">
                                <div>
                                    {uploading === false &&
                                        <Button onClick={UploadImage}>Upload</Button>
                                    }
                                    {
                                        uploading == true &&
                                        <Button disabled >Uploading</Button>
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Upload;