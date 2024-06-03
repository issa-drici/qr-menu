"use client;"

import Layout from "@/layout/layout";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { ChefHat, Plus, QrCode, Send, User } from "lucide-react";
import Link from "next/link";
import { useLoadingContext } from "@/context/loading";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "@/components/ui/use-toast";

export default function CategoriesComponent({ profile }) {
  const router = useRouter()

  const [isOpenTooltipCopy, setIsOpenTooltipCopy] = useState(false)
  const [currentStepOnboarding, setCurrentStepOnboarding] = useState(profile?.is_onboarded ? 0 : 1)

  const supabaseClient = useSupabaseClient<Database>();

  const { pushWithLoading, setIsLoadingApp } = useLoadingContext()

  const PreviewBanner = () => {
    let imageLink = "/assets/images/preview_website.png";

    if (profile?.banner_url) {
      imageLink = profile?.banner_url
    }


    return (
      <div style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 76%), url(${imageLink})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '215px',
      }} className="text-white p-8 flex justify-between items-end">
        <div>
          <p className="text-xl font-semibold">✌️</p>
          <p className="text-xl font-semibold">Hello {profile?.name}</p>
          <p className="text-sm">Bienvenue sur Eatsup</p>
        </div>
        {profile?.logo_url ? (
          <img
            src={profile?.logo_url}
            alt="language"
            className="object-cover w-11 rounded-full"
          />
        ) : null}
      </div>
    );
  }

  async function onSubmitOnboarded() {
    try {
      setIsLoadingApp(true)

      const { data } = await supabaseClient
        .from("profile")
        .update({
          ...profile,
          is_onboarded: true,
        })
        .eq("id", profile?.id)
        .select()
        .single();

      if (data?.is_onboarded) {
        pushWithLoading('/admin/categories')
      }

    } catch (error) {
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de l'inscription.",
        variant: "destructive",
      });
    }
  }

  return (
    <Layout className='flex-col p-0 justify-start' withAuth fullHeight>
      <div className={cn(currentStepOnboarding > 0 ? "absolute left-0 right-0 top-0 bottom-0 bg-black opacity-80 z-10" : "hidden")}></div>
      <PreviewBanner />
      <div className="grid grid-cols-2 grid-rows-2 w-full h-fit gap-3 p-5">


        {/* BUTTON PROFIL */}
        <Popover open={currentStepOnboarding === 1} >
          <PopoverTrigger className={cn(currentStepOnboarding === 1 ? 'z-20' : null)} asChild>
            <div className="h-fit bg-violet-100 rounded-md p-3 flex flex-col gap-3 cursor-pointer">
              <User size={16} className="text-slate-900" />
              <div className="flex flex-col">
                <p className="text-sm text-slate-900 font-semibold">Profil</p>
                <p className="text-xs font-medium text-slate-600 leading-5">Restaurant</p>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent side="top" className="ml-5">
            <p className="text-lg font-semibold">Gérez votre profil restaurant</p>
            <p className="text-sm text-slate-500">Personnalisez votre profil restaurateur</p>
            <p className="text-violet-600 text-sm font-medium text-right cursor-pointer" onClick={() => setCurrentStepOnboarding((prev) => prev + 1)}>Suivant ></p>
          </PopoverContent>
        </Popover>






        {/* BUTTON MENU */}
        <Popover open={currentStepOnboarding === 2} >
          <PopoverTrigger className={cn(currentStepOnboarding === 2 ? 'z-20' : null)} asChild>
            <div className="h-fit bg-violet-100 rounded-md p-3 flex flex-col gap-3 cursor-pointer" onClick={() => {
              if (currentStepOnboarding !== 2) {
                pushWithLoading('/admin/categories')
              }
            }}>
              <ChefHat size={16} className="text-slate-900" />
              <div className="flex flex-col">
                <p className="text-sm text-slate-900 font-semibold">Menu</p>
                <p className="text-xs font-medium text-slate-600 leading-5">Catégories</p>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent side="top" className="mr-5">
            <p className="text-lg font-semibold">Personnalisation des menus</p>
            <p className="text-sm text-slate-500">Vous pouvez créer, modifier, réorganiser et supprimer les sections de votre menu sur cette page</p>
            <p className="text-violet-600 text-sm font-medium text-right cursor-pointer" onClick={() => setCurrentStepOnboarding((prev) => prev + 1)}>Suivant ></p>
          </PopoverContent>
        </Popover>





        {/* BUTTON QRCODE */}
        <Popover open={currentStepOnboarding === 3} >
          <PopoverTrigger className={cn(currentStepOnboarding === 3 ? 'z-20' : null)} asChild>
            <div className="h-fit bg-violet-100 rounded-md p-3 flex flex-col gap-3 cursor-pointer" onClick={() => {
              if (currentStepOnboarding !== 3) {
                // pushWithLoading('/admin/categories')
              }
            }}>
              <QrCode size={16} className="text-slate-900" />
              <div className="flex flex-col">

                <p className="text-sm text-slate-900 font-semibold">QR Code</p>
                <p className="text-xs font-medium text-slate-600 leading-5">Télécharger</p>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent side="top" className="ml-5">
            <p className="text-lg font-semibold">Télécharger vos QR code</p>
            <p className="text-sm text-slate-500">Créez et conservez vos qrcode de manière simple et sécurisé </p>
            <p className="text-violet-600 text-sm font-medium text-right cursor-pointer" onClick={() => setCurrentStepOnboarding((prev) => prev + 1)}>Suivant ></p>
          </PopoverContent>
        </Popover>




        {/* BUTTON LINK */}
        {currentStepOnboarding === 4 ? (
          <Popover open={currentStepOnboarding === 4} >
            <PopoverTrigger className={cn(currentStepOnboarding === 4 ? 'z-20' : null)} asChild>
              <div className="h-fit bg-violet-100 rounded-md p-3 flex flex-col gap-3 cursor-pointer text-left">
                <Send size={16} className="text-slate-900" />
                <div className="flex flex-col">
                  <p className="text-sm text-slate-900 font-semibold">Partager</p>
                  <p className="text-xs font-medium text-slate-600 leading-5">Copier le lien</p>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent side="top" className="mr-5">
              <p className="text-lg font-semibold">Copier le lien vers votre menu</p>
              <p className="text-sm text-slate-500">Cliquez sur ce bouton pour copier le lien vers votre menu</p>
              <p className="text-violet-600 text-sm font-medium text-right cursor-pointer" onClick={() => {
                onSubmitOnboarded()
              }}>Commencer ></p>
            </PopoverContent>
          </Popover>
        ) : (
          <TooltipProvider>
            <Tooltip open={isOpenTooltipCopy}>
              <TooltipTrigger asChild >
                <div className="h-fit bg-violet-100 rounded-md p-3 flex flex-col gap-3 cursor-pointer text-left"
                  onClick={() => {
                    if (currentStepOnboarding !== 4) {
                      setIsOpenTooltipCopy(true)
                      navigator.clipboard.writeText(`https://www.eatsup.fr/restaurant/${profile?.id}/menu`)
                      setTimeout(() => {
                        setIsOpenTooltipCopy(false)
                      }, 2000);
                    }
                  }}>

                  <Send size={16} className="text-slate-900" />
                  <div className="flex flex-col">
                    <p className="text-sm text-slate-900 font-semibold">Partager</p>
                    <p className="text-xs font-medium text-slate-600 leading-5">Copier le lien</p>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Lien copié ✨</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}






      </div>

    </Layout>
  );
}


export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

  // Create authenticated Supabase Client
  const supabaseServerClient = createServerSupabaseClient<Database>(ctx);

  // Check if we have a session
  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  const { data: profile } = await supabaseServerClient
    .from("profile")
    .select("*")
    .eq("id", session?.user?.id)
    .single();

  if (!session) {
    return {
      props: {
        profile: {}
      },
    }
  }

  return {
    props: {
      profile,
      initialSession: session,
      user: session.user,
    },
  };
};