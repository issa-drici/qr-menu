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

const FormSchema = z.object({
  name: z.string(),
  adress: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
});

export default function ProfileDetailsPage({ }) {
  const { pushWithLoading, setIsLoadingApp } = useLoadingContext()
  const { user } = useUserContext()
  const supabaseClient = useSupabaseClient<Database>();


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: user?.name ?? null,
      adress: user?.adress ?? null,
      postal_code: user?.postal_code ?? null,
      country: user?.country ?? null,
      phone: user?.phone ?? null,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoadingApp(true);

      const newData = {
        ...user,
        name: data?.name,
        adress: data?.adress,
        postal_code: data?.postal_code,
        country: data?.country,
        phone: data?.phone,
      }
      const { data: dataUpdated, error } = await supabaseClient
        .from("profile")
        .update(data)
        .eq("id", user?.id)
        .select()
        .single();

      form?.reset(dataUpdated)

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

  const { control } = form

  const { dirtyFields } = useFormState({
    control,
  });

  // Check if any field is dirty
  const isFormModified = Object.keys(dirtyFields).length > 0;

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
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full gap-2 flex flex-col h-full"
        >
          <FieldInput
            form={form}
            name="name"
            label="Nom"
            placeholder="Nom du restaurant"
          />
          <FieldInput
            form={form}
            name="adress"
            label="Adresse"
            placeholder="Adresse"
          />
          <FieldInput
            form={form}
            name="postal_code"
            label="Code Postal"
            placeholder="Code postal"
          />
          <FieldInput
            form={form}
            name="country"
            label="Pays"
            placeholder="Pays"
          />
          <FieldInput
            form={form}
            name="phone"
            label="Numéro de téléphone"
            placeholder="06 XX XX XX XX"
          />
          <div
            className="fixed left-0 bottom-0 w-full h-fit p-4 bg-white"
          >
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="text-white hover:text-white bg-violet-600 hover:bg-violet-700 active:bg-violet-700 focus:bg-violet-700 w-full h-fit p-2 text-sm leading-6 font-medium"
              disabled={!isFormModified}
            >
              Enregistrer
            </Button>
          </div>
        </form>
      </Form>
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