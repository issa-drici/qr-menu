import Layout from "@/layout/layout";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";
import { GetServerSidePropsContext } from "next";
import { useLoadingContext } from "@/context/loading";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ButtonCard from "@/components/button-card";

export default function ProfilePage() {
  const { pushWithLoading } = useLoadingContext()

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
              <BreadcrumbPage>Mon Profil</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-semibold">Éditez votre profil</h1>
        <div className="flex flex-col gap-3">
          <ButtonCard title="Coordonnées" onClick={() => pushWithLoading('/admin/profile/details')} />
          <ButtonCard title="Identité Visuelle (Logo, etc.)" onClick={() => pushWithLoading('/admin/profile/branding')} />
          {/* <ButtonCard title="Paramètres du menu" onClick={() => pushWithLoading('/admin/profile/menu-settings')} /> */}
          {/* <ButtonCard title="Langues" onClick={() => pushWithLoading('/admin/profile')} /> */}
          {/* <ButtonCard title="Liens" onClick={() => pushWithLoading('/admin/profile')} /> */}
          {/* <ButtonCard title="Site web" onClick={() => pushWithLoading('/admin/profile/website-settings')} /> */}
          {/* <ButtonCard title="Description" onClick={() => pushWithLoading('/admin/profile')} /> */}
          {/* <ButtonCard title="Horaires" onClick={() => pushWithLoading('/admin/profile')} /> */}
        </div>
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