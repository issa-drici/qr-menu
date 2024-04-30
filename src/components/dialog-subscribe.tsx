import Link from "next/link";
import { useUserContext } from "@/context/user";
import { useRouter } from "next/router";
import { NavUser } from "./nav-user";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/types/database.types";
import { useState } from "react";
import {
    Form
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FieldInput from "./field-input";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
    email: z.string()
        .min(1, { message: "Ce champ doit être renseigné." })
        .email("Ceci n'est pas un email valide."),
    name: z.string()
        .min(1, { message: "Ce champ doit être renseigné." })
});

const DialogSubscribe = ({ open = false, setOpen, buttonId, setButtonId }) => {
    const [isLoading, setIsloading] = useState(false);

    const supabaseClient = useSupabaseClient<Database>();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });



    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            setIsloading(true);

            const { data: dataUpdated, error } = await supabaseClient
                .from("presale_emails")
                .insert({ ...data, button_id: buttonId });


        } catch (error) {
            console.error("Erreur:", error);
            toast({
                title: "Erreur",
                description:
                    "Un problème est survenu lors de l'inscription.",
                variant: "destructive",
            });
        }

        setIsloading(false);
        setOpen(false)
        setButtonId(null)
        form.reset()
    }

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! RETIRER LE FOCUS SUR LE CHAMP DANS LA DIALOG EN MOBILE


    return (
        <Dialog open={open} onOpenChange={(isOp) => {
            if (isOp === true) return;
            setOpen(false);
            setButtonId(null)
            form.reset()
        }}>
            <DialogContent className="p-0 overflow-hidden rounded-lg flex flex-col md:flex-row gap-0 max-w-[300px] md:max-w-none md:w-fit" withoutButtonClose onInteractOutside={(e) => e.preventDefault()}
            >
                <img src="/assets/images/newsletter_img.png" className="w-full md:w-60" />
                <div className="flex flex-col items-center justify-center py-5 px-3 md:px-10 text-center md:w-[650px]">
                    <DialogTitle className="mb-3">Profitez de 50% de réduction dès sa sortie !</DialogTitle>
                    <DialogDescription className="mb-1">Eats&apos;up sera disponible la semaine prochaine ⏱️</DialogDescription>
                    <DialogDescription>Entrez votre email pour un accès anticipé à un prix (plus que) réduit 🎁</DialogDescription>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col pt-4 pb-1 gap-2 w-full"
                        >

                            <FieldInput
                                form={form}
                                name="email"
                                type="email"
                                placeholder="johndoe@mail.com"
                            />
                            <FieldInput
                                form={form}
                                name="name"
                                placeholder="Nom du restaurant"
                            />
                            <Button type="submit" className="bg-black hover:bg-slate-900 mt-1" disabled={isLoading} >Je veux être un VIP à petit prix</Button>
                        </form>
                    </Form>
                    <DialogClose asChild onClick={() => {
                        setOpen(false)
                        setButtonId(null)
                        form.reset()
                    }}>
                        <p className="cursor-pointer text-gray-400 hover:text-gray-500 text-xs">Non, je souhaite payer le prix complet à sa sortie</p>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
};

export default DialogSubscribe;
