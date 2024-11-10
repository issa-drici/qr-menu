"use client";

import Layout from "@/layout/layout";
import Category from "@/components/category";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { Pencil, Plus, RefreshCcw, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useLoadingContext } from "@/context/loading";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import DialogAddCategory from "@/components/dialog/dialog-add-category";
import DialogEditCategory from "@/components/dialog/dialog-edit-category";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir minimum 2 caractères.",
  })
});

export default function CategoriesComponent({ user, category }) {
  const router = useRouter()
  const { pushWithLoading, setIsLoadingApp } = useLoadingContext()

  const supabaseClient = useSupabaseClient<Database>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [categories, setCategories] = useState(category);
  const [isOpenDialogMore, setIsOpenDialogMore] = useState(false);
  const [isOpenDialogNew, setIsOpenDialogNew] = useState(false);
  const [isOpenDialogEdit, setIsOpenDialogEdit] = useState(false);
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  async function onDelete(cat) {
    try {
      setIsLoadingApp(true);
      const response = await supabaseClient
        .from("category")
        .delete()
        .eq("id", cat?.id);
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          "Un problème est survenu lors de la suppression.",
        variant: "destructive",
      });
    }
    setIsOpenDialogDelete(false)
    pushWithLoading(`/admin/categories`)
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
              <BreadcrumbPage>Catégories</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
     
      <Category isMoving={isMoving} setIsMoving={setIsMoving} category={categories} setIsOpenDialogMore={setIsOpenDialogMore} setIsOpenDialogNew={setIsOpenDialogNew} />

      {!isMoving ? (
        <Button
          onClick={() => setIsOpenDialogNew(true)}
          variant="ghost"
          size="icon"
          className="bg-violet-600 hover:bg-violet-700 active:bg-violet-600 focus:bg-violet-600 fixed bottom-4 right-4 w-fit h-fit p-3 rounded-full"
        >
          <Plus size={16} color="white" />
        </Button>
      ) : null}

      {isMoving ? (
        <div
          className="fixed left-0 bottom-0 w-full h-fit p-4 bg-white"
        >
          <Button
            onClick={() => setIsMoving(false)}
            variant="ghost"
            size="icon"
            className="text-white hover:text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-700 focus:bg-violet-700 w-full h-fit p-2 text-sm leading-6 font-medium"
          >
            OK
          </Button>
        </div>
      ) : null}


      <Dialog open={!!isOpenDialogMore} onOpenChange={(isOp) => {
        if (isOp === true) return;
        setIsOpenDialogMore(false);
      }}>
        <DialogContent withoutButtonClose className="max-w-[328px] rounded-lg" >

          <DialogTitle>Modifier</DialogTitle>
          <DialogDescription>Modifier “{isOpenDialogMore?.name?.fr}”</DialogDescription>
          <Separator className="m-0" />
          <Button variant="ghost" className="justify-start"
            onClick={() => {
              setIsOpenDialogEdit(isOpenDialogMore);
              setIsOpenDialogMore(false);
            }}
          ><Pencil className="mr-2 h-4 w-4" /> Renommer</Button>
          <Separator />
          <Button variant="ghost" className="justify-start"
            onClick={() => {
              setIsOpenDialogMore(false)
              setIsMoving(true)
            }}
          ><RefreshCcw className="mr-2 h-4 w-4" /> Changer l'ordre</Button>
          <Separator />
          <Button variant="ghost" className="justify-start"
            onClick={() => {
              setIsOpenDialogDelete(isOpenDialogMore);
              setIsOpenDialogMore(false);
            }}
          ><XIcon className="mr-2 h-4 w-4" /> Supprimer</Button>
        </DialogContent>
      </Dialog>

      <DialogAddCategory user={user} isOpen={isOpenDialogNew} setIsOpen={setIsOpenDialogNew} nbCategories={categories?.length} handleNewCategory={(cat) => setCategories((prevCategories) => [...prevCategories, cat])} />
      <DialogEditCategory
        user={user}
        category={isOpenDialogEdit}
        isOpen={isOpenDialogEdit}
        setIsOpen={setIsOpenDialogEdit}
        nbCategories={categories?.length}
        handleEditedCategory={(editedIt) => setCategories((prevItems) =>
          prevItems.map((it) =>
            it.id === editedIt.id ? { ...it, ...editedIt } : it
          ))} />

      <Dialog open={!!isOpenDialogDelete} onOpenChange={(isOp) => {
        if (isOp === true) return;
        setIsOpenDialogDelete(false);
      }}>
        <DialogContent withoutButtonClose className="max-w-[328px] rounded-lg" >

          <DialogTitle>Supprimer</DialogTitle>
          <DialogDescription>Êtes-vous certain de vouloir supprimer “{isOpenDialogDelete?.name?.fr}” ?</DialogDescription>
          <div className="flex flex-col justify-center items-center w-full gap-2">
            <Button variant="destructive" className="w-full" onClick={() => onDelete(isOpenDialogDelete)}>Supprimer</Button>
            <Button variant="outline" className="w-full" onClick={() => setIsOpenDialogDelete(false)}>Annuler</Button>
          </div>
        </DialogContent>
      </Dialog>


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

  const { data: category } = await supabaseServerClient
    .from("category")
    .select("*")
    .eq("profile_id", session?.user?.id)
    .order('order', { ascending: true });

  const { data: item } = await supabaseServerClient
    .from("items")
    .select("*")
    .eq("profile_id", session?.user?.id);

  if (!session) {
    return {
      props: {
        category: [],
        item: []
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