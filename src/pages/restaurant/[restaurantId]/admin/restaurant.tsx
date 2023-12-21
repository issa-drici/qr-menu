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
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import FieldInput from "@/components/field-input"
import FieldCheckbox from "@/components/field-checkbox"
import dynamic from "next/dynamic"
import React, { useEffect, useState } from "react"
import FieldSimpleCheckbox from "@/components/field-simple-checkbox"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { languagesDisplay } from "@/lib/languages"
import Layout from "@/layout/layout"
import { useUserContext } from "@/context/user"
import { useRouter } from "next/router"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database.types"
import Dropzone from "@/components/dropzone"
import Image from "next/image"

const FormSchema = z.object({
    name: z.string(),
    adress: z.string().optional(),
    postal_code: z.string().optional(),
    country: z.string().optional(),
    logo_url: z.any().optional(),
    banner_url: z.any(),
    languages: z.array(z.string()),
    hide_name: z.boolean().optional(),
    width_logo: z.optional(z.number())
})

function RestaurantComponent() {
    const { user, isLoading } = useUserContext();
    const router = useRouter();

    const supabaseClient = useSupabaseClient<Database>();

    const [profile, setProfile] = useState(null)
    const [logo, setLogo] = useState(null)
    const [logoUrl, setLogoUrl] = useState(null)
    const [banner, setBanner] = useState(null)
    const [bannerUrl, setBannerUrl] = useState(null)
    const [hideName, setHideName] = useState(false)
    const [sliderValue, setSliderValue] = useState(15)
    const [restaurantName, setRestaurantName] = useState(user?.name)
    const [languages, setLanguages] = useState(user?.languages)
    const [isLoadingGeneral, setIsloadingGeneral] = useState(false)

    
    async function getFileWithPath(path: string) {
        const { data } = await supabaseClient.storage
                .from('images')
                .getPublicUrl(path) 
                
                return data?.publicUrl;
    }

    async function getProfileInfo() {
        setIsloadingGeneral(true)
        const { data: profile, status, statusText } = await supabaseClient
                    .from("profile")
                    .select("*")
                    .eq("id", user?.id)
                    .single();
                    setProfile(profile)

                setRestaurantName(profile?.name)
                setLanguages(profile?.languages)
                setHideName(profile?.hide_name)
                setSliderValue(profile?.width_logo)
                setIsloadingGeneral(false)
                }

    const defaultValues = {
        languages: profile?.languages ?? [window.navigator.language.split("-")[0]],
        hide_name: profile?.hide_name ?? false,
        width_logo: 13,
        name: profile?.name ?? "",
        adress: profile?.adress ?? "",
        postal_code: profile?.postal_code ?? "",
        country: profile?.country ?? "",
        banner_url: profile?.banner_url ?? "",
        logo_url: profile?.logo_url ?? ""
    }

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: defaultValues
    })

    

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const { data: dataUpdated, error } = await supabaseClient
            .from('profile')
            .update(data)
            .eq('id', user?.id)
            .select()

            if (logo) {
                if (user?.logo_path) {
                    const { data: fileUpdated, error: fileError } = await supabaseClient.storage
                    .from('images')
                    .update(user?.logo_path, logo, {
                        upsert: true,
                    })

                    const path  = await getFileWithPath(fileUpdated?.path)


                    const { error } = await supabaseClient
                    .from('profile')
                    .update({logo_url: path, logo_path: fileUpdated?.path})
                    .eq('id', user?.id)

                } else {
                    const { data: fileUpdated, error: fileError } = await supabaseClient.storage
                    .from('images')
                    .upload(`images_${Date.now()}.png`, logo)

                    const path  = await getFileWithPath(fileUpdated?.path)


                    const { error } = await supabaseClient
                    .from('profile')
                    .update({logo_url: path, logo_path: fileUpdated?.path})
                    .eq('id', user?.id)
                }
            }

            if (banner) {
                if (user?.banner_path) {
                    const { data: fileUpdated, error: fileError } = await supabaseClient.storage
                    .from('images')
                    .update(user?.banner_path, banner, {
                        upsert: true,
                    })

                    const path  = await getFileWithPath(fileUpdated?.path)


                    const { error } = await supabaseClient
                    .from('profile')
                    .update({banner_url: path, banner_path: fileUpdated?.path})
                    .eq('id', user?.id)

                } else {
                    const { data: fileUpdated, error: fileError } = await supabaseClient.storage
                    .from('images')
                    .upload(`images_${Date.now()}.png`, banner)

                    const path  = await getFileWithPath(fileUpdated?.path)


                    const { error } = await supabaseClient
                    .from('profile')
                    .update({banner_url: path, banner_path: fileUpdated?.path})
                    .eq('id', user?.id)
                    
                }
            }

            toast({ title: 'Enregistrement réussi', description: 'Les informations ont été mises à jour.', className: "bg-green-500 border-green-500 text-white" });
        } catch (error) {
            console.error('Erreur:', error);
            toast({ title: 'Erreur', description: 'Un problème est survenu lors de la mise à jour des informations.', variant: "destructive" });
        }
    }
   



    const onLogoChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setLogoUrl(URL.createObjectURL(event.target.files[0]));
            setLogo(event.target.files[0]);
        } else {
            setLogoUrl(null)
            setLogo(null)
        }
    }
    const onBannerChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setBannerUrl(URL.createObjectURL(event.target.files[0]));
            setBanner(event.target.files[0]);
        } else {
            setBannerUrl(null)
            setBanner(null)
        }
    }

    const onHideName = (value) => {
        setHideName(value)
        if (!value) {
            setSliderValue(13)
        }
    }

    const onSliderChange = (value: Array<Number>) => {
        setSliderValue(value[0])
        form.setValue("width_logo", value[0])
    }

    const PreviewBanner = () => {
        let imageLink = "/assets/images/marketing_offer.png";
    
        if (bannerUrl) {
            imageLink = bannerUrl
        } else {
            if (profile?.banner_url) {
                imageLink = `${profile?.banner_url}?v=${new Date()}`
            }
        }

        return (
                <img src={imageLink} alt="marketingOffer" className="w-full h-[80px] object-cover" />
        );
    }

    const PreviewLogo = () => {
        let imageLink = "/assets/images/logo.png";
    
        if (logoUrl) {
            imageLink = logoUrl
        } else {
            if (profile?.logo_url) {
                imageLink = `${profile?.logo_url}?v=${new Date()}`
            }
        }

        return (
        <img src={imageLink} alt="language" className="object-cover w-5" style={{ width: `${sliderValue}%` }} />
    );
}

    // useEffect(() => {
    //     if (!isLoading) {
    //         if (!!!user) {
    //             router.push('/')
    //         }
    //     }
    // }, [])

    useEffect(() => {
        form.reset(defaultValues)
    }, [profile])

    useEffect(() => {
        if (!isLoading) {
            if (!!user) {
                getProfileInfo()
            }
        }
    }, [user])


    useEffect(() => {
        const navigatorLanguage = window.navigator.language.split("-")[0];
        const isNativeLanguage = languages?.includes(navigatorLanguage);

        if (languages) {
            if (isNativeLanguage) {
                const tempLanguages = languages.filter((l) => l !== navigatorLanguage).sort();
                tempLanguages.unshift(navigatorLanguage);

                // Comparaison des tableaux
                const areArraysDifferent = tempLanguages.length !== languages.length ||
                    tempLanguages.some((val, index) => val !== languages[index]);

                if (areArraysDifferent) {
                    setLanguages(tempLanguages);
                }
            }
        }
    }, [languages]);

    if (!isLoading || !isLoadingGeneral) {
        if (!!!user) {
            return null
        }
    }

    return (
        <Layout isLoading={isLoading || isLoadingGeneral}>
            { user ? (
                <>
                    <Card className="w-2/3 flex flex-col">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col h-full">
                                <CardHeader>
                                    <CardTitle>Gérer les informations du restaurant</CardTitle>
                                    <CardDescription>Vous pouvez modifier toutes les informations du restaurant à cet endroit.</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <div className="grid w-full items-start gap-4 grid-cols-2">
                                        <FieldInput form={form} name="name" label="Nom" placeholder="Mon restaurant" onChange={(e) => setRestaurantName(e.target.value)} />
                                        <FieldInput form={form} name="adress" label="Adresse" placeholder="Adresse du restaurant" />
                                        <FieldInput form={form} name="postal_code" label="Code Postal" placeholder="Code postal du restaurant" />
                                        <FieldInput form={form} name="country" label="Pays" placeholder="Pays du restaurant" />
                                        <FieldCheckbox form={form} name="languages" label="Languages" onChange={(value) => setLanguages(value)} items={[
                                            {
                                                label: "Français",
                                                id: 'fr'
                                            },
                                            {
                                                label: "Anglais",
                                                id: 'en'
                                            },
                                            {
                                                label: "Espagnol",
                                                id: 'es'
                                            },
                                            {
                                                label: "Arabe",
                                                id: 'ar'
                                            },
                                            {
                                                label: "Allemand",
                                                id: 'de'
                                            },
                                            {
                                                label: "Italien",
                                                id: 'it'
                                            },
                                            {
                                                label: "Portugais",
                                                id: 'pt'
                                            },
                                            {
                                                label: "Russe",
                                                id: 'ru'
                                            },
                                        ]} />
                                        
                                        <div className="flex flex-col h-full gap-4 row-span-2">
                                            <FieldInput form={form} type="file" name="logo" label={
                                              <Dropzone fileSrc={logoUrl ? logoUrl : (user?.logo_url && `${user?.logo_url}?v=${new Date()}`)} className="w-full h-28" label="Logo" />
                                            }
                                            onChange={onLogoChange} />
                                              <FieldInput form={form} type="file" name="banner" label={
                                              <Dropzone fileSrc={bannerUrl ? bannerUrl : (user?.banner_url && `${user?.banner_url}?v=${new Date()}`)} className="w-full h-32" label="Bannière" />
                                            }
                                            onChange={onBannerChange} />
                                        </div>
                                        <div className="rounded-md border p-4 shadow space-y-3">
                                            <FieldSimpleCheckbox form={form} name="hide_name" label="Masquer le nom du restaurant" onChange={onHideName} />
                                            {hideName ? (
                                                <div className="flex space-x-3 ">
                                                    <FormLabel className="flex-1">
                                                        Taille du logo
                                                    </FormLabel>
                                                    <Slider className="flex-1" defaultValue={[sliderValue] ?? [10]} min={5} max={50} step={1} onValueChange={onSliderChange} />
                                                    <FormField
                                                        control={form.control}
                                                        name="width_logo"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input type="hidden" value={sliderValue} {...field} />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            )
                                                : null}
                                        </div>
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
                            <CardDescription>Voici une prévisualisation de la présentation de votre entreprise sur le menu en ligne.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <Phone>
                                <div className="text-xs">
                                    <div>
                                        <div className="flex justify-between py-1 pl-2 pr-3">
                                            <div className="flex items-center gap-x-0.5">
                                                <PreviewLogo />
                                                {!hideName ? <p className="text-[10px] font-bold">{restaurantName ? restaurantName : "Mon restaurant"}</p> : null}
                                            </div>
                                            <Popover open={languages && languages?.length > 1}>
                                                <PopoverTrigger asChild>
                                                    <div className="flex items-center">
                                                        <p className="text-[8px]">{languagesDisplay(languages ? languages[0] : "fr")?.label}</p>
                                                        <img src={languagesDisplay(languages ? languages[0] : "fr")?.imageUrl} className="w-5 h-2 ml-0.5" />
                                                    </div>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-fit p-0">
                                                    <Command>
                                                        <CommandGroup>
                                                            {languages?.map((language) => (
                                                                <CommandItem
                                                                    key={language}
                                                                    value={language}
                                                                    className="text-[8px] p-0.5"
                                                                >
                                                                    <p className="text-[8px]">{language?.toUpperCase()}</p>
                                                                    <img src={languagesDisplay(language)?.imageUrl} className="w-3 ml-1" />
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        {/* Image Marketing Restaurant */}
                                        <PreviewBanner />
                                    </div>
                                    <div className="flex px-3 py-3 gap-y-2 blur-sm">
                                        <Button className="text-[8px] px-1 h-2" variant="outline">Tout</Button>
                                        <Button className="text-[8px] px-1 h-2" variant="outline">Entrée</Button>
                                        <Button className="text-[8px] px-1 h-2" variant="outline">Plat</Button>
                                        <Button className="text-[8px] px-1 h-2" variant="outline">Dessert</Button>
                                    </div>
                                    <div className="flex flex-col px-3 gap-y-2 blur-sm">
                                        <Card className="overflow-hidden p-0">
                                            <img src="/assets/images/pates_saumon.png" alt="imagePlat" className="w-full h-[70px] object-cover" />
                                            <div className="px-2 py-1">
                                                <div className="flex justify-between">
                                                    <p className="font-semibold text-[10px]">Pâtes au saumon</p>
                                                    <p className="font-semibold text-[10px]">13.00 €</p>
                                                </div>
                                                <p className="text-[8px] leading-3 text-gray-500">Des pâtes al dente avec saumon frais et sauce crème onctueuse, relevées de fines herbes.</p>
                                            </div>
                                        </Card>
                                        <Card className="overflow-hidden p-0">
                                            <img src="/assets/images/pates_saumon.png" alt="imagePlat" className="w-full h-[70px] object-cover" />
                                            <div className="px-2 py-1">
                                                <div className="flex justify-between">
                                                    <p className="font-semibold text-[10px]">Pâtes au saumon</p>
                                                    <p className="font-semibold text-[10px]">13.00 €</p>
                                                </div>
                                                <p className="text-[8px] leading-3 text-gray-500">Des pâtes al dente avec saumon frais et sauce crème onctueuse, relevées de fines herbes.</p>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </Phone>
                        </CardContent>
                    </Card>
                </>
            ) : null}
        </Layout>
    )
}

const Restaurant = dynamic(() => Promise.resolve(RestaurantComponent), {
    ssr: false,
});

export default Restaurant;




// async function onSubmit(data: z.infer<typeof FormSchema>) {

//     const formData = new FormData();

//     // Ajouter les données du formulaire
//     // Object.keys(data).forEach(key => {
//     //     if (data[key] !== null) {
//     //         formData.append(key, data[key]);
//     //     }
//     // });

    

//     // Ajouter les images
//     if (logo) {
//         formData.append('files', logo);
//     }
//     if (banner) {
//         formData.append('files', banner);
//     }

//     try {
//         // const response = await fetch('/api/restaurant/totototo/update', {
//         //     method: 'POST',
//         //     body: formData, // Pas besoin de spécifier Content-Type
//         //     headers: {
//         //         'x-api-route-secret': process.env.API_ROUTE_SECRET as string,
//         //     },
//         // });

//         const { data: dataUpdated, error } = await supabaseClient
//         .from('profile')
//         .update(data)
//         .eq('id', user?.id)
//         .select()

//         // const result = await response.json();
//         // console.log('Succès:', result);
//         toast({ title: 'Enregistrement réussi', description: 'Les informations ont été mises à jour.' });
//     } catch (error) {
//         console.error('Erreur:', error);
//         toast({ title: 'Erreur', description: 'Un problème est survenu lors de la mise à jour des informations.' });
//     }
// }