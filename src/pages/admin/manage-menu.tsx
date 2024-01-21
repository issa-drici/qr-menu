import Layout from "@/layout/layout";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Category from "@/components/category";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";
import { GetServerSidePropsContext } from "next";
import Items from "@/components/items";
import { useRouter } from "next/router";


export default function ManageMenuComponent({ category, item }) {
  const router = useRouter()

  return (
    <Layout withAuth fullHeight>
      <Tabs defaultValue={router?.query?.active ? router?.query?.active : "category"} className="md:w-5/6">
        <TabsList className="grid w-full grid-cols-2 bg-gray-200">
          <TabsTrigger value="category" onClick={() => router.push('/admin/manage-menu?active=category')}>Catégorie</TabsTrigger>
          <TabsTrigger value="item" onClick={() => router.push('/admin/manage-menu?active=item')}>Éléments</TabsTrigger>
        </TabsList>

        <TabsContent value="category" >
          <Category category={category} />
        </TabsContent>

        <TabsContent value="item">
          <Items category={category} item={item} />
        </TabsContent>

      </Tabs>
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
    .eq("profile_id", session?.user?.id);

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