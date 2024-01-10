import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";
import Link from "next/link";
import { PricingCard } from "@/components/pricing-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Fade from 'react-reveal/Fade'

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
          menu pour stimuler les ventes, et partagez l&apos;excellence de votre
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
        <Fade bottom cascade>
          <div className="flex flex-col px-4 items-center md:flex-row pt-32 pb-16 md:px-0 md:items-start md:space-x-16">
            <img src="/assets/images/serveur.png" className="max-h-80 rounded-md object-cover object-left shadow-lg mb-7 md:mb-0" />
            <div>
              <h2 className="text-2xl md:text-4xl font-black max-w-3xl bg-custom-gradient bg-clip-text text-transparent md:pb-2 drop-shadow-lg">
                Gagnez du temps en salle
              </h2>
              <p className="text-sm ipromax:text-base md:text-lg font-semibold pb-4">Fini le stress du coup de feu, de la barrière de la langue et des clients qui s’impatientent</p>
              <ul className="list-disc text-sm ipromax:text-base md:text-lg space-y-2 md:space-y-4 pl-5">
                <li>Accès rapide au menu ➡️ <span className="font-extrabold md:font-black text-primary tracking-tight">commandes plus rapides</span></li>
                <li><span className="font-extrabold md:font-black text-primary tracking-tight">Meilleure rotation</span> des tables</li>
                <li>Informations détaillées, <span className="font-extrabold md:font-black text-primary tracking-tight">menu traduit par Intelligence Artificielle</span></li>
                <li>Contact humain/relationnel préservé</li>
                <li><span className="font-extrabold md:font-black text-primary tracking-tight">Libère entre 5 et 10h de travail</span> par mois pour votre serveur</li>
              </ul>
            </div>
          </div>
        </Fade>
        <Fade bottom cascade>
          <div className="flex flex-col-reverse md:flex-row relative w-full md:w-[80vw] px-4 md:px-0 md:py-16 md:transform md:-translate-x-10">
            <div className="relative w-full bg-card-feature text-white px-5 py-4 md:px-11 md:py-9 rounded-xl pb-10 md:pb-36 overflow-hidden">
              <img src="/assets/images/logo/logo.png" className="absolute right-0 top-1/2 transform rotate-[-17.517deg] -translate-y-1/2 max-h-96 rounded-md object-cover object-left z-0" />
              <div className="relative text-white rounded-xl z-10">
                <h2 className="text-2xl md:text-4xl font-black max-w-3xl bg-text-light-card-primary bg-clip-text text-transparent md:pb-2 drop-shadow-lg">
                  Faites grimper l’addition
                </h2>
                <p className="text-sm ipromax:text-base md:text-lg font-semibold pb-4">Une application pensée pour optimiser l’expérience client et augmenter votre marge</p>
                <ul className="list-disc text-sm ipromax:text-base md:text-lg space-y-2 md:space-y-4 pl-5">
                  <li>Le menu est <span className="font-extrabold md:font-black tracking-tight">accessible tout au long du repas</span></li>
                  <li><span className="font-extrabold md:font-black tracking-tight">Vos clients commandent</span> sans redemander la carte</li>
                  <li>Vous pouvez suggérer des plats ou proposer des réductions</li>
                  <li>Vous <span className="font-extrabold md:font-black tracking-tight">augmentez le panier moyen</span></li>
                </ul>
              </div>
            </div>
            <img src="/assets/images/money.png" className="md:absolute md:right-0 md:top-1/2 md:transform md:translate-x-[40%] md:-translate-y-1/2 max-h-96 rounded-md object-cover object-left shadow-lg md:z-20 mb-7 md:mb-0" />
          </div>
        </Fade>
        <Fade bottom cascade>
          <div className="flex flex-col-reverse md:flex-col py-16 w-full px-4 md:px-[10vw] ">
            <div>
              <h2 className="text-2xl md:text-4xl font-black max-w-3xl bg-custom-gradient bg-clip-text text-transparent md:pb-2 drop-shadow-lg">
                Maximisez votre visibilité
              </h2>
              <p className="text-sm ipromax:text-base md:text-lg font-semibold pb-4">Plus besoin de réflechir à des stratégies de communciation, Eat’sup s’en charge pour vous</p>
              <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full">
                <ul className="list-disc text-sm ipromax:text-base md:text-lg space-y-4 pl-5">
                  <li>Les clients peuvent scanner le QRcode sur votre vitrine</li>
                  <li><span className="font-extrabold md:font-black text-primary tracking-tight">Accès simplifié</span> au menu et à vos coordonnées</li>
                </ul>
                <ul className="list-disc text-sm ipromax:text-base md:text-lg space-y-4 pl-5">
                  <li>Plus besoin d’imprimer,  <span className="font-extrabold md:font-black text-primary tracking-tight">ni distribuer de flyer</span></li>
                  <li>Possibilité de partager le menu en quelques clics</li>
                </ul>
              </div>
            </div>
            <img src="/assets/images/visibility.png" className="max-h-80 rounded-xl w-full object-cover shadow-lg md:mt-10 mb-5 md:mb-0" />
          </div>
        </Fade>
        <Fade bottom cascade>
          <div className="flex flex-col-reverse md:flex-row relative w-full md:w-[80vw] px-4 md:px-0 md:py-16 md:transform md:translate-x-10">
            <div className="relative w-full bg-card-feature text-white px-5 py-4 md:px-11 md:py-9 rounded-xl pb-10 md:pb-36 overflow-hidden md:flex md:justify-end">
              <img src="/assets/images/logo/logo.png" className="absolute right-0 top-1/2 transform rotate-[-17.517deg] -translate-y-1/2 max-h-96 rounded-md object-cover object-left z-0" />
              <div className="relative text-white rounded-xl z-10">
                <h2 className="text-2xl md:text-4xl font-black max-w-3xl bg-text-light-card-primary bg-clip-text text-transparent pb-2 drop-shadow-lg">
                  Faites la différence
                </h2>
                <p className="text-sm ipromax:text-base md:text-lg font-semibold pb-4">Un atout essentiel dans un des secteurs les plus concurrentiels en France</p>
                <ul className="list-disc text-sm ipromax:text-base md:text-lg space-y-4 pl-5 ">
                  <li><span className="font-extrabold md:font-black tracking-tight">Obtenez plus d’avis</span> sur Google</li>
                  <li><span className="font-extrabold md:font-black tracking-tight">Devenez plus visible </span> sur les moteurs de recherche</li>
                  <li>Dépassez les autres restaurant de votre ville</li>
                  <li><span className="font-extrabold md:font-black tracking-tight">Atout majeur</span> dans un des secteur les plus concurrentiel de France</li>
                </ul>
              </div>
            </div>
            <img src="/assets/images/queue.png" className="md:absolute md:left-0 md:top-1/2 md:transform md:-translate-x-[60%] md:-translate-y-1/2 max-h-96 rounded-md object-cover object-left shadow-lg md:z-20 mb-7 md:mb-0" />
          </div>
        </Fade>
        <Fade bottom cascade>
          <h2 className="text-2xl ipromax:text-3xl md:text-4xl font-black max-w-3xl text-center mt-14 leading-6">
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
        </Fade>
        <Fade bottom cascade>
          <h2 className="text-2xl ipromax:text-3xl md:text-4xl font-black max-w-3xl text-center mt-14 leading-6">
            Le seul abonnement
          </h2>
          <h2 className="text-2xl ipromax:text-3xl md:text-4xl font-black max-w-3xl text-center leading-6">
            dont vous aurez besoin
          </h2>
        </Fade>
        <div className="container flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-10 pt-10">
          <PricingCard type="commis" />
          <PricingCard type="cuisinier" />
          <PricingCard type="chef" />
        </div>
        <Fade bottom cascade>
          <h2 className="text-2xl ipromax:text-3xl md:text-4xl font-black max-w-3xl text-center mt-14 leading-6">
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
                Yes. It&apos;s animated by default, but you can disable it if you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Fade>
      </div>
    </div >
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
