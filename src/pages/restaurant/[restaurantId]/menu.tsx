import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { languagesDisplay } from "@/lib/languages";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

export default function Menu({ profile, category }) {
    const PreviewBanner = () => {
        let imageLink = "/assets/images/marketing_offer.png";

        if (profile?.banner_url) {
            imageLink = `${profile?.banner_url}?v=${new Date()}`
        }

        return (
            <img src={imageLink} alt="marketingOffer" className="w-full h-[30vh] object-cover" />
        );
    }

    const PreviewLogo = () => {
        let imageLink = "/assets/images/logo.png";

        if (profile?.logo_url) {
            imageLink = `${profile?.logo_url}?v=${new Date()}`
        }

        return (
            <img src={imageLink} alt="language" className="object-cover w-10" style={{ width: `${profile?.sliderValue}%` }} />
        );
    }

    useEffect(() => {
        const firstBar = document.querySelector('#titleBar'); // Remplacer par le sélecteur de votre première barre
        const secondBar = document.querySelector('#categoryBar'); // Remplacer par le sélecteur de votre deuxième barre

        if (firstBar && secondBar) {
            const height = firstBar.offsetHeight;
            secondBar.style.top = `${height}px`;
        }
    }, []);

    return (
        <div className="bg-white">
            <div className="text-xs">
                <div className="flex justify-between py-1 pl-2 pr-3 sticky top-0 z-50 bg-white" id="titleBar">
                    <div className="flex items-center gap-x-0.5">
                        <PreviewLogo />
                        {!profile?.hideName ? <p className="text-lg font-semibold">{profile?.name ? profile?.name : "Mon restaurant"}</p> : null}
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="flex items-center">
                                <p className="text-xs font-semibold">{languagesDisplay(profile?.languages ? profile?.languages[0] : "fr")?.label}</p>
                                <img src={languagesDisplay(profile?.languages ? profile?.languages[0] : "fr")?.imageUrl} className="w-5 ml-0.5" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit p-0">
                            <Command>
                                <CommandGroup>
                                    {profile?.languages?.map((language) => (
                                        <CommandItem
                                            key={language}
                                            value={language}
                                        >
                                            <p className="text-xs font-semibold">{language?.toUpperCase()}</p>
                                            <img src={languagesDisplay(language)?.imageUrl} className="w-5 ml-1" />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                {/* Image Marketing Restaurant */}
                <PreviewBanner />
                <div className="flex px-3 py-3 gap-x-1 sticky top-56 z-40 bg-white shadow-md mb-3" id="categoryBar">
                    {category?.map((cat) => (
                        <Button className="px-2 py-1 h-fit" variant="outline">{cat?.name}</Button>
                    ))}
                </div>
                <div className="flex flex-col px-3 gap-y-5">
                    <Card className="overflow-hidden p-0">
                        <img src="/assets/images/pates_saumon.png" alt="imagePlat" className="w-full h-[20vh] object-cover" />
                        <div className="px-5 pt-3 pb-5 space-y-2">
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold">Pâtes au saumon</p>
                                <p className=" text-lg font-semibold">13.00 €</p>
                            </div>
                            <p className="leading-3 text-gray-500">Des pâtes al dente avec saumon frais et sauce crème onctueuse, relevées de fines herbes.</p>
                        </div>
                    </Card>
                    <Card className="overflow-hidden p-0">
                        <img src="/assets/images/pates_saumon.png" alt="imagePlat" className="w-full h-[20vh] object-cover" />
                        <div className="px-2 pt-3 pb-5">
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold">Pâtes au saumon</p>
                                <p className="font-semibold">13.00 €</p>
                            </div>
                            <p className="leading-3 text-gray-500">Des pâtes al dente avec saumon frais et sauce crème onctueuse, relevées de fines herbes.</p>
                        </div>
                    </Card>
                    <Card className="overflow-hidden p-0">
                        <img src="/assets/images/pates_saumon.png" alt="imagePlat" className="w-full h-[20vh] object-cover" />
                        <div className="px-2 pt-3 pb-5">
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold">Pâtes au saumon</p>
                                <p className="font-semibold">13.00 €</p>
                            </div>
                            <p className="leading-3 text-gray-500">Des pâtes al dente avec saumon frais et sauce crème onctueuse, relevées de fines herbes.</p>
                        </div>
                    </Card>
                    <Card className="overflow-hidden p-0">
                        <img src="/assets/images/pates_saumon.png" alt="imagePlat" className="w-full h-[20vh] object-cover" />
                        <div className="px-2 pt-3 pb-5">
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold">Pâtes au saumon</p>
                                <p className="font-semibold">13.00 €</p>
                            </div>
                            <p className="leading-3 text-gray-500">Des pâtes al dente avec saumon frais et sauce crème onctueuse, relevées de fines herbes.</p>
                        </div>
                    </Card>
                    <Card className="overflow-hidden p-0">
                        <img src="/assets/images/pates_saumon.png" alt="imagePlat" className="w-full h-[20vh] object-cover" />
                        <div className="px-2 pt-3 pb-5">
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold">Pâtes au saumon</p>
                                <p className="font-semibold">13.00 €</p>
                            </div>
                            <p className="leading-3 text-gray-500">Des pâtes al dente avec saumon frais et sauce crème onctueuse, relevées de fines herbes.</p>
                        </div>
                    </Card>
                    <Card className="overflow-hidden p-0">
                        <img src="/assets/images/pates_saumon.png" alt="imagePlat" className="w-full h-[20vh] object-cover" />
                        <div className="px-2 pt-3 pb-5">
                            <div className="flex justify-between">
                                <p className="text-lg font-semibold">Pâtes au saumon</p>
                                <p className="font-semibold">13.00 €</p>
                            </div>
                            <p className="leading-3 text-gray-500">Des pâtes al dente avec saumon frais et sauce crème onctueuse, relevées de fines herbes.</p>
                        </div>
                    </Card>
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
        .eq("profile_id", ctx?.query?.restaurantId);

    return {
        props: {
            profile,
            category
        },
    };
};
