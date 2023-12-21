import Link from "next/link";
import { useUserContext } from "@/context/user";
import { useRouter } from "next/router";
import { NavUser } from "./nav-user";

const Nav = () => {
    const { user } = useUserContext();
    const router = useRouter();

    const isActive = (pathname) => router.pathname === pathname;

    const restaurantId = user?.id

    const hideNav = isActive('/register') || isActive('/login')

    if (hideNav) {
        return null
    }

    if (!!user) {
        return (
            <nav className="bg-gray-800 p-2 mt-0 w-full absolute top-0 z-10">
                <div className="container mx-auto flex flex-wrap items-center">
                    <div className="flex w-1/2 justify-start text-white font-extrabold">
                        <Link href={`/restaurant/${restaurantId}/admin/restaurant`} legacyBehavior>
                            <a className="text-white no-underline hover:text-white hover:no-underline">
                                <img src="/assets/images/logo/logo_full.png" className="h-12 object-contain mb-2" />
                            </a>
                        </Link>
                    </div>
                    <div className="flex w-1/2 justify-end content-center">

                        {!!user && (
                            <Link href={`/restaurant/${restaurantId}/admin/restaurant`} legacyBehavior>
                                <a className={isActive(`/restaurant/[restaurantId]/admin/restaurant`) ? "text-white px-3 py-2 rounded-md text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Informations du Restaurant</a>
                            </Link>
                        )}

                        {!!user && (
                            <Link href={`/restaurant/${restaurantId}/admin/category`} legacyBehavior>
                                <a className={isActive(`/restaurant/[restaurantId]/admin/category`) ? "text-white px-3 py-2 rounded-md text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Sections du Menu</a>
                            </Link>
                        )}

                        {!!user && (
                            <Link href={`/restaurant/${restaurantId}/admin/items`} legacyBehavior>
                                <a className={isActive(`/restaurant/[restaurantId]/admin/items`) ? "text-white px-3 py-2 rounded-md text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Articles du Menu</a>
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

    return (
        <nav className="p-2 mt-0 w-full absolute top-0 z-10 border-b-2">
            <div className="container mx-auto flex flex-wrap items-center">
                <div className="flex w-1/2 justify-start text-white font-extrabold">
                    <Link href={`/`} legacyBehavior>
                        <a className="text-white no-underline hover:text-white hover:no-underline">
                            <img src="/assets/images/logo/logo_full.png" className="h-12 object-contain mb-2" />
                        </a>
                    </Link>
                </div>
                <div className="flex w-1/2 justify-end content-center">
                    <Link href={`/login`} legacyBehavior>
                        <a className={isActive(`/restaurant/[restaurantId]/admin/items`) ? "text-white px-3 py-2 rounded-md text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Se connecter</a>
                    </Link>
                </div>
            </div>
        </nav>


    );
};

export default Nav;
