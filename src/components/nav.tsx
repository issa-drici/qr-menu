import Link from "next/link";
import { useUserContext } from "@/context/user";
import { useRouter } from "next/router";
import { NavUser } from "./nav-user";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { AlignRight, ChefHat, Copy, Cross, Home, LogOut, MessageCircleQuestion, QrCode, Settings, User, X } from "lucide-react";
import { useLoadingContext } from "@/context/loading";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const Nav = () => {
    const { user } = useUserContext();
    const router = useRouter();
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [isOpenTooltipCopy, setIsOpenTooltipCopy] = useState(false)

    const { logout } = useUserContext();
    const { pushWithLoading } = useLoadingContext();

    const isActive = (pathname) => router.pathname === pathname;

    const restaurantId = user?.id

    const hideNav = isActive('/register')
        || isActive('/login')
        || isActive('/restaurant/[restaurantId]/menu')
        || isActive('/site/[typeRestaurant]/[cityName]/[restaurantName]')

    if (hideNav) {
        return null
    }

    if (isActive('/')) {
        return (
            <nav className="bg-white p-4 mt-0 w-full fixed z-30 top-0 shadow">
                <div className="md:container mx-auto flex items-center">
                    <div className="text-white font-extrabold">
                        <Link href={`/`} legacyBehavior>
                            <a className="text-white no-underline hover:text-white hover:no-underline">
                                <img src="/assets/images/logo/logo.png" className=" h-8 md:h-12 object-contain" />
                            </a>
                        </Link>
                    </div>
                    <div className="flex w-full justify-end items-center space-x-1">
                        {!!user && (
                            <Link href={`/admin`} legacyBehavior>
                                <Button className="p-4 h-fit md:px-4 md:py-2" variant="ghost">Aller au Dashboard</Button>
                            </Link>
                        )}

                        {!!user && (
                            <Link href={`/logout`} legacyBehavior>
                                <Button className="p-4 h-fit md:px-4 md:py-2" variant="ghost">Se déconnecter</Button>
                            </Link>
                        )}

                        {!!!user ? (
                            <Link href={`/login`} legacyBehavior>
                                <Button variant="ghost">Se connecter</Button>
                            </Link>
                        ) : null}

                        {!!!user ? (
                            <Link href={`/register`} legacyBehavior>
                                <a className="text-white p-4 rounded-lg md:rounded-xl text-xs font-extrabold shadow bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 hover:scale-105 transform transition duration-150">
                                    ✨&nbsp;Essai <span className="italic">GRATUIT</span>
                                </a>
                            </Link>
                        ) : null}
                    </div>
                </div>
            </nav>
        )
    }

    if (!!user) {
        return (
            <nav className="bg-white mt-0 w-full shadow">
                <div className="md:container mx-auto flex flex-wrap items-center justify-between md:justify-start p-3">
                    <div className="flex justify-start text-white font-extrabold">
                        <a className="text-white no-underline cursor-pointer hover:text-white hover:no-underline" onClick={() => pushWithLoading('/admin')}>
                            <img src="/assets/images/logo/logo.png" className=" h-8 md:h-12 object-contain" />
                        </a>
                    </div>

                    {isOpenMenu ? (
                        <Button variant="ghost" size="icon" className="hover:bg-transparent w-fit h-fit" onClick={() => setIsOpenMenu(false)}>
                            <X size={24} />
                        </Button>
                    ) : (
                        <Button variant="ghost" size="icon" className="hover:bg-transparent w-fit h-fit" onClick={() => setIsOpenMenu(true)}>
                            <AlignRight size={24} />
                        </Button>
                    )}

                    <div className="hidden md:flex flex-1 justify-between content-center">
                        <div className="pl-3 space-x-1">
                            {!!user && (
                                <Link href={`/admin/restaurant`} legacyBehavior>
                                    <Button variant={isActive(`/admin/restaurant`) ? "default" : "ghost"}>Mon restaurant</Button>
                                </Link>
                            )}

                            {!!user && (
                                <Link href={`/admin/manage-menu`} legacyBehavior>
                                    <Button variant={isActive(`/admin/manage-menu`) ? "default" : "ghost"}>Gestion du Menu</Button>
                                </Link>
                            )}

                            {/* {!!user && (
                                <Link href={`/admin/website`} legacyBehavior>
                                    <Button variant={isActive(`/admin/website`) ? "default" : "ghost"}>Site Web</Button>
                                </Link>
                            )} */}

                            {!!user && (
                                <Link href={`/admin/qr-code?selectedMethod=order`} legacyBehavior>
                                    <Button variant={isActive(`/admin/qr-code`) ? "default" : "ghost"}>Mes QR Code</Button>
                                </Link>
                            )}

                            {/* {!!user && (
                                <Link href={`/restaurant/${restaurantId}/admin/category`} legacyBehavior>
                                    <Button variant={isActive(`/restaurant/[restaurantId]/admin/category`) ? "default" : "ghost"}>Catégories du Menu</Button>
                                </Link>
                            )}

                            {!!user && (
                                <Link href={`/restaurant/${restaurantId}/admin/items`} legacyBehavior>
                                    <Button variant={isActive(`/restaurant/[restaurantId]/admin/items`) ? "default" : "ghost"}>Articles du Menu</Button>
                                </Link>
                            )} */}
                        </div>

                        <div className="flex items-center">
                            <Button className="bg-[#5050EA]/10 border-[#5050EA] text-primary border-[1px] font-bold text-xs px-2 py-1.5 h-fit hover:bg-[#5050EA]/10 hover:shadow-black/40" onClick={() => pushWithLoading('/admin/account/subscription')}>✨ Mettre à niveau</Button>
                            {!!user && (
                                <NavUser />
                            )}
                        </div>
                    </div>
                </div>
                <div className={cn("bg-white absolute z-20 flex flex-col max-h-screen w-full transition-all duration-500 delay-0 rounded-b-lg overflow-hidden", !isOpenMenu ? 'max-h-0' : null)}>
                    <div className="text-slate-700 text-sm font-medium">
                        <div className="flex gap-2 px-3 py-[6px] items-center cursor-pointer hover:bg-slate-50"
                            onClick={() => {
                                pushWithLoading('/admin')
                                setIsOpenMenu(false)
                            }}>
                            <Home size={16} />
                            <p>Dashboard</p>
                        </div>
                        <div className="flex gap-2 px-3 py-[6px] items-center cursor-pointer hover:bg-slate-50">
                            <User size={16} />
                            <p>Mon profil</p>
                        </div>
                        <div className="flex gap-2 px-3 py-[6px] items-center cursor-pointer hover:bg-slate-50"
                            onClick={() => {
                                pushWithLoading('/admin/categories')
                                setIsOpenMenu(false)
                            }}>
                            <ChefHat size={16} />
                            <p>Mon menu</p>
                        </div>
                        <div className="flex gap-2 px-3 py-[6px] items-center cursor-pointer hover:bg-slate-50">
                            <QrCode size={16} />
                            <p>Mon QR</p>
                        </div>
                        <TooltipProvider>
                            <Tooltip open={isOpenTooltipCopy}>
                                <TooltipTrigger asChild >
                                    <div className="flex gap-2 px-3 py-[6px] items-center cursor-pointer hover:bg-slate-50"
                                        onClick={() => {
                                            setIsOpenTooltipCopy(true)
                                            navigator.clipboard.writeText(`https://eatsup.vercel.app/restaurant/${user?.id}/menu`)
                                            setTimeout(() => {
                                                setIsOpenTooltipCopy(false)
                                                setIsOpenMenu(false)
                                            }, 2000);
                                        }}>
                                        <Copy size={16} />
                                        <p>Partager le menu</p>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Lien copié ✨</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>


                        <Separator />
                        <div className="flex gap-2 px-3 py-[6px] items-center cursor-pointer hover:bg-slate-50">
                            <Settings size={16} />
                            <p>Paramètres</p>
                        </div>
                        <div className="flex gap-2 px-3 py-[6px] items-center cursor-pointer hover:bg-slate-50"
                            onClick={() => {
                                router.push(`mailto:contact@eatsup.com?body=%0A%0A%0A%0A${user?.name}%20-%20${user?.email}`)
                                setIsOpenMenu(false)
                            }}>
                            <MessageCircleQuestion size={16} />
                            <p>Support</p>
                        </div>
                        <Separator />
                        <div className="px-3 py-[6px]">
                            <p className="font-semibold">{user?.name}</p>
                            <p className="text-slate-400 text-xs">{user?.email}</p>
                        </div>
                        <div className="flex gap-2 px-3 py-[6px] items-center cursor-pointer hover:bg-slate-50"
                            onClick={() => {
                                logout()
                                setIsOpenMenu(false)
                            }}>
                            <LogOut size={16} />
                            <p>Se déconnecter</p>
                        </div>
                    </div>
                </div>
                <div className={`absolute h-[calc(100vh_-_56px)] w-screen bg-black ${isOpenMenu ? 'opacity-80 z-10 transition-opacity duration-700' : 'opacity-0 -z-10'}`} onClick={() => setIsOpenMenu(false)}></div>

                {/* {isOpenMenu ? (
                    <div className={`absolute z-10 h-[calc(100vh_-_56px)] w-screen bg-black transition-opacity duration-700 ${isOpenMenu ? 'opacity-80' : 'opacity-0'}`} onClick={() => setIsOpenMenu(false)}></div>
                ) : null} */}
            </nav>
        );
    }
};

