// @ts-ignore
'use client'

import dynamic from "next/dynamic"
import React, { useState } from "react"
import Layout from "@/layout/layout"
import { useUserContext } from "@/context/user"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import TableSketch from "@/components/table-sketch"
import { v4 } from "uuid"


function QrCodeComponent() {
    const { user } = useUserContext();
    const router = useRouter()
    const [tablesOrder, setTablesOrder] = useState<Array<{ id: string, createdAt?: Date } | null>>([])
    const [minTablesOrder, setMinTablesOrder] = useState(tablesOrder?.length ? tablesOrder?.length : 0)
    // const [selectedMethod, setSelectedMethod] = useState<string>("order")

    const { selectedMethod } = router?.query

    const selectMethod = (method: string) => {
        router.push(`/admin/qr-code?selectedMethod=${method}`)
    }

    const handleValueTablesOrder = (value) => {
        setTablesOrder(prev => {
            const currentValue = Number(value);
            if (currentValue < prev.length) {
                // Calculer le nombre d'éléments à supprimer
                const toKeep = currentValue;
                // Filtrer d'abord les éléments avec 'createdAt', puis ajouter les nécessaires sans 'createdAt' jusqu'à atteindre le compte désiré
                const withCreatedAt = prev.filter(item => item.createdAt);
                const withoutCreatedAt = prev.filter(item => !item.createdAt).slice(0, toKeep - withCreatedAt.length);
                return [...withCreatedAt, ...withoutCreatedAt];
            } else if (currentValue > prev.length) {
                // Ajouter des éléments pour atteindre la valeur désirée
                return [
                    ...prev,
                    ...Array.from({ length: currentValue - prev.length }, () => ({ id: v4() })),
                ];
            }
            return prev; // Si la longueur est déjà égale à 'value', ne rien faire
        });


    }

    return (
        // <Layout isLoading={false} withAuth>
        <Layout isLoading={false}>
            <div className="flex flex-col mt-8 w-full justify-center items-center">
                <div className="flex flex-col w-full h-full items-center gap-5">
                    <div className="flex gap-5">
                        <Card className={cn("h-fit cursor-pointer hover:shadow-md p-10 flex gap-5", selectedMethod === "print" ? "border border-blue-400" : null)} onClick={() => selectMethod('print')}>
                            <Image src="/assets/images/print-qr.webp" width={150} height={150} className="rounded" />
                            <div className="flex flex-col justify-center">
                                <p className="text-2xl font-normal">J&apos;imprime moi même</p>
                                <p className="text-2xl font-normal">mes QR code</p>
                            </div>
                        </Card>
                        <Card className={cn("h-fit cursor-pointer hover:shadow-md p-10 flex gap-5", selectedMethod === "order" ? "border border-blue-400" : null)} onClick={() => selectMethod('order')}>
                            <Image src="/assets/images/order_logos.png" width={150} height={150} className="rounded" />
                            <div className="flex flex-col justify-center">
                                <p className="text-2xl font-bold">Je commande mon</p>
                                <div className="flex text-2xl font-bold">pack <Image src="/assets/images/logo/logo.png" width={100} height={100} /></div>
                            </div>
                        </Card>
                    </div>

                    {selectedMethod === "print" ? (
                        <Card className="w-full h-full p-10">
                            <p>Choisir le nombre de qr code à générer</p>
                            <p>Un qr code sera attribué à une table</p>
                            <p>Ceci permettra à l&apos;avenir d&apos;ajouter la fonctionnalité de paiement en ligne</p>

                        </Card>
                    ) : null}

                    {selectedMethod === "order" ? (
                        <Card className="flex w-full h-full p-10 gap-5">
                            {/* <p>Choisir le nombre de qr code à commander</p>
                            <p>Un qr code sera attribué à une table</p>
                            <p>Ceci permettra à l&apos;avenir d&apos;ajouter la fonctionnalité de paiement en ligne</p>
                            <Input type="number" min={0} /> */}
                            <div className="flex flex-col flex-1 rounded border">
                                <div className="h-full p-5">
                                    <p>Qr Code pour les tables</p>
                                    <div className="flex">
                                        <Input type="number" min={minTablesOrder} onChange={event => handleValueTablesOrder(event.target.value)} defaultValue={tablesOrder?.length} />
                                    </div>
                                </div>
                                <Separator />
                                <div className="h-1/2 p-5 gap-x-3 gap-y-0 flex flex-wrap">
                                    {tablesOrder?.map((t) => <TableSketch ordered={t?.createdAt} />)}
                                </div>
                            </div>
                            {/* <div className="flex flex-1 rounded border">
                                <p>Qr Code pour le comptoir / Extérieur</p>
                            </div>
                            <div className="flex flex-1 rounded border">
                                <p>Qr Code pour le wifi</p>
                            </div> */}
                        </Card>
                    ) : null}
                </div>
            </div>
        </Layout>
    )
}

const QrCode = dynamic(() => Promise.resolve(QrCodeComponent), {
    ssr: false,
});

export default QrCode;


// // @ts-ignore
// 'use client'

// import dynamic from "next/dynamic"
// import React, { useState } from "react"
// import Layout from "@/layout/layout"
// import { useUserContext } from "@/context/user"
// import { useRouter } from "next/router"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { cn } from "@/lib/utils"
// import Image from "next/image"


// function QrCodeComponent() {
//     const { user } = useUserContext();
//     const router = useRouter()
//     const [step, setStep] = useState(1)
//     const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

//     const selectMethod = (method: string) => {
//         if (selectedMethod) {
//             setSelectedMethod(method)
//         } else {
//             setSelectedMethod(method)
//             setStep(prev => prev + 1)
//         }

