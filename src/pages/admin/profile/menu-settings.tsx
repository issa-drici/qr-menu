// @ts-ignore
"use client";

import Layout from "@/layout/layout";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";
import { GetServerSidePropsContext } from "next";
import { useLoadingContext } from "@/context/loading";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import dynamic from "next/dynamic";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
} from "@/components/ui/form";
import FieldCheckbox from "@/components/field-checkbox";
import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUserContext } from "@/context/user";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  name: z.string(),
  adress: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().optional(),
  logo_url: z.any().optional(),
  banner_url: z.any(),
  languages: z.array(z.string()),
  hide_name: z.boolean().optional(),
  width_logo: z.optional(z.number()),
});

function ProfileMenuSettingsComponent() {
  const { user } = useUserContext();
  const { pushWithLoading } = useLoadingContext()

  const supabaseClient = useSupabaseClient<Database>();

  const [profile, setProfile] = useState(null);
  const [logo, setLogo] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const [banner, setBanner] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(null);
  const [hideName, setHideName] = useState(false);
  const [sliderValue, setSliderValue] = useState(15);
  const [restaurantName, setRestaurantName] = useState(user?.name);
  const [languages, setLanguages] = useState(user?.languages);
  const [isLoadingGeneral, setIsloadingGeneral] = useState(false);


  async function getProfileInfo() {
    setIsloadingGeneral(true);
    const { data: profile } = await supabaseClient
      .from("profile")
      .select("*")
      .eq("id", user?.id)
      .single();
    setProfile(profile);

    setRestaurantName(profile?.name);
    setLanguages(profile?.languages);
    setHideName(profile?.hide_name);
    setSliderValue(profile?.width_logo);
    setIsloadingGeneral(false);
    setLogoUrl(
      profile?.logo_url ? `${profile?.logo_url}?v=${new Date()}` : null
    );
    setBannerUrl(
      profile?.banner_url ? `${profile?.banner_url}?v=${new Date()}` : null
    );
    setIsloadingGeneral(false);
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
    logo_url: profile?.logo_url ?? "",
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    const navigatorLanguage = window.navigator.language.split("-")[0];
    const isNativeLanguage = languages?.includes(navigatorLanguage);

    if (languages) {
      if (isNativeLanguage) {
        const tempLanguages = languages
          .filter((l) => l !== navigatorLanguage)
          .sort();
        tempLanguages.unshift(navigatorLanguage);

        // Comparaison des tableaux
        const areArraysDifferent =
          tempLanguages.length !== languages.length ||
          tempLanguages.some((val, index) => val !== languages[index]);

        if (areArraysDifferent) {
          setLanguages(tempLanguages);
        }
      }
    }
  }, [languages]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsloadingGeneral(true);
      const { data: dataUpdated, error } = await supabaseClient
        .from("profile")
        .update(data)
        .eq("id", user?.id)
        .select();


      toast({
        title: "Enregistrement réussi",
        description: "Les informations ont été mises à jour.",
        className: "bg-green-500 border-green-500 text-white",
      });
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description:
          "Un problème est survenu lors de la mise à jour des informations.",
        variant: "destructive",
      });
    }
    setIsloadingGeneral(false);
  }

  return (
    <Layout withAuth fullHeight>
      <div className="pb-3 flex items-center">
        <Breadcrumb >
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="cursor-pointer" onClick={() => pushWithLoading('/admin')}>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="cursor-pointer" onClick={() => pushWithLoading('/admin/profile')}>Mon Profil</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Paramètres du menu</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h1 className="text-xl font-semibold">Paramètres du menu</h1>
        <p className="text-xs mt-1 mb-4 text-slate-400">Modifier les réglages de votre menu comme les langues ou encore la bannière.</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 flex flex-col h-full"
        >

          <FieldCheckbox
            form={form}
            name="languages"
            label="Languages"
            onChange={(value) => setLanguages(value)}
            items={[
              {
                label: "Français",
                id: "fr",
              },
              {
                label: "Anglais",
                id: "en",
              },
              {
                label: "Espagnol",
                id: "es",
              },
              {
                label: "Arabe",
                id: "ar",
              },
              {
                label: "Allemand",
                id: "de",
              },
              {
                label: "Italien",
                id: "it",
              },
              {
                label: "Portugais",
                id: "pt",
              },
              {
                label: "Russe",
                id: "ru",
              },
            ]}
          />
        </form>
      </Form>
      <p>Langues</p>
      <p>Bannière</p>
      <p>Code postal</p>
      <p>Couleur du menu</p>
    </Layout>
  );
}

const ProfileMenuSettingsPage = dynamic(() => Promise.resolve(ProfileMenuSettingsComponent), {
  ssr: false,
});

export default ProfileMenuSettingsPage;


// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

//   // Create authenticated Supabase Client
//   const supabaseServerClient = createServerSupabaseClient<Database>(ctx);

//   // Check if we have a session
//   const {
//     data: { session },
//   } = await supabaseServerClient.auth.getSession();

//   if (!session) {
//     return {
//       props: {
//       },
//     }
//   }

//   return {
//     props: {
//       initialSession: session,
//       user: session.user,
//     },
//   };
// };