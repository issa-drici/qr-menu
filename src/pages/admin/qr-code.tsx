"use client";

import Layout from "@/layout/layout";
import Category from "@/components/category";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { Pencil, Plus, RefreshCcw, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useLoadingContext } from "@/context/loading";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import DialogAddCategory from "@/components/dialog/dialog-add-category";
import DialogEditCategory from "@/components/dialog/dialog-edit-category";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Le nom doit contenir minimum 2 caractères.",
    })
});

export default function QrCodePage({ user }) {
    const router = useRouter()
    const { pushWithLoading, setIsLoadingApp } = useLoadingContext()

    const supabaseClient = useSupabaseClient<Database>();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    // const [categories, setCategories] = useState(category);

    const handleGenerate = async () => {
        try {
            const response = await fetch('/api/generate-qr-codes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ numOfCodes: 4 }),
            });

            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `qrcodes.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error generating QR codes:', error);
        }
    };



    return (
        <Layout withAuth fullHeight>
            <div className="pb-3 flex items-center">
                <Breadcrumb >
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="cursor-pointer" onClick={() => pushWithLoading('/admin')}>Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Qr Code</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div>
                <h1 className="text-xl font-semibold">Génerez votre QR Code</h1>

                <p className="text-xs mt-1 mb-4 text-slate-400">Selectionnez le nombre de QR Code que vous voulez.<br /> Chaque QR code est unique et est attribué à une table, nous intégrerons par la suite la commande à table.</p>

                <Button onClick={handleGenerate}>Générer</Button>


                <div className="w-96 border mt-10">
                    <div className="w-full h-full p-5 flex flex-col justify-center items-center">
                        <p className="font-bold uppercase">Table 1</p>
                        {/*  QRCode, garder seulement le css et remplacer la div par le qr code */} <div className="w-full aspect-square my-5" />
                        <p className="text-3xl font-bold">Scannez notre menu</p>
                    </div>
                </div>
            </div>

        </Layout>
    );
}


export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

    // Create authenticated Supabase Client
    const supabaseServerClient = createServerSupabaseClient<Database>(ctx);

    // Check if we have a session
    const {
        data: { session },
    } = await supabaseServerClient.auth.getSession();

    const { data: category } = await supabaseServerClient
        .from("category")
        .select("*")
        .eq("profile_id", session?.user?.id)
        .order('order', { ascending: true });

    const { data: item } = await supabaseServerClient
        .from("items")
        .select("*")
        .eq("profile_id", session?.user?.id);

    if (!session) {
        return {
            props: {
                category: [],
                item: []
            },
        }
    }

    return {
        props: {
            category,
            item,
            initialSession: session,
            user: session.user,
        },
    };
};