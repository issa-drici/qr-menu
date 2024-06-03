'use client'

import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { languagesDisplay } from "@/lib/languages";
import { Share2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";

const labels = {
    share: {
        fr: "Partager",
        en: "Share",
        es: "Compartir",
        ar: "مشاركة",
        de: "Teilen",
        it: "Condividi",
        pt: "Compartilhar",
        ru: "Поделиться"
    },
    viewMenu: {
        fr: "Voir le menu",
        en: "View the Menu",
        es: "Ver el Menú",
        ar: "عرض القائمة",
        de: "Menü anzeigen",
        it: "Visualizza il Menu",
        pt: "Ver o Menu",
        ru: "Просмотреть меню"
    },
    goTo: {
        fr: "Se rendre à", en: "Get Directions", es: "Obtener Direcciones", ar: "الحصول على الاتجاهات", de: "Wegbeschreibung", it: "Ottieni Indicazioni", pt: "Obter Direções", ru: "Получить указания"
    },
    hours: {
        fr: "Horaires", en: "Opening Hours", es: "Horario de Apertura", ar: "ساعات العمل", de: "Öffnungszeiten", it: "Orari di Apertura", pt: "Horário de Funcionamento", ru: "Часы работы"
    }
}

const formaterChaine = (chaine) => {
    // Diviser la chaîne par le caractère '-'
    let mots = chaine.split('-');

    // Formater chaque mot en l'entourant de guillemets simples
    mots = mots.map(mot => `'${mot}'`);

    // Joindre les mots formatés avec ' & '
    return mots.join(' & ');
}

function WebsiteComponent({ profile }) {
    const router = useRouter()

    const [activeLanguage, setActiveLanguage] = useState(router?.query?.l ? router?.query?.l : window.navigator.language.split("-")[0])
    const [isOpenLanguageSelect, setIsOpenLanguageSelect] = useState(false)

    const labelsWithValues = {
        sms: {
            fr: `sms:&body=J'ai trop aimé le restaurant ${profile?.name}, hésites surtout pas à venir.%0a%0aJe te donne le lien avec toutes les infos pour y aller : https://www.eatsup.fr/site/${profile.type_restaurant.replace(/\s+/g, '-').toLowerCase()}/${profile.city.replace(/\s+/g, '-').toLowerCase()}/${profile.name.replace(/\s+/g, '-').toLowerCase()}?l=${activeLanguage}`,
            en: `sms:&body=I loved the ${profile?.name} restaurant too much, don't hesitate to come.%0a%0aI'm giving you the link with all the information to get there: https://www.eatsup.fr/site/${profile.type_restaurant.replace(/\s+/g, '-').toLowerCase()}/${profile.city.replace(/\s+/g, '-').toLowerCase()}/${profile.name.replace(/\s+/g, '-').toLowerCase()}?l=${activeLanguage}`,
            es: `sms:&body=Me encantó demasiado el restaurante ${profile?.name}, no dudes en venir.%0a%0aTe estoy dando el enlace con toda la información para llegar allí: https://www.eatsup.fr/site/${profile.type_restaurant.replace(/\s+/g, '-').toLowerCase()}/${profile.city.replace(/\s+/g, '-').toLowerCase()}/${profile.name.replace(/\s+/g, '-').toLowerCase()}?l=${activeLanguage}`,
            ar: `sms:&body=أحببت مطعم كثيرًا، لا تتردد في القدوم. أنا أقدم لك الرابط مع جميع المعلومات للوصول إلى هناك: https://www.eatsup.fr/site/${profile.type_restaurant.replace(/\s+/g, '-').toLowerCase()}/${profile.city.replace(/\s+/g, '-').toLowerCase()}/${profile.name.replace(/\s+/g, '-').toLowerCase()}?l=${activeLanguage}`,
            de: `sms:&body=Ich habe das Restaurant ${profile?.name} zu sehr geliebt, zögere nicht zu kommen.%0a%0aIch gebe dir den Link mit allen Informationen, um dorthin zu gelangen: https://www.eatsup.fr/site/${profile.type_restaurant.replace(/\s+/g, '-').toLowerCase()}/${profile.city.replace(/\s+/g, '-').toLowerCase()}/${profile.name.replace(/\s+/g, '-').toLowerCase()}?l=${activeLanguage}`,
            it: `sms:&body=Ho amato troppo il ristorante ${profile?.name}, non esitare a venire.%0a%0aTi sto dando il link con tutte le informazioni per arrivarci: https://www.eatsup.fr/site/${profile.type_restaurant.replace(/\s+/g, '-').toLowerCase()}/${profile.city.replace(/\s+/g, '-').toLowerCase()}/${profile.name.replace(/\s+/g, '-').toLowerCase()}?l=${activeLanguage}`,
            pt: `sms:&body=Amei demais o restaurante ${profile?.name}, não hesite em vir.%0a%0aEstou te dando o link com todas as informações para chegar lá: https://www.eatsup.fr/site/${profile.type_restaurant.replace(/\s+/g, '-').toLowerCase()}/${profile.city.replace(/\s+/g, '-').toLowerCase()}/${profile.name.replace(/\s+/g, '-').toLowerCase()}?l=${activeLanguage}`,
            ru: `sms:&body=Мне слишком понравился ресторан ${profile?.name}, не стесняйтесь приходить.%0a%0aЯ даю вам ссылку со всей информацией, чтобы добраться туда https://www.eatsup.fr/site/${profile.type_restaurant.replace(/\s+/g, '-').toLowerCase()}/${profile.city.replace(/\s+/g, '-').toLowerCase()}/${profile.name.replace(/\s+/g, '-').toLowerCase()}?l=${activeLanguage}`

        }
    }

    const TriggerLanguages = () => {

        if (profile?.languages?.includes(activeLanguage)) {
            return (
                <Button variant="secondary" className="px-2 py-1 h-fit">
                    <p className="text-xs font-semibold">{languagesDisplay(activeLanguage).label}</p>
                    <img src={languagesDisplay(activeLanguage).imageUrl} className="w-5 ml-0.5" />
                </Button>
            )
        }

        return (
            <>
                <p className="text-xs font-semibold">{languagesDisplay(profile?.languages ? profile?.languages[0] : activeLanguage)?.label}</p>
                <img src={languagesDisplay(profile?.languages ? profile?.languages[0] : activeLanguage)?.imageUrl} className="w-5 ml-0.5" />
            </>
        );
    }

    const PopupLanguages = () => {
        const htmlRender = profile?.languages?.map((language) => (
            <CommandItem
                key={language}
                value={language}
                onSelect={() => {
                    setActiveLanguage(language)
                    setIsOpenLanguageSelect(false)
                }}
            >
                <p className="text-xs font-semibold">{language?.toUpperCase()}</p>
                <img src={languagesDisplay(language)?.imageUrl} className="w-5 ml-1" />
            </CommandItem>
        ))

        return htmlRender
    }

    return (
        <div className="bg-slate-100 min-h-screen leading-5 tracking-tight">
            <div className="absolute right-3 top-2 flex space-x-1 items-center z-10">
                <a href={labelsWithValues.sms[activeLanguage]}>
                    <Button Button variant="secondary" className="px-2 py-1 h-fit">
                        {labels?.share[activeLanguage]} <Share2Icon className="ml-1 h-3 w-3" />
                    </Button>
                </a>
                <Popover open={isOpenLanguageSelect} onOpenChange={(isOp) => {
                    if (isOp === true) return;
                    setIsOpenLanguageSelect(false);
                }}>
                    <PopoverTrigger asChild>
                        <div className="flex items-center pr-1" onClick={() => setIsOpenLanguageSelect(true)}>
                            <TriggerLanguages />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit p-0">
                        <Command>
                            <CommandList>
                                <PopupLanguages />
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="relative flex flex-col justify-center items-center w-full h-52 bg-custom-gradient text-white mb-10">
                <img src={profile?.logo_url} alt="logo" className="object-cover h-16" />
                <p className="mt-3 font-bold text-2xl">{profile?.name}</p>
                <p className="text-xs font-semibold tracking-normal">{profile?.type_restaurant}</p>
                <div className="absolute left-5 right-5 bottom-0 transform translate-y-1/2 flex space-x-3">
                    <a href="tel:+33140373912" className="w-full">
                        <Button className="shadow shadow-black w-full">+33 1 40 37 39 12</Button>
                    </a>
                    <a href={`/restaurant/${profile?.id}/menu?l=${activeLanguage}`} target="_blank" className="w-full">
                        <Button className="shadow shadow-black w-full" variant="secondary">{labels.viewMenu[activeLanguage]}</Button>
                    </a>
                </div>
            </div>
            <div className="flex flex-col space-y-3">
                <Card className="mx-3">
                    <CardContent className="pt-6">
                        <p>{profile?.description[activeLanguage]}</p>
                    </CardContent>
                </Card>
                <img src={profile?.banner_url} alt="marketingOffer" className="w-full h-[30vh] object-cover" />

                <Card className="mx-3">
                    <CardHeader>
                        <CardTitle>{labels.goTo[activeLanguage]} {profile?.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between w-full">
                            <div className="w-full">
                                <p className="font-bold">{profile?.adress}</p>
                                <p className="text-sm">{profile?.postal_code} - {profile?.city}</p>
                                <p className="text-sm">{profile?.country}</p>
                            </div>
                            <a href={`https://www.google.fr/maps/place/${[profile?.adress.split(' ').join('+'), profile?.postal_code.split(' ').join('+'), profile?.city.split(' ').join('+'), profile?.country.split(' ').join('+')].join('+')}`} target="_blank">
                                <img src="/assets/images/maps_image.png" className="w-28 h-20" />
                            </a>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mx-3">
                    <CardHeader>
                        <CardTitle>{labels.hours[activeLanguage]}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full">
                            <ul className="list-disc pl-5 leading-normal">
                                <li><p>Lundi : 12h30 - 22h00</p></li>
                                <li><p>Mardi : 12h30 - 22h00</p></li>
                                <li><p>Mercredi : Fermé</p></li>
                                <li><p>Jeudi : 12h30 - 22h00</p></li>
                                <li><p>Vendredi : 12h30 - 22h00</p></li>
                                <li><p>Samedi : 12h30 - 22h00</p></li>
                                <li><p>Dimanche : 12h30 - 22h00</p></li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="w-full bg-custom-gradient py-1 -space-x-1 flex items-center justify-center mt-5">
                <p className="text-white text-xs">Propulsé par</p>
                <Link href={`/`} legacyBehavior>
                    <a className="text-white no-underline hover:text-white hover:no-underline">
                        <img src="/assets/images/logo/logo_white.png" className="h-6 object-contain" />
                    </a>
                </Link>
            </div>
        </div>
    );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

    // Create authenticated Supabase Client
    const supabaseServerClient = createServerSupabaseClient<Database>(ctx);

    const { data: profile } = await supabaseServerClient
        .from("profile")
        .select("*")
        .textSearch('type_restaurant', formaterChaine(ctx?.query?.typeRestaurant))
        .textSearch('city', formaterChaine(ctx?.query?.cityName))
        .textSearch('name', formaterChaine(ctx?.query?.restaurantName))
        .single();;


    return {
        props: {
            profile,
        },
    };
};

const Website = dynamic(() => Promise.resolve(WebsiteComponent), {
    ssr: false,
});

export default Website;