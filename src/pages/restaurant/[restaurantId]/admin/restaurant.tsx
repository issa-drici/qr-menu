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
import { useEffect, useState } from "react"
import FieldSimpleCheckbox from "@/components/field-simple-checkbox"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { languagesDisplay } from "@/lib/languages"
import Layout from "@/layout/layout"

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

function RestaurantComponent() {
    const [logo, setLogo] = useState(null)
    const [banner, setBanner] = useState(null)
    const [hideName, setHideName] = useState(false)
    const [sliderValue, setSliderValue] = useState(15)
    const [restaurantName, setRestaurantName] = useState(null)
    const [languages, setLanguages] = useState(null)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            languages: [window.navigator.language.split("-")[0]],
            hide_name: false,
            width_logo: 13
        },

    })

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


    const onLogoChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setLogo(URL.createObjectURL(event.target.files[0]));
        } else {
            setLogo(null)
        }
    }
    const onBannerChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setBanner(URL.createObjectURL(event.target.files[0]));
        } else {
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

    useEffect(() => {
        const isNativeLanguage = languages?.find(i => i === window.navigator.language.split("-")[0])

        if (isNativeLanguage) {
            const tempLanguages = languages?.filter((l) => l !== window.navigator.language.split("-")[0]).sort()
            tempLanguages?.unshift(window.navigator.language.split("-")[0])
            setLanguages(tempLanguages)
        }
    }, [languages])

    return (
        <Layout>
            <Card className="w-2/3 flex flex-col">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col h-full">
                        <CardHeader>
                            <CardTitle>Gérer les informations du restaurant</CardTitle>
                            <CardDescription>Vous pouvez modifier toutes les informations du restaurant à ce endroit.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <div className="grid w-full items-center gap-4 grid-cols-2">
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
                                <div className="flex flex-col h-full gap-4">
                                    <FieldInput form={form} type="file" name="logo" label="Logo" placeholder="Pays du restaurant" onChange={onLogoChange} />
                                    <FieldInput form={form} type="file" name="banner" label="Bannière" placeholder="Pays du restaurant" onChange={onBannerChange} />
                                </div>
                                <div className="rounded-md border p-4 shadow space-y-3">
                                    <FieldSimpleCheckbox form={form} name="hide_name" label="Masquer le nom du restaurant" onChange={onHideName} />
                                    {hideName ? (
                                        <div className="flex space-x-3 ">
                                            <FormLabel className="flex-1">
                                                Taille du logo
                                            </FormLabel>
                                            <Slider className="flex-1" defaultValue={[10]} min={5} max={50} step={1} onValueChange={onSliderChange} />
                                            <FormField
                                                control={form.control}
                                                name="width_logo"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input type="hidden"  {...field} />
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
                                        <img src={logo ? logo : "/assets/images/logo.png"} alt="language" className="object-cover w-5" style={{ width: `${sliderValue}%` }} />
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
                                <img src={banner ? banner : "/assets/images/marketing_offer.png"} alt="marketingOffer" className="w-full h-[80px] object-cover" />

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
        </Layout>
    )
}

const Restaurant = dynamic(() => Promise.resolve(RestaurantComponent), {
    ssr: false,
});

export default Restaurant;