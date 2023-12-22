// @ts-ignore
'use client'

import Phone from "@/components/phone"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "@/components/ui/use-toast"
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form"
import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import FieldInput from "@/components/field-input"
import FieldTextarea from "@/components/field-textarea"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TrashIcon } from "@radix-ui/react-icons"
import Layout from "@/layout/layout"
import { useUserContext } from "@/context/user"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database.types"
import { Skeleton } from "@/components/ui/skeleton"

const restaurant = {
    name: "Restaurant Del Arte"
}

const FormSchema = z.object({
    name: z.string(),
    adress: z.string(),
    postal_code: z.string(),
    country: z.string(),
    logo_url: z.any(),
    banner_url: z.any(),
    languages: z.array(z.string()),
    hide_name: z.boolean(),
    width_logo: z.optional(z.number())
})

function ItemsComponent() {
    const [items, setItems] = useState([])
    const [isClear, setIsClear] = useState(true);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState()
    const [isLoading, setIsloading] = useState(false)

    const { user } = useUserContext();

    const supabaseClient = useSupabaseClient<Database>();

    const inputRef = useRef(null);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            languages: [window.navigator.language.split("-")[0]],
            hide_name: false,
            width_logo: 13
        },

    })

    async function getCategory() {
        // setIsloading(true)

        const { data: category } = await supabaseClient
            .from("category")
            .select("*")
            .eq("profile_id", user?.id);

        setCategories(category);

        setIsloading(false)
    }

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 bg-slate-500">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    const handleAddItem = () => {
        const newItems = [...items];
        newItems.push({ idTemp: `${items.length + 1}`, name: 'Nouvel élément', description: "Description de l'élément", price: 0.00 })

        setItems(newItems);

        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }

    const handleChangeNameItem = (index, value) => {
        setIsClear(false)

        const newItems = [...items];
        newItems[index].name = value;
        setItems(newItems);
    };

    const handleChangeDescriptionItem = (index, value) => {
        setIsClear(false)

        const newItems = [...items];
        newItems[index].description = value;
        setItems(newItems);
    };

    const handleChangePriceItem = (index, value) => {
        setIsClear(false)

        const newItems = [...items];
        newItems[index].price = value;
        setItems(newItems);
    };

    const handleChangeCategory = (value) => {
        if (!isClear) {
            alert("Des changements sont en cours, merci de sauvegarder avant de chanegr de catégorie")

            return;
        } else {
            const itemsFinded = items?.filter((it) => {
                return (it.name === 'Nouvel élément') && (it.description === "Description de l'élément") && (it.price === 0)
            })

            if (itemsFinded.length) {
                alert("Des changements sont en cours, merci de sauvegarder avant de chanegr de catégorie")

                return;
            }

            setActiveCategory(value)
            setIsClear(true)
        }
    };

    const handleRemoveItem = (index) => {
        const newItems = items.filter((_, i) => {
            return i !== index
        });

        setItems(newItems);

        if (newItems.length < 1) {
            setIsClear(true)
        }
    }

    const onImageChange = (index, event) => {
        const newItems = [...items];

        if (event.target.files && event.target.files[0]) {
            newItems[index].image = URL.createObjectURL(event.target.files[0]);
            setItems(newItems);
        } else {
            newItems[index].image = null;
            setItems(newItems)
        }
    }



    useEffect(() => {
        if (!isLoading) {
            getCategory()
            if (categories?.length > 0) {
                setActiveCategory(categories[0]?.id)
            }
        }
    }, [user])

    useEffect(() => {
        if (categories?.length > 0) {
            setActiveCategory(categories[0]?.id)
        }
    }, [categories])

    return (
        <Layout withAuth>
            <Card className="w-2/3 flex flex-col">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col h-full">
                        <CardHeader>
                            <CardTitle>Gérer les articles du restaurant</CardTitle>
                            <CardDescription>Vous pouvez ajouter / modifier / supprimer les articles de vos sections à cet endroit.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex gap-x-2 flex-grow h-full overflow-hidden">
                            <div className="w-1/3 flex flex-col space-y-3 overflow-y-auto">
                                {!isLoading ? categories?.map((category) => {
                                    return (
                                        <Button key={category.id} variant={activeCategory === category.id ? "default" : "secondary"} onClick={() => handleChangeCategory(category.id)}>{category.name}</Button>
                                    )
                                })
                                    : (
                                        <div className="flex flex-col space-y-2">
                                            <Skeleton className="w-full h-[40px] rounded" />
                                            <Skeleton className="w-full h-[40px] rounded" />
                                            <Skeleton className="w-full h-[40px] rounded" />
                                        </div>
                                    )}
                            </div>
                            <Separator orientation="vertical" />
                            <div className="w-2/3 flex flex-col gap-y-3 overflow-y-auto">
                                {items?.map((item, index) => {
                                    return (
                                        <div className="border p-5" key={index}>
                                            <Button variant="destructive" size="icon" onClick={() => handleRemoveItem(index)}>
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                            <FormItem>
                                                <FormLabel>Nom</FormLabel>
                                                <FormControl onChange={e => handleChangeNameItem(index, e.target.value)}>
                                                    <Input ref={inputRef} value={item.name} placeholder="Nom de l'élément" />
                                                </FormControl>
                                            </FormItem>
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl onChange={e => handleChangeDescriptionItem(index, e.target.value)}>
                                                    <Textarea value={item.description} placeholder="Description de l'élément" />
                                                </FormControl>
                                            </FormItem>
                                            <FormItem>
                                                <FormLabel>Prix</FormLabel>
                                                <FormControl onChange={e => handleChangePriceItem(index, e.target.value)}>
                                                    <Input value={item.price} type="number" placeholder="Description de l'élément" step="0.01" />
                                                </FormControl>
                                            </FormItem>
                                            <FormItem>
                                                <FormLabel>Image</FormLabel>
                                                <FormControl onChange={(e) => onImageChange(index, e)} >
                                                    <Input type="file" className="file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
                                                </FormControl>
                                            </FormItem>
                                        </div>
                                    )
                                })}
                                <Card className="group border-dashed shadow-none border-gray-300 opacity-90 hover:border-gray-400 hover:cursor-pointer" onClick={handleAddItem}>
                                    <div className="flex items-center">
                                        <CardHeader className="w-full ">
                                            <CardTitle className="text-center font-normal text-gray-400 opacity-90 group-hover:text-gray-700">Ajouter une nouvel élément +</CardTitle>
                                        </CardHeader>
                                    </div>
                                </Card>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button type="submit">Enregistrer</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
            <Card className="flex-1">
                <CardHeader>
                    <CardTitle>Aperçu du menu</CardTitle>
                    <CardDescription>Voici une prévisualisation de la présentation de votre menu en ligne.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Phone>
                        <div className="text-xs">
                            <div>
                                <div className="flex justify-between py-1 pl-2 pr-3">
                                    <div className="flex items-center gap-x-0.5">
                                        <img src="/assets/images/logo.png" alt="language" className="object-cover w-5" style={{ width: `15%` }} />
                                        <p className="text-[10px] font-bold">{restaurant.name}</p>
                                    </div>
                                </div>
                                {/* Image Marketing Restaurant */}
                                <img src="/assets/images/marketing_offer.png" alt="marketingOffer" className="w-full h-[80px] object-cover" />
                            </div>
                            <div className="flex px-3 py-3 gap-x-0.5">
                                {isLoading ? (
                                    categories.map((category) => <Button key={category.id} variant={activeCategory === category.id ? "default" : "outline"} className={cn("text-[8px] px-1 h-2 border", activeCategory === category.id && "border-primary")}>{category.name}</Button>)
                                ) : (
                                    <div className="flex space-x-2">
                                        <Skeleton className="w-8 h-[10px] rounded" />
                                        <Skeleton className="w-8 h-[40px] rounded" />
                                        <Skeleton className="w-8 h-[40px] rounded" />
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col px-3 gap-y-2">
                                {items?.length > 0 ? items?.map((item) => {
                                    return (
                                        <Card className="overflow-hidden p-0" key={item.idTemp ? item.idTemp : item.id}>
                                            <img src={item.image ? item.image : "/assets/images/sample_image_item.png"} alt="imagePlat" className="w-full h-[70px] object-cover" />
                                            <div className="px-2 py-1">
                                                <div className="flex justify-between">
                                                    <p className="font-semibold text-[10px]">{item ? item?.name : "Élément brouillon"}</p>
                                                    <p className="font-semibold text-[10px]">{item?.price} €</p>
                                                </div>
                                                <p className="text-[8px] leading-3 text-gray-500">{item ? item?.description : "Élément brouillon"}</p>
                                            </div>
                                        </Card>

                                    )
                                }) :
                                    <Card className="border-dashed shadow-none border-gray-300 opacity-90">
                                        <div className="flex items-center">
                                            <CardHeader className="w-full ">
                                                <CardTitle className="text-center font-normal text-gray-400 opacity-90">Aucun élément</CardTitle>
                                            </CardHeader>
                                        </div>
                                    </Card>
                                }
                            </div>
                        </div>
                    </Phone>
                </CardContent>

            </Card>

        </Layout>
    )
}

const Items = dynamic(() => Promise.resolve(ItemsComponent), {
    ssr: false,
});

export default Items;