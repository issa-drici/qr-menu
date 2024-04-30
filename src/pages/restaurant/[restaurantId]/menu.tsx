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
import { Pencil1Icon, Share2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { useLoadingContext } from "@/context/loading";

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
    discount: {
        fr: "Je profite de -5% de réduction",
        en: "I'm enjoying a -5% discount",
        es: "Estoy disfrutando de un descuento del -5%",
        ar: "أستمتع بخصم قدره -5%",
        de: "Ich genieße einen Rabatt von -5%",
        it: "Sto approfittando di uno sconto del -5%",
        pt: "Estou aproveitando um desconto de -5%",
        ru: "Я пользуюсь скидкой -5%"
    },
    googleReview: {
        fr: "Laisser un avis Google au restaurant",
        en: "Leave a Google review for the restaurant",
        es: "Dejar una reseña en Google para el restaurante",
        ar: "اترك تقييمًا على Google للمطعم",
        de: "Eine Google-Bewertung für das Restaurant hinterlassen",
        it: "Lascia una recensione su Google per il ristorante",
        pt: "Deixe uma avaliação no Google para o restaurante",
        ru: "Оставьте отзыв о ресторане на Google"

    }
}

function MenuComponent({ profile, categoriesWithItems }) {
    const router = useRouter()

    const [activeSection, setActiveSection] = useState('')
    const [activeLanguage, setActiveLanguage] = useState(router?.query?.l ? router?.query?.l : window.navigator.language.split("-")[0])
    const [isOpenLanguageSelect, setIsOpenLanguageSelect] = useState(false)

    const { pushWithLoading } = useLoadingContext()

    const labelsWithValues = profile?.type_restaurant && profile?.city ? {
        sms: {
            fr: `sms:&body=J'ai trop aimé le restaurant ${profile?.name}, hésites surtout pas à venir.%0a%0aJe te donne le lien avec toutes les infos pour y aller : https://eatsup.vercel.app/site/${profile.type_restaurant.replace(/\s+/g, '-').toLowerCase()}/${profile.city.replace(/\s+/g, '-').toLowerCase()}/${profile.name.replace(/\s+/g, '-').toLowerCase()}?l=${activeLanguage}`,
            en: `sms:&body=I loved the ${profile?.name} restaurant too much, don't hesitate to come.%0a%0aI'm giving you the link with all the information to get there: https://eatsup.vercel.app/site/${profile.type_restaurant.replace(/\s+/g, '-').toLowerCase()}/${profile.city.replace(/\s+/g, '-').toLowerCase()}/${profile.name.replace(/\s+/g, '-').toLowerCase()}?l=${activeLanguage}`,
            es: `sms:&body=Me encantó demasiado el restaurante ${profile?.name}, no dudes en venir.%0a%0aTe estoy dando el enlace con toda la información para llegar allí: https://eatsup.vercel.app/site/${profile.type_restaurant.replace(/\s+/g, '-').toLowerCase()}/${profile.city.replace(/\s+/g, '-').toLowerCase()}/${profile.name.replace(/\s+/g, '-').toLowerCase()}?l=${activeLanguage}`,
            ar: `sms:&body=أحببت مطعم كثيرًا، لا تتردد في القدوم. أنا أقدم لك الرابط مع جميع المعلومات للوصول إلى هناك: https://eatsup.vercel.app/site/${profile.type_restaurant.replace(/\s+/g, '-').toLowerCase()}/${profile.city.replace(/\s+/g, '-').toLowerCase()}/${profile.name.replace(/\s+/g, '-').toLowerCase()}?l=${activeLanguage}`,
            de: `sms:&body=Ich habe das Restaurant ${profile?.name} zu sehr geliebt, zögere nicht zu kommen.%0a%0aIch gebe dir den Link mit allen Informationen, um dorthin zu gelangen: https://eatsup.vercel.app/site/${profile.type_restaurant.replace(/\s+/g, '-').toLowerCase()}/${profile.city.replace(/\s+/g, '-').toLowerCase()}/${profile.name.replace(/\s+/g, '-').toLowerCase()}?l=${activeLanguage}`,
            it: `sms:&body=Ho amato troppo il ristorante ${profile?.name}, non esitare a venire.%0a%0aTi sto dando il link con tutte le informazioni per arrivarci: https://eatsup.vercel.app/site/${profile.type_restaurant.replace(/\s+/g, '-').toLowerCase()}/${profile.city.replace(/\s+/g, '-').toLowerCase()}/${profile.name.replace(/\s+/g, '-').toLowerCase()}?l=${activeLanguage}`,
            pt: `sms:&body=Amei demais o restaurante ${profile?.name}, não hesite em vir.%0a%0aEstou te dando o link com todas as informações para chegar lá: https://eatsup.vercel.app/site/${profile.type_restaurant.replace(/\s+/g, '-').toLowerCase()}/${profile.city.replace(/\s+/g, '-').toLowerCase()}/${profile.name.replace(/\s+/g, '-').toLowerCase()}?l=${activeLanguage}`,
            ru: `sms:&body=Мне слишком понравился ресторан ${profile?.name}, не стесняйтесь приходить.%0a%0aЯ даю вам ссылку со всей информацией, чтобы добраться туда https://eatsup.vercel.app/site/${profile.type_restaurant.replace(/\s+/g, '-').toLowerCase()}/${profile.city.replace(/\s+/g, '-').toLowerCase()}/${profile.name.replace(/\s+/g, '-').toLowerCase()}?l=${activeLanguage}`
        }
    } : null

    const sectionRefs = useRef(categoriesWithItems.map(() => createRef()))

    const PreviewBanner = () => {
        let imageLink = "/assets/images/marketing_offer.png";

        if (profile?.banner_url) {
            return (
                <img src={profile?.banner_url} alt="marketingOffer" className="w-full h-[30vh] object-cover" />
            );
        }

        return null

        // let imageLink = "/assets/images/marketing_offer.png";

        // if (profile?.banner_url) {
        //     imageLink = profile?.banner_url
        // }

        // return (
        //     <img src={imageLink} alt="marketingOffer" className="w-full h-[30vh] object-cover" />
        // );
    }

    const PreviewLogo = () => {
        let imageLink = "/assets/images/logo.png";

        if (profile?.logo_url) {
            return (
                <img src={profile?.logo_url} alt="language" className="object-cover w-10" style={{ width: `${profile?.sliderValue}%` }} />
            );
        }

        return null


        // let imageLink = "/assets/images/logo.png";

        // if (profile?.logo_url) {
        //     imageLink = profile?.logo_url
        // }

        // return (
        //     <img src={imageLink} alt="language" className="object-cover w-10" style={{ width: `${profile?.sliderValue}%` }} />
        // );
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
        const editionBar = document.querySelector('#editionBar'); // Remplacer par le sélecteur de votre première barre
        const firstBar = document.querySelector('#titleBar'); // Remplacer par le sélecteur de votre première barre
        const secondBar = document.querySelector('#categoryBar'); // Remplacer par le sélecteur de votre deuxième barre

        if (editionBar && firstBar && secondBar) {
            firstBar.style.top = `${editionBar.offsetHeight}px`;
            secondBar.style.top = `${editionBar.offsetHeight + firstBar.offsetHeight}px`;
        } else if (firstBar && secondBar) {
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
        <div className="bg-slate-100 h-full">
            {router?.query?.edition === '1' ? (
                <div className="flex justify-between items-center p-2 sticky top-0 bg-slate-100" id="editionBar">
                    <Link href={`/admin/restaurant`} legacyBehavior>
                        <a className="text-white no-underline hover:text-white hover:no-underline">
                            <img src="/assets/images/logo/logo.png" className=" h-8 md:h-12 object-contain" />
                        </a>
                    </Link>
                    <Button variant="default" onClick={() => router.back()}>
                        <Pencil1Icon className="h-4 w-4 mr-2" /> Retour à l&apos;édition
                    </Button>
                </div>
            ) : null}
            <div className={cn("text-xs h-full", router?.query?.edition === '1' ? "bg-gray-100 pt-2 px-2" : null)}>
                <div className="flex justify-between items-center py-1 pl-2 pr-3 sticky top-0 z-50 bg-white" id="titleBar">
                    <div className="flex items-center gap-x-0.5">
                        <PreviewLogo />
                        {!profile?.hideName ? <p className="text-lg font-semibold">{profile?.name ? profile?.name : "Mon restaurant"}</p> : null}
                    </div>
                    <div className="flex items-center">
                        {labelsWithValues ? (
                            <a href={labelsWithValues.sms[activeLanguage]}>
                                <Button variant="ghost" className="text-xs">
                                    {labels?.share[activeLanguage]} <Share2Icon className="ml-1 h-3 w-3" />
                                </Button>
                            </a>
                        ) : null}
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
                {categoriesWithItems?.length > 0 ? (
                    <>
                        <div className="flex px-3 py-3 gap-x-1 sticky top-56 z-40 bg-slate-100 shadow-md mb-3 overflow-x-scroll" id="categoryBar">
                            {categoriesWithItems?.map((cat) => (
                                <Button className="px-2 py-1 h-fit" variant={activeSection === cat.id ? "default" : "white"} onClick={() => scrollToSection(cat?.id)}>{cat?.name[activeLanguage]}</Button>
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
                                                        <Card className="overflow-hidden flex p-0" key={item?.id}>
                                                            {item?.image_url ? (
                                                                <img src={item?.image_url} alt="imagePlat" className="w-2/5 object-cover" />
                                                            ) : null}
                                                            <div className="flex flex-col p-4 gap-1">
                                                                <div>
                                                                    <p className="text-sm font-medium text-slate-900">{item?.name[activeLanguage]}</p>
                                                                    {activeLanguage !== 'fr' ? <p className="text-xs font-light italic text-gray-400">{item?.name['fr']}</p> : null}
                                                                </div>
                                                                <p className="text-sm text-[#64748B]">{item?.description[activeLanguage]}</p>
                                                                <p className="text-sm text-[#64748B]">{item?.price} €</p>
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
                                                            <p className="text-sm font-bold">{labels?.discount[activeLanguage]}</p>
                                                            <p className="text-xs text-gray-500">{labels?.googleReview[activeLanguage]}</p>
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
                    </>
                ) : (
                    <div className="flex flex-col h-[calc(100vh_-_88px)] justify-center items-center text-base">
                        <p>Ce restaurant n'a pas encore configuré son menu</p>
                        <p>Vous êtes le propriétaire ? <span className="text-violet-500 hover:text-violet-600 underline cursor-pointer" onClick={() => pushWithLoading('/login')}>Je remplis mon menu dès maintenant !</span></p>
                    </div>
                )}

            </div>
            <div className="w-full bg-custom-gradient py-1 -space-x-1 flex items-center justify-center mt-5">
                <p className="text-white text-xs">Menu propulsé par</p>
                <Link href={`/`} legacyBehavior>
                    <a className="text-white no-underline hover:text-white hover:no-underline">
                        <img src="/assets/images/logo/logo_white.png" className="h-6 object-contain" />
                    </a>
                </Link>
            </div>
        </div >
    );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

    // Create authenticated Supabase Client
    const supabaseServerClient = createServerSupabaseClient<Database>(ctx);

    const { data: profile } = await supabaseServerClient
        .from("profile")
        .select("*")
        .eq("id", ctx?.query?.restaurantId)
        .single();

    const { data: category } = await supabaseServerClient
        .from("category")
        .select("*")
        .eq("profile_id", ctx?.query?.restaurantId)
        .order('order', { ascending: true });

    const { data: items } = await supabaseServerClient
        .from("items")
        .select("*")
        .eq("profile_id", ctx?.query?.restaurantId)
        .order("order", { ascending: true });


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