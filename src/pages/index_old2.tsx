import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="mt-20 bg-white">
      <div className="flex">
        <div className="flex-1">
          <h1 className="text-4xl font-bold">Augmentez vos ventes en  <span className="bg-custom-gradient bg-clip-text text-transparent">un seul scan</span></h1>
          <p>Avec Eatsup : gagnez du temps en salle, offrez un accès continu au menu pour stimuler les ventes, et partagez l'excellence de votre établissement.</p>
          <p>Propulsez vos avis Google et distinguez-vous dans le marché le plus compétitif.</p>
          <div className="flex items-center gap-3">
            <Button>Essai gratuit</Button>
            <p>Aucune carte nécessaire - Sans engagement</p>
          </div>
        </div>
        <div className="bg-black w-40 h-40 flex-1"></div>
      </div>
    </div>
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
      props: {},
    };
  }

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
