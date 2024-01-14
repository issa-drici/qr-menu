'use client'

import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { languagesDisplay } from "@/lib/languages";
import { createRef, useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { Share2Icon } from "@radix-ui/react-icons";

const labels = {
    share: {
        fr: "Partager",
        en: "Share"
    }
}

function MenuComponent({ profile, categoriesWithItems }) {
    const [activeSection, setActiveSection] = useState('')
    const [activeLanguage, setActiveLanguage] = useState(window.navigator.language.split("-")[0])
    const [isOpenLanguageSelect, setIsOpenLanguageSelect] = useState(false)

    const sectionRefs = useRef(categoriesWithItems.map(() => createRef()))

    const PreviewBanner = () => {
        let imageLink = "/assets/images/marketing_offer.png";

        if (profile?.banner_url) {
            imageLink = profile?.banner_url
        }

        return (
            <img src={imageLink} alt="marketingOffer" className="w-full h-[30vh] object-cover" />
        );
    }

    const PreviewLogo = () => {
        let imageLink = "/assets/images/logo.png";

        if (profile?.logo_url) {
            imageLink = profile?.logo_url
        }

        return (
            <img src={imageLink} alt="language" className="object-cover w-10" style={{ width: `${profile?.sliderValue}%` }} />
        );
    }

    const TriggerLanguages = () => {

        if (profile?.languages?.includes(activeLanguage)) {
            return (
                <>
                    <p className="text-xs font-semibold">{languagesDisplay(activeLanguage).label}</p>
                    <img src={languagesDisplay(activeLanguage).imageUrl} className="w-5 ml-0.5" />
                </>
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

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId)

        if (section) {
            const offsetTop = section.getBoundingClientRect().top + window.pageYOffset

            window.scrollTo({ top: offsetTop - (document.querySelector('#titleBar').offsetHeight + document.querySelector('#categoryBar').offsetHeight), behavior: 'smooth' })
            setActiveSection(sectionId)
        }
    }

    useEffect(() => {
        const firstBar = document.querySelector('#titleBar'); // Remplacer par le sélecteur de votre première barre
        const secondBar = document.querySelector('#categoryBar'); // Remplacer par le sélecteur de votre deuxième barre

        if (firstBar && secondBar) {
            const height = firstBar.offsetHeight;
            secondBar.style.top = `${height}px`;
        }
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            // Parcourir chaque section et vérifier si elle est visible
            sectionRefs.current.forEach((ref) => {
                if (ref.current) {
                    const position = ref.current.getBoundingClientRect();

                    // Vérifiez si la section est visible et ajustez l'état actif si nécessaire
                    if (position && position.top >= 0 && position.top <= (window.innerHeight / 2)) {
                        setActiveSection(ref.current.id);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-white">
            <div className="text-xs">
                <div className="flex justify-between items-center py-1 pl-2 pr-3 sticky top-0 z-50 bg-white" id="titleBar">
                    <div className="flex items-center gap-x-0.5">
                        <PreviewLogo />
                        {!profile?.hideName ? <p className="text-lg font-semibold">{profile?.name ? profile?.name : "Mon restaurant"}</p> : null}
                    </div>
                    <div className="flex items-center">
                        <a href={`sms:&body=J'ai trop aimé le restaurant ${profile?.name}, hésites surtout pas à venir.%0a%0aJe te donne le lien avec toutes les infos pour y aller : https://etasup.vercel.app/site/${profile.type_restaurant.replace(/\s+/g, '-').toLowerCase()}/${profile.city.replace(/\s+/g, '-').toLowerCase()}/${profile.name.replace(/\s+/g, '-').toLowerCase()}`}>
                            <Button variant="ghost" className="text-xs">
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

                </div>
                {/* Image Marketing Restaurant */}
                <PreviewBanner />
                <div className="flex px-3 py-3 gap-x-1 sticky top-56 z-40 bg-white shadow-md mb-3" id="categoryBar">
                    {categoriesWithItems?.map((cat) => (
                        <Button className="px-2 py-1 h-fit" variant={activeSection === cat.id ? "default" : "outline"} onClick={() => scrollToSection(cat?.id)}>{cat?.name[activeLanguage]}</Button>
                    ))}
                </div>
                <div className="flex flex-col px-3">
                    {categoriesWithItems?.map((category, index) => {
                        return (
                            <div key={index}>
                                <div id={category?.id} ref={sectionRefs?.current[index]} >
                                    <p className="text-lg font-bold mb-3">{category.name[activeLanguage]}</p>
                                    <div className="flex flex-col gap-y-3">
                                        {category.items?.map((item) => {
                                            return (
                                                <Card className="overflow-hidden p-0" key={item?.id}>
                                                    {item?.image_url ? (
                                                        <img src={item?.image_url} alt="imagePlat" className="w-full h-[20vh] object-cover" />
                                                    ) : null}
                                                    <div className="px-5 pt-3 pb-5 space-y-2">
                                                        <div className="flex justify-between">
                                                            <div>
                                                                <p className="text-lg font-semibold">{item?.name[activeLanguage]}</p>
                                                                {activeLanguage !== 'fr' ? <p className="text-xs font-light italic text-gray-400">{item?.name['fr']}</p> : null}
                                                            </div>
                                                            <p className="text-lg font-semibold">{item?.price} €</p>
                                                        </div>
                                                        <p className="leading-3 text-gray-500">{item?.description[activeLanguage]}</p>
                                                    </div>
                                                </Card>
                                            )
                                        })}
                                    </div>
                                    <div className="w-full h-px bg-slate-200 my-5"></div>
                                </div>
                                {index === 0 && (
                                    <div>
                                        <a href="http://search.google.com/local/writereview?placeid=ChIJeTi_d79v5kcR594Dps69mFw" target="_blank">
                                            <Card className="px-5 py-2 flex justify-between items-center animate-smallBounce">
                                                <div>
                                                    <p className="text-sm font-bold">Je profite de -5% de réduction</p>
                                                    <p className="text-xs text-gray-500">Laisser un avis Google au restaurant</p>
                                                </div>
                                                <img
                                                    src="/assets/images/google_five_stars.png"
                                                    className="w-32"
                                                />
                                            </Card>
                                        </a>
                                        <div className="w-full h-px bg-slate-200 my-5"></div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="w-full bg-custom-gradient py-1 -space-x-1 flex items-center justify-center mt-5">
                <p className="text-white text-xs">Menu propulsé par</p>
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
        .eq("id", ctx?.query?.restaurantId)
        .single();;

    const { data: category } = await supabaseServerClient
        .from("category")
        .select("*")
        .eq("profile_id", ctx?.query?.restaurantId)
        .order('order', { ascending: true });

    const { data: items } = await supabaseServerClient
        .from("items")
        .select("*")
        .eq("profile_id", ctx?.query?.restaurantId);

    // Création d'une fonction pour obtenir les éléments correspondants d'une catégorie
    function getItemsForCategory(categoryId) {
        return items?.filter(item => item.category_id === categoryId);
    }

    // Filtrage des catégories qui ont des éléments et mappage avec leurs éléments
    const categoriesWithItems = category?.filter(cat => getItemsForCategory(cat?.id).length > 0)
        .map(cat => ({
            ...cat,
            items: getItemsForCategory(cat.id)
        }));

    return {
        props: {
            profile,
            categoriesWithItems
        },
    };
};

const Menu = dynamic(() => Promise.resolve(MenuComponent), {
    ssr: false,
});

export default Menu;