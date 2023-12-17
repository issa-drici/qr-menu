import { useEffect } from "react";
import { useUserContext } from "@/context/user";

export default function Login() {
    const { login } = useUserContext();

    useEffect(() => {
        login()
    }, []);

    return (
        <div className="w-screen h-screen bg-gray-800 flex justify-center items-center">
            <p>Connexion en cours</p>
        </div>
    );
};
