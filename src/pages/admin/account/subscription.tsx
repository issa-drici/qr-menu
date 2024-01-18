import Layout from "@/layout/layout"
import { useRouter } from "next/router"
import { PricingCard } from "@/components/pricing-card"

export default function AccountSubscription() {
    const router = useRouter()

    return (
        <Layout isLoading={false} withAuth fullHeight>
            <div className="flex flex-col w-full items-center">
                <h2 className="text-2xl ipromax:text-3xl md:text-4xl font-black max-w-3xl leading-6 ">
                    Un prix <span className="bg-custom-gradient bg-clip-text text-transparent">transparent</span>
                </h2>
                <p className="font-bold text-gray-500">Aucun frais caché. Arrêtez n&apos;importe quand.</p>
                <div className="container flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-10 pt-10">
                    <PricingCard type="commis" noTrial />
                    <PricingCard type="cuisinier" noTrial />
                    <PricingCard type="chef" noTrial />
                </div>
            </div>
        </Layout>
    )
}