import Link from "next/link";
import { useUserContext } from "@/context/user";
import { useRouter } from "next/router";
import { NavUser } from "./nav-user";

const Nav = () => {
    const { user } = useUserContext();
    const router = useRouter();

    const isActive = (pathname) => router.pathname === pathname;

    const restaurantId = 'issddfsdf-2332432df-32dfgsdzdqds'

    return (
        <nav className="bg-gray-800 p-2 mt-0 w-full">
            <div className="container mx-auto flex flex-wrap items-center">
                <div className="flex w-1/2 justify-start text-white font-extrabold">
                    <a href="#" className="text-white no-underline hover:text-white hover:no-underline">
                        <span className="text-2xl pl-2"><i className="em em-grinning"></i>Culinov</span>
                    </a>
                </div>
                <div className="flex w-1/2 justify-end content-center">
                    {!!user && (
                        <Link href={`/restaurant/${restaurantId}/admin/restaurant`} legacyBehavior>
                            <a className={isActive(`/restaurant/[restaurantId]/admin/restaurant`) ? "text-white px-3 py-2 rounded-md text-sm font-medium": "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Restaurant</a>
                        </Link>
                    )}

                    <Link href={`/restaurant/${restaurantId}/admin/restaurant`} legacyBehavior>
                        <a className={isActive(`/restaurant/[restaurantId]/admin/restaurant`) ? "text-white px-3 py-2 rounded-md text-sm font-medium": "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Informations du Restaurant</a>
                    </Link>

                    <Link href={`/restaurant/${restaurantId}/admin/category`} legacyBehavior>
                        <a className={isActive(`/restaurant/[restaurantId]/admin/category`) ? "text-white px-3 py-2 rounded-md text-sm font-medium": "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Sections du Menu</a>
                    </Link>

                    <Link href={`/restaurant/${restaurantId}/admin/items`} legacyBehavior>
                        <a className={isActive(`/restaurant/[restaurantId]/admin/items`) ? "text-white px-3 py-2 rounded-md text-sm font-medium": "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Articles du Menu</a>
                    </Link>
                    <NavUser />
                </div>
            </div>
        </nav>


    );
};

export default Nav;