export default Nav;


// {/* DRAWER */}
// <div className="flex md:hidden items-center space-x-2">
// {/* <Button className="bg-[#5050EA]/10 border-[#5050EA] text-primary border-[1px] font-bold text-xs px-2 py-1.5 h-fit hover:bg-[#5050EA]/10 hover:shadow-black/40" onClick={() => pushWithLoading('/admin/account/subscription')}>✨ Mettre à niveau</Button> */}
// {/* <Button variant="outline" size="icon" onClick={() => pushWithLoading(`/restaurant/${user?.id}/menu?edition=1`)}>
//     <EyeOpenIcon className="h-4 w-4" />
// </Button> */}
// <Drawer open={isOpenDrawer} onOpenChange={(isOp) => {
//     if (isOp === true) return;
//     setIsOpenMenu(false);
// }}>
//     <DrawerTrigger className="md:hidden">
//         <Button variant="ghost" size="icon" className="hover:bg-transparent w-fit h-fit" onClick={() => setIsOpenMenu(true)}>
//             <AlignRight size={24} />
//         </Button>
//     </DrawerTrigger>
//     <DrawerContent className="z-50">
//         <DrawerFooter>
//             <div className="flex flex-col space-y-1">
//                 <div className="flex justify-between items-center mb-3">
//                     <p className="font-bold">{user?.name}</p>
//                     <div className="flex items-center space-x-3">
//                         <Button className="bg-[#5050EA]/10 border-[#5050EA] text-primary border-[1px] font-bold text-xs px-2 py-1.5 h-fit hover:bg-[#5050EA]/10 hover:shadow-black/40" onClick={() => pushWithLoading('/admin/account/subscription')}>✨ Mettre à niveau</Button>
//                         {!!user && (
//                             <NavUser onClickItem={() => setIsOpenMenu(false)} />
//                         )}
//                     </div>
//                 </div>

