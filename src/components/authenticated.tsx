import Link from "next/link";
import { useUserContext } from "@/context/user";
import { useRouter } from "next/router";
import { NavUser } from "./nav-user";

export default function Authenticated({ children }) {
    const { initializing, user } = useUserContext()
    const router = useRouter()
    
    if (initializing) {
        return (
            // <div className="w-screen h-screen flex flex-col justify-center items-center">
            //     <img src="/assets/images/logo/logo.png" className="h-12 object-contain mb-2" />
            //     <p>Chargement en cours...</p>
            // </div>
            <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-[#fffafc]">
                <img src="/assets/images/loader.gif" className="h-30 object-contain mb-2" />
            </div>
        )
    }

    if (user === null) {
        router.push('/login')
    }

    return (
        <>
            {user !== null ? (
                children
            ) : null}
        </>
    )
};
