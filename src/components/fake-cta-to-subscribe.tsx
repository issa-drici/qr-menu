import Link from "next/link";
import { useUserContext } from "@/context/user";
import { useRouter } from "next/router";
import { NavUser } from "./nav-user";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const FakeCtaToSubscribe = () => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <a className="cursor-pointer text-white p-2 ipromax:p-3 rounded-lg md:rounded-xl text-xs ipromax:text-sm font-bold shadow bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 hover:scale-105 transform transition duration-150 mt-3 md:mt-6">
                    Essai <span className="italic">GRATUIT</span>
                </a>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    {/* <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription> */}
                </DialogHeader>
                <div className="flex flex-col py-4 gap-3">
                        <Input id="name" value="Pedro Duarte" className="w-full" />
                    <Button type="submit" className="w-full">Save changes</Button>

                </div>
            </DialogContent>
        </Dialog>
    )
};

export default FakeCtaToSubscribe;
