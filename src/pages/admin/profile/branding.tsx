import Layout from "@/layout/layout";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";
import { GetServerSidePropsContext } from "next";
import { useLoadingContext } from "@/context/loading";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, useFormState } from "react-hook-form";
import { useUserContext } from "@/context/user";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FieldInput from "@/components/field-input";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import Dropzone from "@/components/dropzone";

export default function ProfileBrandingPage({ }) {
  const { pushWithLoading, setIsLoadingApp } = useLoadingContext()
  const { user } = useUserContext()
  const supabaseClient = useSupabaseClient<Database>();

  const [logo, setLogo] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const [banner, setBanner] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(null);

  async function getFileWithPath(path: string) {
    const { data } = await supabaseClient.storage
      .from("images")
      .getPublicUrl(path);

    return data?.publicUrl;
  }


  const form = useForm();

  async function onSubmit() {
    try {
      setIsLoadingApp(true);

      if (logo) {
        if (user?.logo_path) {
          const { data: fileUpdated, error: fileError } =
            await supabaseClient.storage
              .from("images")
              .update(user?.logo_path, logo, {
                upsert: true,
              });

          const path = await getFileWithPath(fileUpdated?.path);

          const newData = {
            ...user,
            logo_url: path,
            logo_path: fileUpdated?.path
          }

          const { error } = await supabaseClient
            .from("profile")
            .update(newData)
            .eq("id", user?.id);
        } else {
          const { data: fileUpdated, error: fileError } =
            await supabaseClient.storage
              .from("images")
              .upload(`images_${Date.now()}.png`, logo);

          const path = await getFileWithPath(fileUpdated?.path);

          const newData = {
            ...user,
            logo_url: path,
            logo_path: fileUpdated?.path
          }

          const { error } = await supabaseClient
            .from("profile")
            .update(newData)
            .eq("id", user?.id);
        }
      }

      if (banner) {
        if (user?.banner_path) {
          const { data: fileUpdated, error: fileError } =
            await supabaseClient.storage
              .from("images")
              .update(user?.banner_path, banner, {
                upsert: true,
              });

          const path = await getFileWithPath(fileUpdated?.path);

          const newData = {
            ...user,
            banner_url: path,
            banner_path: fileUpdated?.path
          }

          const { error } = await supabaseClient
            .from("profile")
            .update(newData)
            .eq("id", user?.id);
        } else {
          const { data: fileUpdated, error: fileError } =
            await supabaseClient.storage
              .from("images")
              .upload(`images_${Date.now()}.png`, banner);

          const path = await getFileWithPath(fileUpdated?.path);

          const newData = {
            ...user,
            banner_url: path,
            banner_path: fileUpdated?.path
          }

          const { error } = await supabaseClient
            .from("profile")
            .update(newData)
            .eq("id", user?.id);
        }
      }


      // const { data: dataUpdated, error } = await supabaseClient
      //   .from("profile")
      //   .update(data)
      //   .eq("id", user?.id)
      //   .select()
      //   .single();

      // form?.reset(dataUpdated)

      toast({
        title: "Enregistrement réussi",
        description: "Les informations ont été mises à jour.",
        className: "bg-green-500 border-green-500 text-white",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          "Un problème est survenu lors de la mise à jour des informations.",
        variant: "destructive",
      });
    }
    setIsLoadingApp(false);
  }


  // Check if any field is dirty
  // const isFormModified = Object.keys(dirtyFields).length > 0;

  const onLogoChange = (event) => {
    console.log(event)
    if (event.target.files && event.target.files[0]) {
      setLogoUrl(URL.createObjectURL(event.target.files[0]));
      setLogo(event.target.files[0]);
    } else {
      setLogoUrl(null);
      setLogo(null)
    }
  };

  const onBannerChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setBannerUrl(URL.createObjectURL(event.target.files[0]));
      setBanner(event.target.files[0]);
    } else {
      setBannerUrl(null);
      setBanner(null)
    }
  };

  const displayPreviewLogo = () => {
    if (logo) {
      return logoUrl
    }

    if (!!!logo && logoUrl) {
      return `${logoUrl}?v=${new Date()}`
    }

    return null
  }

  const displayPreviewBanner = () => {
    if (banner) {
      return bannerUrl
    }

    if (!!!banner && bannerUrl) {
      return `${bannerUrl}?v=${new Date()}`
    }

    return null
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
              <BreadcrumbPage>Coordonnées</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h1 className="text-xl font-semibold">Coordonnées</h1>
        <p className="text-xs mt-1 mb-4 text-slate-400">Remplissez les informations essentielles de votre restaurant</p>
      </div>

      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          className="w-full gap-2 flex flex-col h-full"
        >
          <FormItem className="w-full mb-20">
            <FormControl>
              <FieldInput
                form={form}
                type="file"
                accept="image/*"
                name="logo"
                label={<Dropzone
                  fileSrc={displayPreviewLogo()}
                  className="w-full h-44 object-cover mt-1"
                  label="Votre logo"
                />
                }
                onChange={(e) => onLogoChange(e)}
              />
            </FormControl>
          </FormItem>
          {/* <FormItem className="w-full mb-20">
            <FormLabel>Télécharger une image</FormLabel>
            <FormControl>
              <FieldInput
                form={form}
                type="file"
                accept="image/*"
                name="banner"
                // label={<Dropzone
                //   fileSrc={displayPreviewBanner()}
                //   className="w-full h-44 object-cover mt-1"
                // />
                // }
                onChange={(e) => onBannerChange(e)}
              />
            </FormControl>
          </FormItem> */}
        </form>
      </Form>
          <div
            className="fixed left-0 bottom-0 w-full h-fit p-4 bg-white"
          >
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="text-white hover:text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-700 focus:bg-violet-700 w-full h-fit p-2 text-sm leading-6 font-medium"
              // disabled={!isFormModified}
            >
              Enregistrer
            </Button>
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

  if (!session) {
    return {
      props: {
      },
    }
  }

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};