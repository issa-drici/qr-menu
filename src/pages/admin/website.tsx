// @ts-ignore
'use client'

import Phone from "@/components/phone"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import FieldInput from "@/components/field-input"
import FieldCheckbox from "@/components/field-checkbox"
import dynamic from "next/dynamic"
import React from "react"
import FieldSimpleCheckbox from "@/components/field-simple-checkbox"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { languagesDisplay } from "@/lib/languages"
import Layout from "@/layout/layout"
import { useUserContext } from "@/context/user"
import { useRouter } from "next/router"
import Dropzone from "@/components/dropzone"


export default function Website() {
    const { user } = useUserContext();
    const router = useRouter()

   
    return (
        <Layout isLoading={false} withAuth>
            <p>Website</p>
        </Layout>
    )
}


