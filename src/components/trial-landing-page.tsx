'use client'

import { languagesDisplay } from "@/lib/languages";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Command, CommandGroup, CommandItem } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

function TrialLandingPageComponent() {
    const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))


    const PreviewBanner = () => {
        let imageLink = "/assets/images/marketing_offer.png";

        return (
            <img src={imageLink} alt="marketingOffer" className="w-full h-[80px] object-cover" />
        );
    }

    const PreviewLogo = () => {
        let imageLink = "/assets/images/logo.png";

        return (
            <img src={imageLink} alt="language" className="object-cover w-5" style={{ width: `${33}%` }} />
        );
    }

    const languages = ["fr", "es", "ar"]

    useEffect(() => {
        setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
        }, 1000);
    }, [])

    return (
        <div className="md:hidden w-[90vw] p-2 bg-white flex justify-between space-x-2">
            <div className="flex-1">
                <div className="flex flex-col space-y-2">
                    <div className="w-full h-14 rounded bg-yellow-400"></div>
                    <div className="w-full h-14 rounded bg-slate-400"></div>
                    <div className="w-full h-14 rounded bg-purple-400"></div>
                </div>
                <img src="/assets/images/sticker.png" className="object-cover object-right-bottom h-32" />
            </div>
            <div className="flex-1 flex justify-center">
                <div className="device w-full">
                    <div className="device-frame">
                        {/* <img className="device-screen" src="..." /> */}
                        <div className="w-full h-full bg-white rounded-[16px] border overflow-hidden">
                            <div className="flex w-full h-[1.3rem] bg-slate-100 items-center justify-between">
                                <p className="text-[8px] pl-4">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                <div className="flex items-center pr-3 gap-x-1">
                                    <img src="/assets/images/network.png" alt="network" className="w-[0.5rem] h-[0.5rem] object-cover" />
                                    <img src="/assets/images/wifi.png" alt="wifi" className="w-[0.5rem] h-[0.5rem] object-cover" />
                                    <img src="/assets/images/battery.png" alt="battery" className="w-[0.6rem] h-[0.6rem] object-cover" />
                                </div>
                            </div>
                            <div className="text-[9px]">
                                <div>
                                    <div className="flex justify-between py-1 pl-2 pr-3">
                                        <div className="flex items-center gap-x-0.5">
                                            <PreviewLogo />
                                            <p className="text-[10px] font-bold">Mon restaurant</p>
                                        </div>
                                        <Popover open>
                                            <PopoverTrigger asChild>
                                                <div className="flex items-center">
                                                    <p className="text-[8px]">{languagesDisplay("fr")?.label}</p>
                                                    <img src={languagesDisplay("fr")?.imageUrl} className="w-5 h-2 ml-0.5" />
                                                </div>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-fit p-0">
                                                <Command>
                                                    <CommandGroup>
                                                        {languages?.map((language) => (
                                                            <CommandItem
                                                                key={language}
                                                                value={language}
                                                                className="text-[8px] p-0.5"
                                                            >
                                                                <p className="text-[8px]">{language?.toUpperCase()}</p>
                                                                <img src={languagesDisplay(language)?.imageUrl} className="w-3 ml-1" />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    <PreviewBanner />
                                </div>
                                <div className="flex px-3 py-3 gap-y-2 blur-sm">
                                    <Button className="text-[8px] px-1 h-2" variant="outline">Tout</Button>
                                    <Button className="text-[8px] px-1 h-2" variant="outline">Entrée</Button>
                                    <Button className="text-[8px] px-1 h-2" variant="outline">Plat</Button>
                                    <Button className="text-[8px] px-1 h-2" variant="outline">Dessert</Button>
                                </div>
                                <div className="flex flex-col px-3 gap-y-2 blur-sm">
                                    <Card className="overflow-hidden p-0">
                                        <img src="/assets/images/pates_saumon.png" alt="imagePlat" className="w-full h-[70px] object-cover" />
                                        <div className="px-2 py-1">
                                            <div className="flex justify-between">
                                                <p className="font-semibold text-[10px]">Pâtes au saumon</p>
                                                <p className="font-semibold text-[10px]">13.00 €</p>
                                            </div>
                                            <p className="text-[8px] leading-3 text-gray-500">Des pâtes al dente avec saumon frais et sauce crème onctueuse, relevées de fines herbes.</p>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="device-stripe"></div>
                    <div className="device-header"></div>
                    <div className="device-sensors"></div>
                    <div className="device-btns"></div>
                    <div className="device-power"></div>
                </div>
            </div>
        </div>
    )
}


const TrialLandingPage = dynamic(() => Promise.resolve(TrialLandingPageComponent), {
    ssr: false,
});

export default TrialLandingPage;