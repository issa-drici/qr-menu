// import { useEffect } from "react";
// import { useUserContext } from "@/context/user";

// export default function Login() {
//     const { login } = useUserContext();

//     useEffect(() => {
//         login()
//     }, []);

//     return (
//         <div className="w-screen h-screen bg-gray-800 flex justify-center items-center">
//             <p>Connexion en cours</p>
//         </div>
//     );
// };



import Link from "next/link"

import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Database } from "@/types/database.types"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"
import FieldInput from "@/components/field-input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"
import { ChevronLeftIcon } from "@radix-ui/react-icons"


const FormSchema = z.object({
    email: z.string(),
    password: z.string().min(6, "Message"),
})

export default function RegisterPage() {
    const supabaseClient = useSupabaseClient<Database>();
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })


    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const { email, password } = data

            const { data: dataSignin, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password,
            })

            if (dataSignin?.user) {
                router.push(`/restaurant/${dataSignin?.user?.id}/admin/restaurant`)
            }

        } catch (error) {
            console.error('Erreur:', error);
            toast({ title: 'Erreur', description: "Un problème est survenu lors de l'inscription.", variant: "destructive" });
        }
    }

    return (
        <div className="flex w-screen h-screen bg-white p-5 gap-x-5">
            <div className="flex flex-col w-full">
                <a onClick={() => router.back()} className="text-slate-800 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium mt-7 w-fit cursor-pointer flex items-center"><ChevronLeftIcon className="mr-1 h-4 w-4" />Retour</a>
                <div className="flex flex-col justify-center items-center h-full translate-y-[-4rem] px-20 max-w-lg m-auto" >
                    <img src="/assets/images/logo/logo_full.png" className="h-12 object-contain mb-2" />
                    <p className="text-center text-2xl font-semibold mb-3">Content de te revoir</p>
                    <p className="text-slate-400 text-sm mb-7 text-center">Entre ton adresse e-mail ci-dessous pour te connecter à ton compte</p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2 flex flex-col">
                            <FieldInput form={form} name="email" placeholder="hello@gmail.com" />
                            <FieldInput form={form} name="password" placeholder="Mot de passe" type="password" />
                            <Button type="submit">Se connecter</Button>
                        </form>
                    </Form>
                    <Link href={`/register`} legacyBehavior>
                        <a className="mt-5 text-center text-slate-400 text-sm underline cursor-pointer">Tu n&apos;as pas de compte ? Inscris-toi.</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}