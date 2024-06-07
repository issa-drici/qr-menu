import Layout from "@/layout/layout";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";
import { GetServerSidePropsContext } from "next";
import { useLoadingContext } from "@/context/loading";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ButtonCard from "@/components/button-card";

export default function ProfileBrandingPage() {
  const { pushWithLoading } = useLoadingContext()

  return (
    <Layout withAuth fullHeight>
      <div className="pb-3 flex items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>Mon Profil</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <p>Logo</p>
      <p>Bannière</p>
      <p>Code postal</p>
      <p>Couleur du menu</p>
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