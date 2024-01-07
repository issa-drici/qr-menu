export const PricingCard = ({ type }) => {
  switch (type) {
    case "commis":
      return (
        <div className="relative shadow-lg rounded-2xl h-fit w-full border">
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 bg-white text-black px-2 py-0.5 text-[10px] ipromax:text-xs font-black border rounded-md">
            <p className="tracking-tight">Seulement 1€<span className="font-normal text-[7px] ipromax:text-[10px]"> / jour</span></p>
          </div>
          <div className="flex items-end justify-between pr-3">
            <img src="/assets/images/pricing/commis.png" className="w-[75px] ipromax:w-[90px]" />
            <div>
              <p className="text-4xl ipromax:text-5xl font-black text-right">
                30€
                <span className="text-sm ipromax:text-lg font-normal text-slate-500">
                  /mois
                </span>
              </p>
              <p className="text-xs text-slate-500 text-right">Facturé mensuellement HT</p>
            </div>
          </div>
          <p className="text-2xl ipromax:text-3xl font-bold pl-3">Commis</p>
          <div className="px-5 pt-4 pb-7">
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/check.png"
                className="w-[18px] h-[15px] ipromax:w-[22px] ipromax:h-[18px]"
              />
              <p className="text-primary text-sm ipromax:text-lg ml-2">3 catégories maximum</p>
            </div>
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/check.png"
                className="w-[18px] h-[15px] ipromax:w-[22px] ipromax:h-[18px]"
              />
              <p className="text-primary text-sm ipromax:text-lg ml-2">5 élements maximum</p>
            </div>
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/check.png"
                className="w-[18px] h-[15px] ipromax:w-[22px] ipromax:h-[18px]"
              />
              <p className="text-primary text-sm ipromax:text-lg ml-2">
                Traduction uniquement en anglais
              </p>
            </div>
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/check.png"
                className="w-[18px] h-[15px] ipromax:w-[22px] ipromax:h-[18px]"
              />
              <p className="text-primary text-sm ipromax:text-lg ml-2">
                Ajout des photos des plats
              </p>
            </div>
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/check.png"
                className="w-[18px] h-[15px] ipromax:w-[22px] ipromax:h-[18px]"
              />
              <p className="text-primary text-sm ipromax:text-lg ml-2">
                Mises à jour du menu illimitées
              </p>
            </div>
            <p className="text-white text-[10px] ipromax:text-base tracking-tight text-center p-1 ipromax:p-3 rounded-lg ipromax:rounded-xl text-sm font-bold shadow bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 hover:scale-105 transform transition duration-150 mt-4">
              Démarrer gratuitement pendant 1 mois
            </p>
            <p className="text-[9px] ipromax:text-xs text-center mt-1 mb-3 text-slate-400">
              Aucune carte de crédit nécessaire - Sans engagement
            </p>
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/cross.png"
                className="w-[18px] ipromax:w-[22px]"
              />
              <p className="text-sm ipromax:text-lg ml-2 line-through text-[#c5c5c5]">
                Suivi analytique du nombre de scan
              </p>
            </div>
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/cross.png"
                className="w-[18px] ipromax:w-[22px]"
              />
              <p className="text-sm ipromax:text-lg ml-2 line-through text-[#c5c5c5]">
                Menu dynamique selon horaire
              </p>
            </div>
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/cross.png"
                className="w-[18px] ipromax:w-[22px]"
              />
              <p className="text-sm ipromax:text-lg ml-2 line-through text-[#c5c5c5]">
                Prise de commandes en ligne
              </p>
            </div>
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/cross.png"
                className="w-[18px] ipromax:w-[22px]"
              />
              <p className="text-sm ipromax:text-lg ml-2 line-through text-[#c5c5c5]">
                Avis clients sur les différents plats
              </p>
            </div>
            <p className="text-sm ipromax:text-lg mt-3 font-extrabold line-through text-[#c5c5c5]">
              Bonus
            </p>
            <p className="text-sm ipromax:text-lg line-through text-[#c5c5c5]">
              Site web <span className="font-bold">offert</span> <span className="text-sm">(valeur 1500€)</span>
            </p>
            <p className="text-sm ipromax:text-lg line-through text-[#c5c5c5]">
              Augmentation <span className="font-bold">Avis Google</span>
            </p>
            <p className="text-sm ipromax:text-lg line-through text-[#c5c5c5]">
              Partage du menu entre amis
            </p>
          </div>
        </div>
      );

    case "cuisinier":
      return (
        <div className="relative bg-card-pricing shadow-lg rounded-2xl text-white w-full border">
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 bg-white text-black px-2 py-0.5 text-[10px] ipromax:text-xs font-black border rounded-md">
            <p className="tracking-tight">💛&nbsp;&nbsp;&nbsp;Populaire - 1.5€<span className="font-normal text-[7px] ipromax:text-[10px]"> / jour</span></p>
          </div>
          <div className="flex items-end justify-between pr-3">
            <img src="/assets/images/pricing/cuisinier.png" className="w-[75px] ipromax:w-[90px]" />
            <div>
              <p className="text-4xl ipromax:text-5xl font-black text-right">
                45€
                <span className="text-sm ipromax:text-lg font-normal text-[rgba(255, 255, 255, 0.70)]">
                  /mois
                </span>
              </p>
              <p className="text-xs text-white text-right">Facturé mensuellement HT</p>
            </div>
          </div>
          <p className="text-2xl ipromax:text-3xl font-bold pl-3">Cuisinier</p>
          <div className="px-5 py-4">
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/check_white.png"
                className="w-[18px] h-[15px] ipromax:w-[22px] ipromax:h-[18px]"
              />
              <p className="text-white text-sm ipromax:text-lg ml-2">3 catégories maximum</p>
            </div>
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/check_white.png"
                className="w-[18px] h-[15px] ipromax:w-[22px] ipromax:h-[18px]"
              />
              <p className="text-white text-sm ipromax:text-lg ml-2">5 élements maximum</p>
            </div>
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/check_white.png"
                className="w-[18px] h-[15px] ipromax:w-[22px] ipromax:h-[18px]"
              />
              <p className="text-white text-sm ipromax:text-lg ml-2">
                Traduction uniquement en anglais
              </p>
            </div>
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/check_white.png"
                className="w-[18px] h-[15px] ipromax:w-[22px] ipromax:h-[18px]"
              />
              <p className="text-white text-sm ipromax:text-lg ml-2">
                Ajout des photos des plats
              </p>
            </div>
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/check_white.png"
                className="w-[18px] h-[15px] ipromax:w-[22px] ipromax:h-[18px]"
              />
              <p className="text-white text-sm ipromax:text-lg ml-2">
                Mises à jour du menu illimitées
              </p>
            </div>
            <p className="text-white text-[10px] ipromax:text-base tracking-tight text-center p-1 ipromax:p-3 rounded-lg ipromax:rounded-xl text-sm font-bold shadow bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 hover:scale-105 transform transition duration-150 mt-4">
              Démarrer gratuitement pendant 1 mois
            </p>
            <p className="text-xs text-center mt-1 mb-3 text-white">
              Aucune carte de crédit nécessaire - Sans engagement
            </p>
            <div className="bg-white rounded-2xl px-2 py-2 ipromax:px-4 ipromax:py-3 shadow-md">
              <p className=" text-black text-sm ipromax:text-lg font-extrabold">
                Bonus
              </p>
              <p className="text-black text-sm ipromax:text-lg mt-1">
                Site web <span className="font-bold">offert</span> <span className="text-sm">(valeur 1500€)</span>
              </p>
              <p className="text-black text-sm ipromax:text-lg">
                Augmentation <span className="font-bold">Avis Google</span>
              </p>
              <p className="text-black text-sm ipromax:text-lg">
                Partage du menu entre amis
              </p>
            </div>
            <div className="bg-card-gold rounded-2xl px-2 py-2 ipromax:px-4 ipromax:py-3 mt-4 shadow-2xl shadow-white">
              <p className="text-black text-sm ipromax:text-lg font-extrabold">
                Bonus Gold
              </p>
              <p className="text-black text-xs ipromax:text-sm md:text-lg mt-1 hidden md:block">
                Plan Chef Cuisto <span className="font-bold">offert À VIE</span> dès sortie ➡️
              </p>
              <p className="text-black text-xs ipromax:text-sm md:text-lg mt-1 block md:hidden">
                Plan Chef Cuisto <span className="font-bold">offert À VIE</span> dès sortie ⬇️
              </p>
              <p className="text-black text-xs ipromax:text-sm md:text-lg">
                Mises à jour des fonctionnalités <span className="font-bold">illimitées</span>
              </p>
              <p className="text-black tracking-tight md:tracking-normal text-xs ipromax:text-lg drop-shadow-lg font-black text-center mt-2">
                DERNIÈRE CHANCE AVANT 120€
              </p>
            </div>
          </div>
        </div>
      );

    case "chef":
      return (
        <div className="relative shadow-lg rounded-2xl h-fit w-full border overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-overlay-background">
            <div className="bg-primary shadow-lg w-fit absolute right-4 top-20 ipromax:top-24 md:top-24 flex flex-col items-center justify-center px-2 py-2 ipromax:px-3 ipromax:py-2 rounded-xl ipromax:rounded-2xl">
              <p className="text-white text-[10px] ipromax:text-base md:text-xl font-black tracking-tight drop-shadow-lg">BIENTÔT</p>
              <p className="text-white text-[10px] ipromax:text-base md:text-xl font-black tracking-tight drop-shadow-lg">DISPONIBLE</p>
            </div>
          </div>
          <div className="flex items-end justify-between pr-3">
            <img src="/assets/images/pricing/chef_cuisto.png" className="w-[75px] ipromax:w-[90px]" />
            <div>
              <p className="text-4xl ipromax:text-5xl font-black text-right">
                120€
                <span className="text-sm ipromax:text-lg font-normal text-slate-500">
                  /mois
                </span>
              </p>
              <p className="text-xs text-slate-500 text-right">Facturé mensuellement HT</p>
            </div>
          </div>
          <p className="text-2xl ipromax:text-3xl font-bold pl-3">Chef cuisto</p>
          <div className="px-5 pt-4 pb-7">
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/check.png"
                className="w-[18px] h-[15px] ipromax:w-[22px] ipromax:h-[18px]"
              />
              <p className="text-primary text-sm ipromax:text-lg ml-2">3 catégories maximum</p>
            </div>
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/check.png"
                className="w-[18px] h-[15px] ipromax:w-[22px] ipromax:h-[18px]"
              />
              <p className="text-primary text-sm ipromax:text-lg ml-2">5 élements maximum</p>
            </div>
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/check.png"
                className="w-[18px] h-[15px] ipromax:w-[22px] ipromax:h-[18px]"
              />
              <p className="text-primary text-sm ipromax:text-lg ml-2">
                Traduction uniquement en anglais
              </p>
            </div>
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/check.png"
                className="w-[18px] h-[15px] ipromax:w-[22px] ipromax:h-[18px]"
              />
              <p className="text-primary text-sm ipromax:text-lg ml-2">
                Ajout des photos des plats
              </p>
            </div>
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/check.png"
                className="w-[18px] h-[15px] ipromax:w-[22px] ipromax:h-[18px]"
              />
              <p className="text-primary text-sm ipromax:text-lg ml-2">
                Mises à jour du menu illimitées
              </p>
            </div>
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/check.png"
                className="w-[18px] ipromax:w-[22px]"
              />
              <p className="text-sm ipromax:text-lg ml-2 text-primary">
                Suivi analytique du nombre de scan
              </p>
            </div>
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/check.png"
                className="w-[18px] ipromax:w-[22px]"
              />
              <p className="text-sm ipromax:text-lg ml-2 text-primary">
                Menu dynamique selon horaire
              </p>
            </div>
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/check.png"
                className="w-[18px] ipromax:w-[22px]"
              />
              <p className="text-sm ipromax:text-lg ml-2 text-primary">
                Prise de commandes en ligne
              </p>
            </div>
            <div className="flex items-center">
              <img
                src="/assets/images/pricing/check.png"
                className="w-[18px] ipromax:w-[22px]"
              />
              <p className="text-sm ipromax:text-lg ml-2 text-primary">
                Avis clients sur les différents plats
              </p>
            </div>
            <p className="text-sm ipromax:text-lg mt-3 font-extrabold">
              Bonus
            </p>
            <p className="text-sm ipromax:text-lg">
              Site web <span className="font-bold">offert</span> <span className="text-xs ipromax:text-sm">(valeur 1500€)</span>
            </p>
            <p className="text-sm ipromax:text-lg">
              Augmentation <span className="font-bold">Avis Google</span>
            </p>
            <p className="text-sm ipromax:text-lg">
              Partage du menu entre amis
            </p>
            <p className="text-sm ipromax:text-lg">
              30 autocollants <span className="font-bold">offerts</span> <span className="text-xs ipromax:text-sm">(valeur 300€)</span>
            </p>
          </div>
        </div>
      );

    default:
      return null;
  }
};
