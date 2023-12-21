import { useEffect } from "react";
import { useUserContext } from "@/context/user";

export default function Logout() {
    const { logout } = useUserContext();

    useEffect(() => {
        logout()
    }, []);

    return null
};