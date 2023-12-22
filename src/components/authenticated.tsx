import Link from "next/link";
import { useUserContext } from "@/context/user";
import { useRouter } from "next/router";
import { NavUser } from "./nav-user";

export default function Authenticated({ children }) {
    const { initializing, user } = useUserContext()
    const router = useRouter()

    console.log(router)


    if (initializing) {
        return (
            <div className="w-screen h-screen flex flex-col justify-center items-center">
                <img src="/assets/images/logo/logo_full.png" className="h-12 object-contain mb-2" />
                <p>Chargement en cours...</p>
            </div>)
    }


    if (user === null) {
        router.push('/')
    }

    if (router?.query?.restaurantId !== user?.id) {
        router.push('/')
    }

    return (
        <>
            {user !== null ? (
                children
            ) : null}
        </>
    )
};
