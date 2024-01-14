'use client'

import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const labels = {
    share: {
        fr: "Partager",
        en: "Share"
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

    return (
        <div className="bg-slate-100 min-h-screen leading-5 tracking-tight">
            <div className="relative flex flex-col justify-center items-center w-full h-52 bg-custom-gradient text-white mb-10">
                <img src={profile?.logo_url} alt="logo" className="object-cover h-16" />
                <p className="mt-3 font-bold text-2xl">{profile?.name}</p>
                <p className="text-xs font-semibold tracking-normal">{profile?.type_restaurant}</p>
                <div className="absolute left-5 right-5 bottom-0 transform translate-y-1/2 flex space-x-3">
                    <a href="tel:+33140373912" className="w-full">
                        <Button className="shadow shadow-black w-full">+33 1 40 37 39 12</Button>
                    </a>
                    <a href={`/restaurant/${profile?.id}/menu`} target="_blank" className="w-full">
                        <Button className="shadow shadow-black w-full" variant="secondary">Voir le menu</Button>
                    </a>
                </div>
            </div>
            <div className="flex flex-col space-y-3">
                <Card className="mx-3">
                    <CardContent className="pt-6">
                        <p>{profile?.description?.fr}</p>
                    </CardContent>
                </Card>
                <img src={profile?.banner_url} alt="marketingOffer" className="w-full h-[30vh] object-cover" />

                <Card className="mx-3">
                    <CardHeader>
                        <CardTitle>Se rendre à {profile?.name}</CardTitle>
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
                        <CardTitle>Horaires</CardTitle>
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