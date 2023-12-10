import Link from "next/link";
import { useUserContext } from "@/context/user";

const Nav = () => {
    const { user } = useUserContext();

    const restaurantId = 'issddfsdf-2332432df-32dfgsdzdqds'

    return (
        <nav className="flex py-4 px-6 border-b border-gray-200">
            {/* <Link href="/">
                Home
            </Link> */}
            {!!user && (
                <Link href={`/restaurant/${restaurantId}/admin/restaurant`} legacyBehavior>
                    <a className="ml-2">Restaurant</a>
                </Link>
            )}

            <Link href={`/restaurant/${restaurantId}/admin/restaurant`} legacyBehavior>
                <a className="ml-2">Restaurant</a>
            </Link>

            <Link href={`/restaurant/${restaurantId}/admin/category`} legacyBehavior>
                <a className="ml-2">Catégorie</a>
            </Link>

            {/*  <Link href={`/restaurant/${restaurantId}/admin/menu`} legacyBehavior>
                <a className="ml-2">Menu</a>
            </Link>
            <Link href={user ? "/logout" : "/login"} legacyBehavior>
                <a className="ml-auto">{user ? "Logout" : "Login"}</a>
            </Link> */}
        </nav>
    );
};

export default Nav;