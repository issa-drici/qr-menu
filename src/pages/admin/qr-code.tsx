// @ts-ignore
'use client'

import dynamic from "next/dynamic"
import React from "react"
import Layout from "@/layout/layout"
import { useUserContext } from "@/context/user"
import { useRouter } from "next/router"


function QrCodeComponent() {
    const { user } = useUserContext();
    const router = useRouter()

   
    return (
        <Layout isLoading={false} withAuth>
            <p>Qr Code</p>
        </Layout>
    )
}

const QrCode = dynamic(() => Promise.resolve(QrCodeComponent), {
    ssr: false,
});

export default QrCode;


