import Link from "next/link";
import { useUserContext } from "@/context/user";
import { useRouter } from "next/router";
import { NavUser } from "./nav-user";
import { Button } from "./ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { EyeOpenIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const Nav = () => {
    const { user } = useUserContext();
    const router = useRouter();
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)

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
            <nav className="bg-white p-2 mt-0 w-full fixed z-30 top-0 shadow">
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
                            <Link href={`/admin/restaurant`} legacyBehavior>
                                <Button className="p-2 h-fit md:px-4 md:py-2" variant="ghost">Aller au Dashboard</Button>
                            </Link>
                        )}

                        {!!user && (
                            <Link href={`/logout`} legacyBehavior>
                                <Button className="p-2 h-fit md:px-4 md:py-2" variant="ghost">Se déconnecter</Button>
                            </Link>
                        )}

                        {!!!user ? (
                            <Link href={`/login`} legacyBehavior>
                                <Button variant="ghost">Se connecter</Button>
                            </Link>
                        ) : null}

                        {!!!user ? (
                            <Link href={`/register`} legacyBehavior>
                                <a className="text-white p-2 rounded-lg md:rounded-xl text-xs font-extrabold shadow bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 hover:scale-105 transform transition duration-150">
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
            <nav className="bg-white p-2 mt-0 w-full fixed z-30 top-0 shadow">
                <div className="md:container mx-auto flex flex-wrap items-center justify-between md:justify-start">
                    <div className="flex justify-start text-white font-extrabold">
                        <Link href={`/admin/restaurant`} legacyBehavior>
                            <a className="text-white no-underline hover:text-white hover:no-underline">
                                <img src="/assets/images/logo/logo.png" className=" h-8 md:h-12 object-contain" />
                            </a>
                        </Link>
                    </div>

                    {/* DRAWER */}
                    <div className="flex md:hidden items-center space-x-2">
                        <Button className="bg-[#5050EA]/10 border-[#5050EA] text-primary border-[1px] font-bold text-xs px-2 py-1.5 h-fit hover:bg-[#5050EA]/10 hover:shadow-black/40" onClick={() => router.push('/admin/account/subscription')}>✨ Mettre à niveau</Button>
                        <Button variant="outline" size="icon" onClick={() => router.push(`/restaurant/${user?.id}/menu?edition=1`)}>
                            <EyeOpenIcon className="h-4 w-4" />
                        </Button>
                        <Drawer open={isOpenDrawer} onOpenChange={(isOp) => {
                            if (isOp === true) return;
                            setIsOpenDrawer(false);
                        }}>
                            <DrawerTrigger className="md:hidden">
                                <Button variant="outline" size="icon" onClick={() => setIsOpenDrawer(true)}>
                                    <HamburgerMenuIcon className="h-4 w-4" />
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent className="z-50">
                                <DrawerFooter>
                                    <div className="flex flex-col space-y-1">
                                        <div className="flex justify-between items-center mb-3">
                                            <p className="font-bold">{user?.name}</p>
                                            <div className="flex items-center space-x-3">
                                                <Button className="bg-[#5050EA]/10 border-[#5050EA] text-primary border-[1px] font-bold text-xs px-2 py-1.5 h-fit hover:bg-[#5050EA]/10 hover:shadow-black/40" onClick={() => router.push('/admin/account/subscription')}>✨ Mettre à niveau</Button>
                                                {!!user && (
                                                    <NavUser onClickItem={() => setIsOpenDrawer(false)} />
                                                )}
                                            </div>
                                        </div>

                                        {!!user && (
                                            <Link href={`/admin/restaurant`} legacyBehavior>
                                                <Button variant={isActive(`/admin/restaurant`) ? "default" : "ghost"} onClick={() => setIsOpenDrawer(false)}>Mon restaurant</Button>
                                            </Link>
                                        )}

                                        {!!user && (
                                            <Link href={`/admin/manage-menu`} legacyBehavior>
                                                <Button variant={isActive(`/admin/manage-menu`) ? "default" : "ghost"} onClick={() => setIsOpenDrawer(false)}>Gestion du Menu</Button>
                                            </Link>
                                        )}

                                        {!!user && (
                                            <Link href={`/admin/website`} legacyBehavior>
                                                <Button variant={isActive(`/admin/website`) ? "default" : "ghost"} onClick={() => setIsOpenDrawer(false)}>Site Web</Button>
                                            </Link>
                                        )}

                                        {!!user && (
                                            <Link href={`/admin/qr-code`} legacyBehavior>
                                                <Button variant={isActive(`/admin/qr-code`) ? "default" : "ghost"} onClick={() => setIsOpenDrawer(false)}>Mes QR Code</Button>
                                            </Link>
                                        )}
                                    </div>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </div>

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

                            {!!user && (
                                <Link href={`/admin/website`} legacyBehavior>
                                    <Button variant={isActive(`/admin/website`) ? "default" : "ghost"}>Site Web</Button>
                                </Link>
                            )}

                            {!!user && (
                                <Link href={`/admin/qr-code`} legacyBehavior>
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
                            <Button className="bg-[#5050EA]/10 border-[#5050EA] text-primary border-[1px] font-bold text-xs px-2 py-1.5 h-fit hover:bg-[#5050EA]/10 hover:shadow-black/40" onClick={() => router.push('/admin/account/subscription')}>✨ Mettre à niveau</Button>
                            {!!user && (
                                <NavUser />
                            )}
                        </div>
                    </div>
                </div>
            </nav>


        );
    }
};

export default Nav;