//     }

//     const handlePrevButton = () => {
//         if (step > 1) {
//             setStep(prev => prev - 1)
//         }
//     }

//     const handleNextButton = () => {
//         if (step < 2) {
//             setStep(prev => prev + 1)
//         }
//     }

//     return (
//         <Layout isLoading={false} withAuth>
//             <div className="flex flex-col mt-12 w-full justify-center items-center">
//                 <div className="flex w-full h-full justify-center items-center">
//                     {step === 1 ? (
//                         <div className="flex gap-5">
//                             <Card className={cn("h-fit cursor-pointer hover:shadow-md p-10 flex gap-5", selectedMethod === "print" ? "border border-blue-400" : null)} onClick={() => selectMethod('print')}>
//                                 <Image src="/assets/images/print-qr.webp" width={150} height={150} className="rounded" />
//                                 <div className="flex flex-col justify-center">
//                                     <p className="text-2xl font-normal">J'imprime moi même</p>
//                                     <p className="text-2xl font-normal">mes QR code</p>
//                                 </div>
//                             </Card>
//                             <Card className={cn("h-fit cursor-pointer hover:shadow-md p-10 flex gap-5", selectedMethod === "order" ? "border border-blue-400" : null)} onClick={() => selectMethod('order')}>
//                                 <Image src="/assets/images/print-qr.webp" width={150} height={150} className="rounded" />
//                                 <div className="flex flex-col justify-center">
//                                     <p className="text-2xl font-bold">Je commande mon</p>
//                                     <div className="flex text-2xl font-bold">pack <Image src="/assets/images/logo/logo.png" width={100} height={100} /></div>
//                                 </div>
//                             </Card>
//                         </div>) : null}
//                 </div>
//                 <div className="flex w-1/2 justify-between items-center">
//                     <Button variant="outline" onClick={handlePrevButton} className={step === 1 ? "opacity-0 hover:cursor-auto" : null} >Précédent</Button>
//                     <div className="flex justify-center gap-1 py-3">
//                         <div className={cn("w-4 h-4 rounded-full border border-blue-400", step === 1 ? 'bg-blue-400' : null)}></div>
//                         <div className={cn("w-4 h-4 rounded-full border border-blue-400", step === 2 ? 'bg-blue-400' : null)}></div>
//                     </div>
//                     <Button onClick={handleNextButton}>Suivant</Button>
//                 </div>
//             </div>
//         </Layout>
//     )
// }

// const QrCode = dynamic(() => Promise.resolve(QrCodeComponent), {
//     ssr: false,
// });

// export default QrCode;




{/* <Layout isLoading={false}>
<div className="flex flex-col mt-8 w-full justify-center items-center">
    <div className="flex flex-col w-full h-full items-center gap-5">
        <div className="flex gap-5">
            <Card className={cn("h-fit cursor-pointer hover:shadow-md p-10 flex gap-5", selectedMethod === "print" ? "border border-blue-400" : null)} onClick={() => selectMethod('print')}>
                <Image src="/assets/images/print-qr.webp" width={150} height={150} className="rounded" />
                <div className="flex flex-col justify-center">
                    <p className="text-2xl font-normal">J&apos;imprime moi même</p>
                    <p className="text-2xl font-normal">mes QR code</p>
                </div>
            </Card>
            <Card className={cn("h-fit cursor-pointer hover:shadow-md p-10 flex gap-5", selectedMethod === "order" ? "border border-blue-400" : null)} onClick={() => selectMethod('order')}>
                <Image src="/assets/images/order_logos.png" width={150} height={150} className="rounded" />
                <div className="flex flex-col justify-center">
                    <p className="text-2xl font-bold">Je commande mon</p>
                    <div className="flex text-2xl font-bold">pack <Image src="/assets/images/logo/logo.png" width={100} height={100} /></div>
                </div>
            </Card>
        </div>

        {selectedMethod === "print" ? (
            <Card className="w-full h-full p-10">
                <p>Choisir le nombre de qr code à générer</p>
                <p>Un qr code sera attribué à une table</p>
                <p>Ceci permettra à l&apos;avenir d&apos;ajouter la fonctionnalité de paiement en ligne</p>

            </Card>
        ) : null}

        {selectedMethod === "order" ? (
            <Card className="flex w-full h-full p-10 gap-5">
                {/* <p>Choisir le nombre de qr code à commander</p>
                <p>Un qr code sera attribué à une table</p>
                <p>Ceci permettra à l&apos;avenir d&apos;ajouter la fonctionnalité de paiement en ligne</p>
                <Input type="number" min={0} /> */}
                // <div className="flex flex-col flex-1 rounded border">
                //     <div className="h-full p-5">
                //         <p>Qr Code pour les tables</p>
                //         <div className="flex">
                //             <Input type="number" min={minTablesOrder} onChange={event => handleValueTablesOrder(event.target.value)} defaultValue={tablesOrder?.length} />
                //         </div>
                //     </div>
                //     <Separator />
                //     <div className="h-1/2 p-5 gap-x-3 gap-y-0 flex flex-wrap">
                //         {tablesOrder?.map((t) => <TableSketch ordered={t?.createdAt} />)}
                //     </div>
                // </div>
                {/* <div className="flex flex-1 rounded border">
                    <p>Qr Code pour le comptoir / Extérieur</p>
                </div>
                <div className="flex flex-1 rounded border">
                    <p>Qr Code pour le wifi</p>
                </div> */}
//             </Card>
//         ) : null}
//     </div>
// </div>
// </Layout> */}