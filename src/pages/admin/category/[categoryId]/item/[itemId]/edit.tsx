// @ts-ignore
"use client";

import { Button } from "@/components/ui/button";
import {
  Card
} from "@/components/ui/card";

import { useForm, useFormState } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/context/user";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/types/database.types";
import { useRouter } from "next/router";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Layout from "@/layout/layout";
import { useLoadingContext } from "@/context/loading";
import FieldInput from "@/components/field-input";
import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Dropzone from "@/components/dropzone";

export default function EditItem({ category, item }) {
  const router = useRouter()
  const { pushWithLoading, setIsLoadingApp } = useLoadingContext()


  const [isClear, setIsClear] = useState(true);

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);

  const { user } = useUserContext();

  const supabaseClient = useSupabaseClient<Database>();

  async function getFileWithPath(path: string) {
    const { data } = await supabaseClient.storage
      .from("images")
      .getPublicUrl(path);

    return data?.publicUrl;
  }

  const form = useForm();


  async function translate(item) {
    let newItem = { ...item };



    if (true) {
      newItem.name = {
        fr: name,
        en: "",
        es: "",
        ar: "",
        de: "",
        it: "",
        pt: "",
        ru: "",
      };

      newItem.description = {
        fr: description,
        en: "",
        es: "",
        ar: "",
        de: "",
        it: "",
        pt: "",
        ru: "",
      };

      return newItem;
    }


    if (newItem?.need_name_translation) {
      const resultName = await fetch('/api/gpt-prompt', {
        method: 'POST',
        body: JSON.stringify({ prompt: JSON.stringify({ fr: name }) }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const jsonName = await resultName.json();
      newItem.name = JSON.parse(jsonName.response);
    }


    if (newItem?.need_description_translation) {
      const resultDescription = await fetch('/api/gpt-prompt', {
        method: 'POST',
        body: JSON.stringify({ prompt: JSON.stringify({ fr: description }) }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const jsonDescription = await resultDescription.json();
      newItem.description = JSON.parse(jsonDescription.response);
    }

    return newItem;
  }

  async function onSubmit() {
    try {
      setIsLoadingApp(true);
      let newItem = { ...item, price };
      console.log({newItem})

      if (newItem && newItem.name) {
        if (item?.name?.fr !== name) {
          newItem.name = name;
          newItem.need_name_translation = true;
        }
      }

      if (newItem && newItem.description) {
        if (item?.description?.fr !== description) {
          newItem.description = description;
          newItem.need_description_translation = true;
        }
      }


      let translatedItem = await translate(newItem);

      if (translatedItem.hasOwnProperty("need_name_translation")) {
        delete translatedItem.need_name_translation;
      }
      if (translatedItem.hasOwnProperty("need_description_translation")) {
        delete translatedItem.need_description_translation;
      }

      // Update database
      const { data: dataUpdated, error } = await supabaseClient
        .from("items")
        .update(translatedItem)
        .eq('id', item?.id)
        .select();

      if (error) {
        throw error;
      }


      toast({
        title: "Modification réussie",
        description: "Les informations ont été mises à jour.",
        className: "bg-green-500 border-green-500 text-white",
      });
      setIsLoadingApp(false);

      pushWithLoading(`/admin/category/${router?.query?.categoryId}/items`)

    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de la mise à jour des informations.",
        variant: "destructive",
      });
    }
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageUrl(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      setImageUrl(null);
      setImage(null)
    }
  };

  const displayPreviewImage = () => {
    if (image) {
      return imageUrl
    }

    if (!!!image && imageUrl) {
      return `${imageUrl}?v=${new Date()}`
    }

    return null
  }

  useEffect(() => {
    if (item?.id) {
      setName(item?.name?.fr)
      setDescription(item?.description?.fr)
      setPrice(item?.price)
      setImageUrl(item?.image_url)
    }
  }, [])

  return (
    <Layout withAuth fullHeight>
      <div className="pb-3 flex items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="cursor-pointer" onClick={() => pushWithLoading('/admin')}>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="cursor-pointer" onClick={() => pushWithLoading(`/admin/category/${router?.query?.categoryId}/items`)}>Éléments</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Modification</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h1 className="text-xl font-semibold">{category?.name?.fr}</h1>
        <p className="text-xs mt-1 mb-4 text-slate-400">Vous pouvez compléter les informations du nouvel élément.</p>
      </div>

      <Card className="overflow-hidden flex p-0 mb-5">
        {imageUrl ? (
          <img src={imageUrl} alt="imagePlat" className="w-2/5 object-cover" />
        ) : null}
        <div className="flex flex-1 items-end p-4">
          <div className="flex flex-col flex-1 gap-1">
            <div>
              <p className="text-sm font-medium text-slate-900">{(!name || name === "") ? "Nom de l'élément" : name}</p>
            </div>
            <p className="text-sm text-[#64748B]">{(!description || description === "") ? "Description de l'élément" : description}</p>
            <p className="text-sm text-[#64748B]">{price ?? "0.00"} €</p>
          </div>
        </div>
      </Card>

      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          className="w-full gap-2 flex flex-col h-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl
                  onChange={(e) => {
                    setName(e?.target?.value)
                  }
                  }
                >
                  <Input
                    value={name?.fr}
                    defaultValue={item?.name?.fr}
                    placeholder="Nom de votre élément"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* <FormItem className="w-full">
            <FormLabel>Nom</FormLabel>
            <FormControl
              onChange={(e) => {
                setName(e?.target?.value)
              }
              }
            >
              <Input
                value={name?.fr}
                defaultValue={item?.name?.fr}
                placeholder="Nom de votre élément"
              />
            </FormControl>
          </FormItem> */}
          <FormItem className="w-full">
            <FormLabel>Description</FormLabel>
            <FormControl
              onChange={(e) =>
                setDescription(e?.target?.value)
              }
            >
              <Textarea
                value={description?.fr}
                defaultValue={item?.description?.fr}
                placeholder="Description de votre élément"
              />
            </FormControl>
          </FormItem>
          <FormItem className="w-full">
            <FormLabel>Prix</FormLabel>
            <FormControl
              onChange={(e) => {
                let value = e.target.value.replace(/[^0-9]/g, ''); // Supprimer tout ce qui n'est pas un chiffre

                if (value === "") {
                  setPrice("");
                  return;
                }

                let integerPart = "";
                let decimalPart = "";

                if (value.length === 1) {
                  integerPart = "0";
                  decimalPart = "0" + value;
                } else if (value.length === 2) {
                  integerPart = "0";
                  decimalPart = value;
                } else {
                  integerPart = value.slice(0, -2).replace(/^0+/, '');
                  decimalPart = value.slice(-2);
                }

                if (integerPart === "") {
                  integerPart = "0";
                }

                const result = `${integerPart}.${decimalPart}`;
                setPrice(result);
              }
              }
            >
              <Input
                value={price}
                defaultValue={item?.price}
                type="number"
                placeholder="0.00€"
                step="0.01"
                inputMode="numeric"
                pattern="[0-9]*"
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
                name="image"
                label={<Dropzone
                  fileSrc={displayPreviewImage()}
                  className="w-full h-44 object-cover mt-1"
                />
                }
                onChange={(e) => onImageChange(e)}
              />
            </FormControl>
          </FormItem> */}

        </form>
      </Form>
      <div
        className="fixed left-0 bottom-0 w-full h-fit p-4 bg-white"
      >
        <Button
          onClick={() => onSubmit()}
          variant="ghost"
          size="icon"
          className="text-white hover:text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-700 focus:bg-violet-700 w-full h-fit p-2 text-sm leading-6 font-medium"
          disabled={!((item?.name?.fr !== name) || (item?.description?.fr !== description) || (item?.price !== price))}
        >
          Modifier
        </Button>
      </div>
    </Layout >
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

  // Create authenticated Supabase Client
  const supabaseServerClient = createServerSupabaseClient<Database>(ctx);

  // Check if we have a session
  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  const { data: category } = await supabaseServerClient
    .from("category")
    .select("*")
    .eq("id", ctx?.query?.categoryId)
    .single();

  const { data: item } = await supabaseServerClient
    .from("items")
    .select("*")
    .eq("id", ctx?.query?.itemId)
    .single();


  if (!session) {
    return {
      props: {
        category: {},
        item: {}
      },
    }
  }

  return {
    props: {
      category,
      item,
      initialSession: session,
      user: session.user,
    },
  };
};