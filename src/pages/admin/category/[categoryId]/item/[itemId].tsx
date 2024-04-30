import Layout from "@/layout/layout";
import Category from "@/components/category";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";
import { GetServerSidePropsContext } from "next";
import Items from "@/components/items";
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

const FormSchema = z.object({
  name: z.string()
});

export default function CategoriesComponent({ category, items }) {
  const router = useRouter()
  const { pushWithLoading, setIsLoadingApp } = useLoadingContext()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [isOpenModalMore, setIsOpenModalMore] = useState(false);
  const [isOpenModalNew, setIsOpenModalNew] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
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



      {items?.length === 0 ? <img src="/assets/images/background-menu.png" className="w-full object-contain mb-2" /> :
        (<div className="flex flex-col gap-3 mb-14">
          {items?.map((item) => {
            return (
              <Card className="overflow-hidden flex p-0" key={item?.id}>
                {item?.image_url ? (
                  <img src={item?.image_url} alt="imagePlat" className="w-2/5 object-cover" />
                ) : null}
                <div className="flex flex-1 items-end p-4">
                  <div className="flex flex-col flex-1 gap-1">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item?.name?.fr}</p>
                      <p className="text-xs font-light italic text-gray-400">{item?.name?.fr}</p>
                    </div>
                    <p className="text-sm text-[#64748B]">{item?.description?.fr.slice(0, item?.image_url ? 30 : 75) + '...'}</p>
                    <p className="text-sm text-[#64748B]">{item?.price} €</p>
                  </div>
                  {!false ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // setIsOpenModalMore(category);
                      }}
                      className="text-slate-400 hover:bg-transparent ml-2 w-fit h-fit"
                    >
                      <Ellipsis size={16} />
                    </Button>
                  ) : null}
                </div>

              </Card>
            )
          })}
        </div>)
      }
<p>Nom de l'élément Description de l'élément, nom prix description</p>
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
    .eq("category_id", ctx?.params?.categoryId);

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