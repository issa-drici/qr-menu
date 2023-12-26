import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative bg-white w-full h-full min-h-screen tracking-tighter max-w-screen overflow-x-hidden">
      <div className="absolute bg-circle-gradient w-1.5screen h-[110vh] md:h-1.5screen -translate-x-[27vw] -translate-y-1/4"></div>
      <div className="absolute flex flex-col w-full h-full mt-20 md:mt-32 items-center">
        <div className="bg-custom-gradient rounded-md px-2 md:rounded-lg md:px-3 py-0.5">
          <p className="text-white font-bold text-xs md:text-base">
		  ✨ Traductions par Intelligence Artificielle 🤖
          </p>
        </div>
        <h2 className="text-2xl md:text-6xl font-black max-w-3xl text-center mt-3">
          Augmentez vos ventes
        </h2>
        <h2 className="text-2xl md:text-6xl -mt-2 md:mt-0 font-black max-w-3xl text-center bg-custom-gradient bg-clip-text text-transparent">
          un seul scan
        </h2>
        <p className="text-slate-500 container md:max-w-2xl text-center font-semibold mt-1 md:mt-3 text-xs md:text-base">
          Avec Eatsup : gagnez du temps en salle, offrez un accès continu au
          menu pour stimuler les ventes, et partagez l'excellence de votre
          établissement.
        </p>
        <p className="text-slate-500 container md:max-w-2xl text-center font-semibold mt-1 text-xs md:text-base">
          Propulsez vos avis Google et distinguez-vous dans le marché le plus
          compétitif.
        </p>
        <Link href={`/register`} legacyBehavior>
          <a className="text-white p-2 md:p-3 rounded-lg md:rounded-xl text-xs md:text-sm font-bold shadow bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 hover:scale-105 transform transition duration-150 mt-3 md:mt-6">
            Essai <span className="italic">GRATUIT</span>
          </a>
        </Link>
        <p className="text-slate-500 max-w-2xl text-center font-semibold mt-1 text-xs md:text-sm">
          Sans engagement.
        </p>
        <img src="/assets/images/google_five_stars.png" className="w-32 mt-1 md:mt-3" />
        <div className="md:p-1.5 p-1 mt-1 md:mt-5 bg-slate-400 bg-opacity-20 rounded-md md:rounded-2xl">
          <img
            src="/assets/images/preview_website.png"
            className="w-[90vw] md:w-[80vw]"
            id="previewImg"
          />
        </div>

        <p className="text-slate-800 text-2xl text-center font-semibold pt-24 pb-24 text-sm">
          La suite.
        </p>
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
