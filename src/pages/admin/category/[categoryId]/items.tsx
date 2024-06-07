import Layout from "@/layout/layout";
import Category from "@/components/category";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { Ellipsis, Plus, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Pencil, XIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FieldInput from "@/components/field-input";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useLoadingContext } from "@/context/loading";
import Items from "@/components/items";

const FormSchema = z.object({
  name: z.string()
});

export default function CategoriesComponent({ category, items }) {
  const router = useRouter()
  const { pushWithLoading } = useLoadingContext()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [isOpenDialogMore, setIsOpenDialogMore] = useState(false);
  const [isOpenDialogNew, setIsOpenDialogNew] = useState(false);
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      // setIsloadingGeneral(true);
      // const { data: dataUpdated, error } = await supabaseClient
      //     .from("profile")
      //     .update(data)
      //     .eq("id", user?.id)
      //     .select();
      console.log('Success')

    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description:
          "Un problème est survenu lors de la mise à jour des informations.",
        variant: "destructive",
      });
    }
    // setIsloadingGeneral(false);
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
              <BreadcrumbLink className="cursor-pointer" onClick={() => pushWithLoading('/admin/categories')}>Catégories</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Éléments</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <h1 className="text-xl font-semibold">{category?.name?.fr}</h1>

        <p className="text-xs mt-1 mb-4 text-slate-400">Vous pouvez créer, modifier, réorganiser et supprimer les éléments
          de votre menu sur cette page.</p>
      </div>

      <Items isMoving={isMoving} setIsMoving={setIsMoving} items={items} setIsOpenDialogMore={setIsOpenDialogMore} />


      {!isMoving ? (
        <Button
          onClick={() => pushWithLoading(`/admin/category/${router?.query?.categoryId}/item/create`)}
          variant="ghost"
          size="icon"
          className="bg-violet-600 hover:bg-violet-700 active:bg-violet-600 focus:bg-violet-600 fixed bottom-4 right-4 w-fit h-fit p-3 rounded-full"
        >
          <Plus size={16} color="white" />
        </Button>
      ) : null}

      {isMoving ? (
        <div
          className="fixed bottom-4 w-full h-fit p-4"
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
          {/* <Button variant="ghost" className="justify-start"><Pencil className="mr-2 h-4 w-4" /> Renommer</Button>
          <Separator />  */}
          <Button variant="ghost" className="justify-start"
            onClick={() => {
              setIsOpenDialogMore(false)
              setIsMoving(true)
            }}
          ><RefreshCcw className="mr-2 h-4 w-4" /> Déplacer</Button>
          {/* <Separator />
           <Button variant="ghost" className="justify-start"
            onClick={() => {
              setIsOpenDialogDelete(isOpenDialogMore);
              setIsOpenDialogMore(false);
            }}
          ><XIcon className="mr-2 h-4 w-4" /> Supprimer</Button> */}
        </DialogContent>
      </Dialog>

      <Dialog open={!!isOpenDialogNew} onOpenChange={(isOp) => {
        if (isOp === true) return;
        setIsOpenDialogNew(false);
      }}>
        <DialogContent onOpenAutoFocus={false} withoutButtonClose className="max-w-[328px] rounded-lg" >

          <DialogTitle>Nouvelle catégorie</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6 flex flex-col h-full"
            >
              <FieldInput
                form={form}
                name="name"
                label="Nom"
                placeholder="Catégorie 01"
              />
            </form>
          </Form>
          <div className="flex flex-col justify-center items-center w-full gap-2">
            <Button type="submit" variant="default" className="w-full">Créer</Button>
            <Button variant="outline" className="w-full" onClick={() => setIsOpenDialogNew(false)}>Annuler</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!isOpenDialogDelete} onOpenChange={(isOp) => {
        if (isOp === true) return;
        setIsOpenDialogDelete(false);
      }}>
        <DialogContent onOpenAutoFocus={false} withoutButtonClose className="max-w-[328px] rounded-lg" >

          <DialogTitle>Supprimer</DialogTitle>
          <DialogDescription>Êtes-vous certain de vouloir supprimer “{isOpenDialogDelete?.name?.fr}” ?</DialogDescription>
          <div className="flex flex-col justify-center items-center w-full gap-2">
            <Button variant="destructive" className="w-full">Supprimer</Button>
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
    .eq("id", ctx?.params?.categoryId)
    .single();

  const { data: items } = await supabaseServerClient
    .from("items")
    .select("*")
    .eq("category_id", ctx?.params?.categoryId)
    .order("order", { ascending: true });

  if (!session) {
    return {
      props: {
        category: [],
        items: []
      },
    }
  }

  return {
    props: {
      category,
      items,
      initialSession: session,
      user: session.user,
    },
  };
};