//                 {!!user && (
//                     <Link href={`/admin/restaurant`} legacyBehavior>
//                         <Button variant={isActive(`/admin/restaurant`) ? "default" : "ghost"} onClick={() => setIsOpenMenu(false)}>Mon restaurant</Button>
//                     </Link>
//                 )}

//                 {!!user && (
//                     <Link href={`/admin/manage-menu`} legacyBehavior>
//                         <Button variant={isActive(`/admin/manage-menu`) ? "default" : "ghost"} onClick={() => setIsOpenMenu(false)}>Gestion du Menu</Button>
//                     </Link>
//                 )}

//                 {/* {!!user && (
//                     <Link href={`/admin/website`} legacyBehavior>
//                         <Button variant={isActive(`/admin/website`) ? "default" : "ghost"} onClick={() => setIsOpenMenu(false)}>Site Web</Button>
//                     </Link>
//                 )} */}

//                 {!!user && (
//                     <Link href={`/admin/qr-code?selectedMethod=order`} legacyBehavior>
//                         <Button variant={isActive(`/admin/qr-code`) ? "default" : "ghost"} onClick={() => setIsOpenMenu(false)}>Mes QR Code</Button>
//                     </Link>
//                 )}
//             </div>
//         </DrawerFooter>
//     </DrawerContent>
// </Drawer>
// </div>