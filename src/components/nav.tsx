import Link from "next/link";
import { useUserContext } from "@/context/user";
import { useRouter } from "next/router";
import { NavUser } from "./nav-user";

const Nav = () => {
    const { user } = useUserContext();
    const router = useRouter();

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
                <div className="md:container mx-auto flex flex-wrap items-center">
                    <div className="flex w-1/2 justify-start text-white font-extrabold">
                        <Link href={`/`} legacyBehavior>
                            <a className="text-white no-underline hover:text-white hover:no-underline">
                                <img src="/assets/images/logo/logo.png" className=" h-8 md:h-12 object-contain" />
                            </a>
                        </Link>
                    </div>
                    <div className="flex w-1/2 justify-end items-center">
                        {!!user ? (
                            <Link href={`/restaurant/${restaurantId}/admin/restaurant`} legacyBehavior>
                                <a className="hidden md:block text-slate-700 hover:text-yellow-500 px-3 py-2 rounded-md text-md font-medium">Aller au Dashboard</a>
                            </Link>
                        ) : null}
                        {!!user ? (
                            <Link href={`/logout`} legacyBehavior>
                                <a className="hidden md:block text-slate-700 hover:text-yellow-500 px-3 py-2 rounded-md text-md font-medium" >Se déconnecter</a>
                            </Link>
                        ) : null}
                        {!!!user ? (
                            <Link href={`/login`} legacyBehavior>
                                <a className="hidden md:block text-slate-700 hover:text-yellow-500 px-3 py-2 rounded-md text-md font-medium">Se connecter</a>
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
                <div className="md:container mx-auto flex flex-wrap items-center">
                    <div className="flex w-1/2 justify-start text-white font-extrabold">
                        <Link href={`/restaurant/${restaurantId}/admin/restaurant`} legacyBehavior>
                            <a className="text-white no-underline hover:text-white hover:no-underline">
                                <img src="/assets/images/logo/logo.png" className=" h-8 md:h-12 object-contain" />
                            </a>
                        </Link>
                    </div>
                    <div className="flex w-1/2 justify-end content-center">

                        {!!user && (
                            <Link href={`/restaurant/${restaurantId}/admin/restaurant`} legacyBehavior>
                                <a className={isActive(`/restaurant/[restaurantId]/admin/restaurant`) ? "text-slate-700 px-3 py-2 rounded-md text-sm font-medium" : "text-slate-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Informations du Restaurant</a>
                            </Link>
                        )}

                        {!!user && (
                            <Link href={`/restaurant/${restaurantId}/admin/category`} legacyBehavior>
                                <a className={isActive(`/restaurant/[restaurantId]/admin/category`) ? "text-slate-700 px-3 py-2 rounded-md text-sm font-medium" : "text-slate-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Sections du Menu</a>
                            </Link>
                        )}

                        {!!user && (
                            <Link href={`/restaurant/${restaurantId}/admin/items`} legacyBehavior>
                                <a className={isActive(`/restaurant/[restaurantId]/admin/items`) ? "text-slate-700 px-3 py-2 rounded-md text-sm font-medium" : "text-slate-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Articles du Menu</a>
                            </Link>
                        )}

                        {!!user && (
                            <NavUser />
                        )}
                    </div>
                </div>
            </nav>


        );
    }
};

export default Nav;
