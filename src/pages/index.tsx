import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";
import Link from "next/link";
import { PricingCard } from "@/components/pricing-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
  return (
    <div className="relative bg-white w-full h-full min-h-screen tracking-tighter max-w-screen overflow-x-hidden">
      <div className="absolute bg-circle-gradient w-1.5screen h-[110vh] md:h-1.5screen -translate-x-[27vw] -translate-y-1/4 z-0"></div>
      <div className="relative flex flex-col w-full h-full mt-20 md:mt-32 items-center z-10">
        <div className="bg-custom-gradient rounded-md px-2 md:rounded-lg md:px-3 py-0.5">
          <p className="text-white font-bold text-xs md:text-base">
            ✨ Traductions par Intelligence Artificielle 🤖
          </p>
        </div>
        <h2 className="text-2xl ipromax:text-3xl md:text-6xl font-black max-w-3xl text-center mt-3">
          Augmentez vos ventes
        </h2>
        <h2 className="text-2xl ipromax:text-3xl md:text-6xl -mt-2 md:mt-0 font-black max-w-3xl text-center ">
          en{" "}
          <span className="bg-custom-gradient bg-clip-text text-transparent">
            un seul scan
          </span>
        </h2>
        <p className="text-slate-500 container md:max-w-2xl text-center font-semibold mt-1 md:mt-3 text-xs ipromax:text-sm md:text-base">
          Avec Eatsup : gagnez du temps en salle, offrez un accès continu au
          menu pour stimuler les ventes, et partagez l'excellence de votre
          établissement.
        </p>
        <p className="text-slate-500 container md:max-w-2xl text-center font-semibold mt-1 text-xs ipromax:text-sm md:text-base">
          Propulsez vos avis Google et distinguez-vous dans le marché le plus
          compétitif.
        </p>
        <Link href={`/register`} legacyBehavior>
          <a className="text-white p-2 ipromax:p-3 rounded-lg md:rounded-xl text-xs ipromax:text-sm font-bold shadow bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 hover:scale-105 transform transition duration-150 mt-3 md:mt-6">
            Essai <span className="italic">GRATUIT</span>
          </a>
        </Link>
        <p className="text-slate-500 max-w-2xl text-center font-semibold mt-1 text-xs ipromax:text-sm">
          Sans engagement.
        </p>
        <img
          src="/assets/images/google_five_stars.png"
          className="w-32 mt-1 md:mt-3"
        />
        <div className="md:p-1.5 p-1 mt-1 md:mt-5 bg-slate-400 bg-opacity-20 rounded-md md:rounded-2xl">
          <img
            src="/assets/images/preview_website.png"
            className="w-[90vw] md:w-[80vw]"
            id="previewImg"
          />
        </div>
        <h2 className="text-2xl ipromax:text-3xl md:text-5xl font-black max-w-3xl text-center mt-14 leading-6">
          Comment ça fonctionne ?
        </h2>
        <div className="mt-5 flex overflow-x-scroll space-x-1 whitespace-nowrap max-w-full px-4 py-4 items-center no-scrollbar">
          <div className="flex flex-col max-w-[250px] items-center justify-center bg-primary text-white rounded-2xl px-10 py-3 space-y-2 shadow-lg">
            <p className="text-3xl font-bold text-center">1</p>
            <div>
              <p className="text-3xl font-semibold text-center">Saisissez</p>
              <p className="text-3xl font-semibold text-center">votre menu 📝</p>
            </div>
            <p className="text-sm text-center whitespace-normal">Entre votre menu sur le site et modifiez le quand vous voulez</p>
          </div>
          <img src="/assets/images/arrow_process.png" className="w-16 h-16" />
          <div className="flex flex-col max-w-[250px] items-center justify-center bg-primary text-white rounded-2xl px-10 py-3 space-y-2 shadow-lg">
            <p className="text-3xl font-bold text-center">2</p>
            <div>
              <p className="text-3xl font-semibold text-center">Commandez</p>
              <p className="text-3xl font-semibold text-center">vos QRcodes 📦</p>
            </div>
            <p className="text-sm text-center whitespace-normal">Choisissez parmi les différents formats de QRcodes disponibles</p>
          </div>
          <img src="/assets/images/arrow_process.png" className="w-16 h-16" />
          <div className="flex flex-col max-w-[250px] items-center justify-center bg-primary text-white rounded-2xl px-10 py-3 space-y-2 shadow-lg">
            <p className="text-3xl font-bold text-center">3</p>
            <div>
              <p className="text-3xl font-semibold text-center">Contemplez</p>
              <p className="text-3xl font-semibold text-center">les profits 💰</p>
            </div>
            <p className="text-sm text-center whitespace-normal">Vous n’avez plus qu’a installer vos QR et observer le résultat ! </p>
          </div>
        </div>
        <h2 className="text-2xl ipromax:text-3xl md:text-5xl font-black max-w-3xl text-center mt-14 leading-6">
          Le seul abonnement
        </h2>
        <h2 className="text-2xl ipromax:text-3xl md:text-5xl font-black max-w-3xl text-center leading-6">
          dont vous aurez besoin
        </h2>
        <div className="container flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-10 pt-10">
          <PricingCard type="commis" />
          <PricingCard type="cuisinier" />
          <PricingCard type="chef" />
        </div>
        <h2 className="text-2xl ipromax:text-3xl md:text-5xl font-black max-w-3xl text-center mt-14 leading-6">
          Questions fréquentes
        </h2>
        <Accordion type="multiple" className="w-full px-4 mt-10 mb-20 space-y-2">
          <AccordionItem value="item-1" className="border rounded-xl shadow overflow-hidden">
            <AccordionTrigger className="px-4 font-bold hover:no-underline text-base md:text-lg text-left">💁‍♀️&nbsp;&nbsp;À quoi sert Eatsup ?</AccordionTrigger>
            <AccordionContent className="px-4 text-base md:text-lg">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border rounded-xl shadow overflow-hidden">
            <AccordionTrigger className="px-4 font-bold hover:no-underline text-base md:text-lg text-left">🤝&nbsp;&nbsp;L&apos;abonnement est-il sans engagement ?</AccordionTrigger>
            <AccordionContent className="px-4 text-base md:text-lg">
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border rounded-xl shadow overflow-hidden">
            <AccordionTrigger className="px-4 font-bold hover:no-underline text-base md:text-lg text-left">🥲&nbsp;&nbsp;Comment annuler mon abonnement ?</AccordionTrigger>
            <AccordionContent className="px-4 text-base md:text-lg">
              Yes. It's animated by default, but you can disable it if you prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
