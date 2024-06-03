import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";
import Link from "next/link";
import { PricingCard } from "@/components/pricing-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Fade from 'react-reveal/Fade'
import DialogSubscribe from "@/components/dialog-subscribe";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [dialogSubscribe, setDialogSubscribe] = useState(false)
  const [buttonId, setButtonId] = useState(null)

  return (
    <>
      <nav className="bg-white p-2 mt-0 w-full fixed z-30 top-0 shadow">
        <div className="md:container mx-auto flex items-center">
          <div className="text-white font-extrabold">
            <Link href={`/`} legacyBehavior>
              <a className="text-white no-underline hover:text-white hover:no-underline">
                <img src="/assets/images/logo/logo.png" className=" h-8 md:h-12 object-contain" />
              </a>
            </Link>
          </div>
          <div className="flex w-full justify-end items-center space-x-2">
            <Link href={`/login`} legacyBehavior>
              <Button
                variant="ghost"
              // onClick={() => {
              //   setDialogSubscribe(true)
              //   setButtonId('loginButton')
              // }}
              >Se connecter</Button>
            </Link>

            <Link href={`/register`} legacyBehavior>
              <a
                className="text-white p-3 rounded-lg md:rounded-xl text-xs font-extrabold shadow bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 hover:scale-105 transform transition duration-150 cursor-pointer"
              // onClick={() => {
              //   setDialogSubscribe(true)
              //   setButtonId('trialNavbar')
              // }}
              >
                ✨&nbsp;Essai <span className="italic">GRATUIT</span>
              </a>
            </Link>
          </div>
        </div>
      </nav>
      <div className="relative bg-white w-full h-full min-h-screen tracking-tighter max-w-screen overflow-x-hidden">
        <div className="absolute bg-circle-gradient w-1.5screen h-[110vh] md:h-1.5screen -translate-x-[27vw] -translate-y-1/4 z-0"></div>
        <div className="relative flex flex-col w-full h-full mt-20 md:mt-32 items-center z-10">
          <a href="https://www.eatsup.fr/restaurant/75414476-cdef-499c-8cf2-686f26713987/menu" target="_blank">
            <div className="absolute right-6 md:right-6 lg:right-16 top-52 md:top-32 rotate-12 flex flex-col items-center">
              <div className="flex gap-1">
                <p className="font-bold text-sm md:text-lg">Voir le menu</p>
                <img
                  src="/assets/images/tap.png"
                  className="w-5"
                />
              </div>
              <img
                src="/assets/images/sticker.png"
                className="w-24 md:w-44"
              />
            </div>
          </a>
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
          <p className="text-slate-400 container md:max-w-2xl text-center font-semibold mt-1 md:mt-3 text-xs ipromax:text-sm md:text-base">
            Avec Eatsup : <span className="text-slate-500">gagnez du temps</span> en salle, offrez un accès continu au
            menu pour <span className="text-slate-500">stimuler les ventes</span>, et partagez <span className="text-slate-500">l&apos;excellence</span> de votre
            établissement.
          </p>
          <p className="text-slate-400 container md:max-w-2xl text-center font-semibold mt-1 text-xs ipromax:text-sm md:text-base">
            <span className="text-slate-500">Propulsez vos avis Google</span> et <span className="text-slate-500">distinguez-vous</span> dans le marché le plus
            compétitif.
          </p>
          <Link href={`/register`} legacyBehavior>
            <a
              className="text-white p-2 ipromax:p-3 rounded-lg md:rounded-xl text-xs ipromax:text-sm font-bold shadow bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 hover:scale-105 transform transition duration-150 mt-3 md:mt-6 cursor-pointer"
            // onClick={() => {
            //   setDialogSubscribe(true)
            //   setButtonId('trialHero')
            // }}
            >
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
          <Fade bottom>
            <div className="flex bg-blue-200 rounded-lg mx-4 py-2 px-4 space-x-10 md:space-x-5 shadow-md items-center my-5">
              <div className="flex -space-x-3">
                <img src="/assets/images/restaurant_1.jpg" className="aspect-square object-cover w-8 md:w-11 rounded-full border border-white" />
                <img src="/assets/images/restaurant_2.jpg" className="aspect-square object-cover w-8 md:w-11 rounded-full border border-white" />
                <img src="/assets/images/restaurant_3.jpg" className="aspect-square object-cover w-8 md:w-11 rounded-full border border-white" />
              </div>
              <p className="text-[10px] ipromax:text-xs md:text-base font-bold tracking-tight leading-3">88 % des restaurants ont envisagé de passer aux menus numériques en 2024</p>
            </div>
          </Fade>
          <Fade bottom cascade>
            <div className="flex flex-col px-4 items-center md:flex-row pt-8 pb-16 md:px-0 md:items-start md:space-x-16 md:w-[80vw]">
              <img src="/assets/images/serveur.png" className="max-h-80 rounded-md object-cover object-left md:aspect-square shadow-lg mb-7 md:mb-0" />
              <div>
                <h2 className="text-2xl md:text-4xl font-black max-w-3xl bg-custom-gradient bg-clip-text text-transparent md:pb-2 drop-shadow-lg">
                  Gagnez du temps en salle
                </h2>
                <p className="text-sm ipromax:text-base md:text-lg font-semibold pb-4">Fini le stress du coup de feu, de la barrière de la langue et des clients qui s’impatientent</p>
                <ul className="list-disc text-sm ipromax:text-base md:text-lg space-y-2 md:space-y-4 pl-5">
                  <li>Accès rapide au menu ➡️ <span className="font-bold md:font-bold text-primary tracking-tight">commandes plus rapides</span></li>
                  <li><span className="font-bold md:font-bold text-primary tracking-tight">Meilleure rotation</span> des tables</li>
                  <li>Informations détaillées, <span className="font-bold md:font-bold text-primary tracking-tight">menu traduit par Intelligence Artificielle</span></li>
                  <li>Contact humain/relationnel préservé</li>
                  <li><span className="font-bold md:font-bold text-primary tracking-tight">Libère entre 5 et 10h de travail</span> par mois pour votre serveur</li>
                </ul>
              </div>
            </div>
          </Fade>
          <div className="md:hidden">
            <Fade bottom cascade>
              <div className="flex flex-col-reverse md:flex-row relative w-full md:w-[80vw] px-4 md:px-0 md:py-16 md:transform md:-translate-x-10">
                <div className="relative w-full bg-card-feature text-white px-5 py-4 md:px-11 md:py-9 rounded-xl pb-10 md:pb-36 overflow-hidden">
                  {/* <img src="/assets/images/logo/logo.png" className="absolute right-0 top-1/2 transform rotate-[-17.517deg] -translate-y-1/2 max-h-96 rounded-md object-cover object-left z-0" /> */}
                  <div className="relative text-white rounded-xl z-10">
                    <h2 className="text-2xl md:text-4xl font-black max-w-3xl bg-text-light-card-primary bg-clip-text text-transparent md:pb-2 drop-shadow-lg">
                      Faites grimper l’addition
                    </h2>
                    <p className="text-sm ipromax:text-base md:text-lg font-semibold pb-4">Une application pensée pour optimiser l’expérience client et augmenter votre marge</p>
                    <ul className="list-disc text-sm ipromax:text-base md:text-lg space-y-2 md:space-y-4 pl-5">
                      <li>Le menu est <span className="font-bold md:font-bold tracking-tight">accessible tout au long du repas</span></li>
                      <li><span className="font-bold md:font-bold tracking-tight">Vos clients commandent</span> sans redemander la carte</li>
                      <li>Vous pouvez suggérer des plats ou proposer des réductions</li>
                      <li>Vous <span className="font-bold md:font-bold tracking-tight">augmentez le panier moyen</span></li>
                    </ul>
                  </div>
                </div>
                <img src="/assets/images/money.png" className="md:absolute md:right-0 md:top-1/2 transform md:translate-x-[40%] md:-translate-y-1/2 max-h-96 rounded-md object-cover object-left shadow-lg md:z-20 mb-7 md:mb-0" />
              </div>
            </Fade>
          </div>
          <Fade bottom cascade>
            <div className="hidden md:flex md:flex-row relative w-full md:w-[80vw] px-4 md:px-0 md:py-16 gap-3">

              <div className="w-full bg-card-feature text-white px-5 py-4 md:px-11 md:py-9 rounded-xl pb-10 md:pb-20 overflow-hidden">
                <img src="/assets/images/logo/logo.png" className="absolute left-10 top-1/2 transform rotate-[-17.517deg] -translate-y-1/2 max-h-60 rounded-md object-cover object-left z-0" />
                <div className="relative text-white rounded-xl z-10">
                  <h2 className="text-2xl md:text-4xl font-black max-w-3xl bg-text-light-card-primary bg-clip-text text-transparent md:pb-2 drop-shadow-lg">
                    Faites grimper l’addition
                  </h2>
                  <p className="text-sm ipromax:text-base md:text-lg font-semibold pb-4">Une application pensée pour optimiser l’expérience client et augmenter votre marge</p>
                  <ul className="list-disc text-sm ipromax:text-base md:text-lg space-y-2 md:space-y-4 pl-5">
                    <li>Le menu est <span className="font-bold md:font-bold tracking-tight">accessible tout au long du repas</span></li>
                    <li><span className="font-bold md:font-bold tracking-tight">Vos clients commandent</span> sans redemander la carte</li>
                    <li>Vous pouvez suggérer des plats ou proposer des réductions</li>
                    <li>Vous <span className="font-bold md:font-bold tracking-tight">augmentez le panier moyen</span></li>
                  </ul>
                </div>
              </div>
              <img src="/assets/images/money.png" className="max-h-96 w-1/3 rounded-md object-cover object-center shadow-lg md:z-20 mb-7 md:mb-0" />
            </div>
          </Fade>
          <Fade bottom>
            <div className="flex flex-col md:flex-col py-16 w-full px-4 md:px-[10vw] ">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl md:text-4xl font-black max-w-3xl bg-custom-gradient bg-clip-text text-transparent md:pb-2 drop-shadow-lg">
                    Maximisez votre visibilité
                  </h2>
                  <p className="text-sm ipromax:text-base md:text-lg font-semibold pb-4">Plus besoin de réflechir à des stratégies de communciation, Eats&apos;up s’en charge pour vous</p>

                  {/* <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full">
                <ul className="list-disc text-sm ipromax:text-base md:text-lg space-y-4 pl-5">
                  <li>Les clients peuvent scanner le QRcode sur votre vitrine</li>
                  <li><span className="font-bold md:font-bold text-primary tracking-tight">Accès simplifié</span> au menu et à vos coordonnées</li>
                </ul>
                <ul className="list-disc text-sm ipromax:text-base md:text-lg space-y-4 pl-5">
                  <li>Plus besoin d’imprimer,  <span className="font-bold md:font-bold text-primary tracking-tight">ni distribuer de flyer</span></li>
                  <li>Possibilité de partager le menu en quelques clics</li>
                </ul>
              </div> */}
                </div>

                <Link href={`/register`} legacyBehavior>
                  <a
                    className="hidden md:block text-white p-2 ipromax:p-3 rounded-lg md:rounded-xl text-xs ipromax:text-sm font-bold shadow bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 hover:scale-105 transform transition duration-150 cursor-pointer"
                  // onClick={() => {
                  //   setDialogSubscribe(true)
                  //   setButtonId('trialVisibility')
                  // }}
                  >
                    Essai <span className="italic">GRATUIT</span>
                  </a>
                </Link>
              </div>

              <div className="w-full space-y-4">
                <div className="flex justify-between gap-4">
                  <div className="relative w-1/2 h-32 md:h-64 bg-cover bg-center rounded-lg flex justify-center items-center" style={{ backgroundImage: "url('/assets/images/visibility1.png')" }}>
                    <div className="absolute inset-0 bg-[radial-gradient(169.40%_89.55%_at_50.76%_50.29%,rgba(0,0,0,0.80)_0%,rgba(0,0,0,0.30)_100%)] bg-opacity-50 rounded-lg"></div>
                    <p className="relative z-10 text-white text-sm px-3 md:text-2xl text-center md:px-10 font-bold drop-shadow-[2px_2px_2px_rgba(255,255,255,0.25)]">Les clients peuvent scanner le QRcode sur votre vitrine</p>
                  </div>
                  <div className="relative w-1/2 h-32 md:h-64 bg-cover bg-center rounded-lg flex justify-center items-center" style={{ backgroundImage: "url('/assets/images/visibility2.png')" }}>
                    <div className="absolute inset-0 bg-[radial-gradient(169.40%_89.55%_at_50.76%_50.29%,rgba(0,0,0,0.80)_0%,rgba(0,0,0,0.30)_100%)] bg-opacity-50 rounded-lg"></div>
                    <p className="relative z-10 text-white text-sm px-3 md:text-2xl text-center md:px-10 font-bold drop-shadow-[2px_2px_2px_rgba(255,255,255,0.25)]">Plus besoin d’imprimer, <span className="font-bold md:font-bold text-primary tracking-tight">ni distribuer de flyer</span></p>
                  </div>
                </div>
                <div className="flex justify-between gap-4">
                  <div className="relative w-1/2 h-32 md:h-64 bg-cover bg-center rounded-lg flex justify-center items-center" style={{ backgroundImage: "url('/assets/images/visibility3.png')" }}>
                    <div className="absolute inset-0 bg-[radial-gradient(169.40%_89.55%_at_50.76%_50.29%,rgba(0,0,0,0.80)_0%,rgba(0,0,0,0.30)_100%)] bg-opacity-50 rounded-lg"></div>
                    <p className="relative z-10 text-white text-sm px-3 md:text-2xl text-center md:px-10 font-bold drop-shadow-[2px_2px_2px_rgba(255,255,255,0.25)]"><span className="font-bold md:font-bold text-primary tracking-tight">Accès simplifié</span> au menu et à vos coordonnées</p>
                  </div>
                  <div className="relative w-1/2 h-32 md:h-64 bg-cover bg-center rounded-lg flex justify-center items-center" style={{ backgroundImage: "url('/assets/images/visibility4.png')" }}>
                    <div className="absolute inset-0 bg-[radial-gradient(169.40%_89.55%_at_50.76%_50.29%,rgba(0,0,0,0.80)_0%,rgba(0,0,0,0.30)_100%)] bg-opacity-50 rounded-lg"></div>
                    <p className="relative z-10 text-white text-sm px-3 md:text-2xl text-center md:px-10 font-bold drop-shadow-[2px_2px_2px_rgba(255,255,255,0.25)]">Possibilité de partager le menu en quelques clics</p>
                  </div>
                </div>
              </div>
            </div>
          </Fade>

          <div className="md:hidden">
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
                      <li><span className="font-bold md:font-bold tracking-tight">Obtenez plus d’avis</span> sur Google</li>
                      <li><span className="font-bold md:font-bold tracking-tight">Devenez plus visible </span> sur les moteurs de recherche</li>
                      <li>Dépassez les autres restaurants de votre ville</li>
                    </ul>
                  </div>
                </div>
                <img src="/assets/images/queue.png" className="md:absolute md:left-0 md:top-1/2 md:transform md:-translate-x-[60%] md:-translate-y-1/2 max-h-96 rounded-md object-cover object-left shadow-lg md:z-20 mb-7 md:mb-0" />
              </div>
            </Fade>
          </div>
          {/* <div className="hidden md:flex md:flex-row relative w-full md:w-[80vw] px-4 md:px-0 md:py-16 gap-3">
            <div className="w-full bg-card-feature text-white px-5 py-4 md:px-11 md:py-9 rounded-xl pb-10 md:pb-20 overflow-hidden">
              <img src="/assets/images/logo/logo.png" className="absolute left-10 top-1/2 transform rotate-[-17.517deg] -translate-y-1/2 max-h-60 rounded-md object-cover object-left z-0" />
              <div className="relative text-white rounded-xl z-10"></div> */}
          <Fade bottom>
            <div className="hidden md:flex md:flex-row-reverse w-full md:w-[80vw] px-4 md:px-0 md:py-16 gap-3">
              <div className="relative w-full bg-card-feature text-white px-5 py-4 md:px-11 md:py-9 rounded-xl pb-10 md:pb-36 overflow-hidden md:pr-32">
                <img src="/assets/images/logo/logo.png" className="absolute right-0 top-1/2 transform rotate-[-17.517deg] -translate-y-1/2 max-h-96 rounded-md object-cover object-left z-0" />
                <div className="relative text-white rounded-xl z-10">
                  <h2 className="text-2xl md:text-4xl font-black max-w-3xl bg-text-light-card-primary bg-clip-text text-transparent pb-2 drop-shadow-lg">
                    Faites la différence
                  </h2>
                  <p className="text-sm ipromax:text-base md:text-lg font-semibold pb-4">Un atout essentiel dans un des secteurs les plus concurrentiels en France</p>
                  <ul className="list-disc text-sm ipromax:text-base md:text-lg space-y-4 pl-5 ">
                    <li><span className="font-bold md:font-bold tracking-tight">Obtenez plus d’avis</span> sur Google</li>
                    <li><span className="font-bold md:font-bold tracking-tight">Devenez plus visible </span> sur les moteurs de recherche</li>
                    <li>Dépassez les autres restaurants de votre ville</li>
                  </ul>
                </div>
              </div>
              <img src="/assets/images/queue.png" className="max-h-96 w-1/3 rounded-md object-cover object-right shadow-lg md:z-20 mb-7 md:mb-0" />
            </div>
          </Fade>
          <Fade bottom cascade>
            <h2 className="text-2xl ipromax:text-3xl md:text-4xl font-black max-w-3xl text-center mt-14 leading-6">
              Comment ça fonctionne ?
            </h2>
          </Fade>

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
          <Fade bottom cascade>
            <h2 className="text-2xl ipromax:text-3xl md:text-4xl font-black max-w-3xl text-center mt-14 leading-6" id="pricing">
              Le seul abonnement
            </h2>
            <h2 className="text-2xl ipromax:text-3xl md:text-4xl font-black max-w-3xl text-center leading-6 ">
              dont <span className="bg-custom-gradient bg-clip-text text-transparent">vous aurez besoin</span>
            </h2>
          </Fade>
          <div className="container flex flex-col md:flex-row md:w-[80vw] justify-between space-y-8 md:space-y-0 md:space-x-10 pt-10">
            <PricingCard type="commis" setDialogSubscribe={setDialogSubscribe} setButtonId={setButtonId} />
            <PricingCard type="cuisinier" setDialogSubscribe={setDialogSubscribe} setButtonId={setButtonId} />
            <PricingCard type="chef" setDialogSubscribe={setDialogSubscribe} setButtonId={setButtonId} />
          </div>
          {/* <Fade className="w-[80vw]" bottom cascade> */}
          <div className="w-[80vw]" id="faq">
            <h2 className="text-2xl ipromax:text-3xl md:text-4xl font-black text-center mt-14 leading-6">
              Questions fréquentes
            </h2>
            <Accordion type="multiple" className="mt-10 mb-20 space-y-2">

              <AccordionItem value="item-1" className="w-full border rounded-xl shadow overflow-hidden">
                <AccordionTrigger className="px-4 w-full font-bold hover:no-underline text-base md:text-lg text-left">🤖&nbsp;&nbsp;C'est compliqué à installer si on n'y connaît rien en techno ?</AccordionTrigger>
                <AccordionContent className="px-4 text-base md:text-lg">
                  Eats&apos;up
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="w-full border rounded-xl shadow overflow-hidden">
                <AccordionTrigger className="px-4 w-full font-bold hover:no-underline text-base md:text-lg text-left">💁‍♀️&nbsp;&nbsp;Pourquoi investir là-dedans plutôt que dans autre chose ?</AccordionTrigger>
                <AccordionContent className="px-4 text-base md:text-lg">
                  Parce que ça peut directement augmenter vos revenus en rendant votre carte plus accessible et en attirant plus de clients.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="w-full border rounded-xl shadow overflow-hidden">
                <AccordionTrigger className="px-4 w-full font-bold hover:no-underline text-base md:text-lg text-left">💁‍♀️&nbsp;&nbsp;On est déjà habitué avec la carte. Pourquoi changer ?</AccordionTrigger>
                <AccordionContent className="px-4 text-base md:text-lg">
                  Notre solution est peut-être plus adaptée à vos besoins spécifiques, avec des fonctionnalités uniques qui peuvent vraiment faire la différence.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="w-full border rounded-xl shadow overflow-hidden">
                <AccordionTrigger className="px-4 w-full font-bold hover:no-underline text-base md:text-lg text-left">💁‍♀️&nbsp;&nbsp;On ne veut pas perdre le contact avec nos clients. C'est beaucoup trop important pour nous.</AccordionTrigger>
                <AccordionContent className="px-4 text-base md:text-lg">
                  Oui ! Ça rend la commande plus facile pour eux et vous libère du temps pour un service encore plus personnalisé.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="w-full border rounded-xl shadow overflow-hidden">
                <AccordionTrigger className="px-4 w-full font-bold hover:no-underline text-base md:text-lg text-left">💁‍♀️&nbsp;&nbsp;On a toujours fait comme ça. Pourquoi changer maintenant ?</AccordionTrigger>
                <AccordionContent className="px-4 text-base md:text-lg">
                  Le monde change et les clients aussi. Notre outil peut vous aider à rester à jour et à attirer plus de monde.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6" className="w-full border rounded-xl shadow overflow-hidden">
                <AccordionTrigger className="px-4 w-full font-bold hover:no-underline text-base md:text-lg text-left">💁‍♀️&nbsp;&nbsp;Ça va vraiment nous faire gagner plus ?</AccordionTrigger>
                <AccordionContent className="px-4 text-base md:text-lg">
                  Absolument. En rendant votre menu plus visible et accessible en ligne, vous pouvez attirer plus de clients et augmenter vos ventes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7" className="w-full border rounded-xl shadow overflow-hidden">
                <AccordionTrigger className="px-4 w-full font-bold hover:no-underline text-base md:text-lg text-left">💁‍♀️&nbsp;&nbsp;Nos infos et celles de nos clients, c'est sécurisé ?</AccordionTrigger>
                <AccordionContent className="px-4 text-base md:text-lg">
                  Tout à fait. La sécurité est notre priorité. Vos données et celles de vos clients sont protégées avec les dernières technologies.
                </AccordionContent>
              </AccordionItem>




              {/* 

              **Puis-je changer le menu comme je veux ?**

              Vous pouvez effectivement changer à tout moment et en temps réel l’ordre des plats, l’intitulé des plats et des catégories,  leur composition, ainsi que les prix.

              **Dois-je éditer un QRcode à chaque modification de menu ?**

              Non, votre QRcode est affilié à votre compte, chaque modification est donc enregistrée et mise à jour sur le même QRcode. En revanche, pour changer de QRcode  vous devez vous créer un nouveau compte.

              **Comment-puis je créer un menu multi-lingue ?**

              Il vous suffit de choisir les langues dans lesquelles vous voulez votre menu lors de la création de celui ci. Les traductions sont automatiques et peuvent s’appliquer à tout le menu ou uniquement aux descriptions de menu.

              En prenant l’abonnement prémium, il vous sera possible de traduire votre menu en plus de 23 langues.

              Pensez à Ajouter des chiffres devant chaque ligne afin de reconnaître le nom des éléments du menu lorsque celui-ci sera traduit en langue étrangère . */}









              {/* <AccordionItem value="item-1" className="w-full border rounded-xl shadow overflow-hidden">
                <AccordionTrigger className="px-4 w-full font-bold hover:no-underline text-base md:text-lg text-left">💁‍♀️&nbsp;&nbsp;À quoi sert Eatsup ?</AccordionTrigger>
                <AccordionContent className="px-4 text-base md:text-lg">
                  Eats&apos;up 
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
              </AccordionItem> */}
            </Accordion>
          </div>
          {/* </Fade> */}
          <div className="w-full flex flex-col bg-card-feature px-5 py-4 md:px-24 md:pb-36 pb-24">
            {/* <div className="w-full rounded-3xl bg-white py-20">
            <p className="text-3xl font-bold text-center">Rejoignez l&apos;aventure avant qu&apos;il ne soit trop tard</p>
          </div> */}
            <div className="flex flex-col md:flex-row md:pt-24 pt-12">
              <img src="/assets/images/logo/logo_white.png" className="h-14 md:h-20 object-contain transform -translate-y-4" />

              <div className="flex flex-col items-center md:items-start md:flex-row gap-10 md:gap-24 md:ml-auto">
                <div className="text-white">
                  <h2 className="text-center md:text-left text-2xl font-black max-w-3xl bg-text-light-card-primary bg-clip-text text-transparent pb-2 drop-shadow-lg">
                    Navigation
                  </h2>
                  <ul className="text-center md:text-left text-sm ipromax:text-base space-y-1 md:space-y-2">
                    <li><a href="https://www.eatsup.fr/restaurant/75414476-cdef-499c-8cf2-686f26713987/menu" target="_blank">Démo</a></li>
                    <li><a href="#pricing">Tarifs</a></li>
                    <li><a href="#faq">FAQ</a></li>
                  </ul>
                </div>
                <div className="text-white">
                  <h2 className="text-center md:text-left text-2xl font-black max-w-3xl bg-text-light-card-primary bg-clip-text text-transparent pb-2 drop-shadow-lg">
                    Informations
                  </h2>
                  <ul className="text-center md:text-left text-sm ipromax:text-base space-y-2">
                    <li><a href="#">Politique de confidentialité</a></li>
                    <li><a href="#">Conditions d&apos;utilisation</a></li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
          <div className="w-full bg-[#5050eaed] text-white border-t border-primary text-center py-1">
            Copyright © Eatsup 2024 🇫🇷
          </div>
        </div>
        <DialogSubscribe open={dialogSubscribe} setOpen={setDialogSubscribe} buttonId={buttonId} setButtonId={setButtonId} />
      </div >
    </>
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
