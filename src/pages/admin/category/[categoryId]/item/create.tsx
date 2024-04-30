// @ts-ignore
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TrashIcon } from "@radix-ui/react-icons";
import { useUserContext } from "@/context/user";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/types/database.types";
import { Skeleton } from "@/components/ui/skeleton";
import { v4 } from "uuid";
import { useRouter } from "next/router";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Layout from "@/layout/layout";
import { useLoadingContext } from "@/context/loading";
import { Ellipsis } from "lucide-react";
import FieldInput from "@/components/field-input";
import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Dropzone from "@/components/dropzone";

export default function CreateItem({ category, nbItems }) {
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
    let newItem = item;

    const resultName = await fetch('/api/gpt-prompt', {
      method: 'POST',
      body: JSON.stringify({ prompt: JSON.stringify({ fr: name }) }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const jsonName = await resultName.json();
    newItem.name = JSON.parse(jsonName.response);


    const resultDescription = await fetch('/api/gpt-prompt', {
      method: 'POST',
      body: JSON.stringify({ prompt: JSON.stringify({ fr: description }) }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const jsonDescription = await resultDescription.json();
    newItem.description = JSON.parse(jsonDescription.response);

    return newItem;
  }

  async function onSubmit() {
    try {
      setIsLoadingApp(true);

      let item = {
        profile_id: user?.id,
        category_id: router?.query?.categoryId,
        price,
        order: `${nbItems + 1}`,
      }

      let newItem = await translate(item);

      if (image) {
        const fileName = `images_${Date.now()}.png`;
        const { data: fileUpdated, error: fileError } = await supabaseClient.storage
          .from("images")
          .upload(fileName, image, {
            upsert: false,
          });

        if (fileError) {
          throw fileError;
        }

        const path = await getFileWithPath(fileUpdated?.path);
        newItem = { ...newItem, image_url: path, image_path: fileUpdated?.path };
      }

      // Update database
      const { data: dataUpdated, error } = await supabaseClient
        .from("items")
        .insert(newItem)
        .select();

      if (error) {
        throw error;
      }


      toast({
        title: "Enregistrement réussi",
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

  // const handleAddItem = () => {
  //   const newItems = [...items];
  //   newItems.push({
  //     id: v4(),
  //     profile_id: user?.id,
  //     category_id: activeCategory,
  //     order: `${items.length + 1}`,
  //     name: { fr: "Nouvel élément" },
  //     description: { fr: "Description de l'élément" },
  //     price: 0.0,
  //     created_at: new Date(),
  //   });

  //   setItems(newItems);

  //   setTimeout(() => {
  //     inputRef.current?.focus();
  //   }, 0);
  // };


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
              <BreadcrumbPage>Création</BreadcrumbPage>
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
          <FormItem className="w-full">
            <FormLabel>Nom</FormLabel>
            <FormControl
              onChange={(e) => {
                setName(e?.target?.value)
              }
              }
            >
              <Input
                value={name?.fr}
                placeholder="Nom de votre élément"
              />
            </FormControl>
          </FormItem>
          <FormItem className="w-full">
            <FormLabel>Description</FormLabel>
            <FormControl
              onChange={(e) =>
                setDescription(e?.target?.value)
              }
            >
              <Textarea
                value={description?.fr}
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
                type="number"
                placeholder="0.00€"
                step="0.01"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </FormControl>
          </FormItem>
          <FormItem className="w-full mb-20">
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
          </FormItem>

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
        >
          Enregistrer
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

  const { count: nbItems } = await supabaseServerClient
    .from("items")
    .select("*", { count: "exact", head: true })
    .eq("category_id", ctx?.query?.categoryId)

  if (!session) {
    return {
      props: {
        category: {},
        nbItems: 0
      },
    }
  }

  return {
    props: {
      category,
      nbItems,
      initialSession: session,
      user: session.user,
    },
  };
};