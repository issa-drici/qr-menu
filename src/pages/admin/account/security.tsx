import Layout from "@/layout/layout"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"

export default function AccountSecurity() {
    const router = useRouter()

    return (
        <Layout isLoading={false} withAuth>
            <div className="md:container w-full">
                <p className="text-xl font-bold mt-5">Compte</p>
                <p className="text-sm font-light">Gère tes paramètres de compte et de ton abonnement</p>
                <div className="h-px w-full bg-slate-300 my-5"></div>
                <div className="flex flex-col md:flex-row space-y-5 md:space-x-5">
                    <div className="flex flex-col space-y-1">
                        <Button variant="ghost" onClick={() => router.push("/admin/account/info")}>Informations du restaurant</Button>
                        <Button variant="white">Sécurité</Button>
                        <Button variant="ghost" onClick={() => router.push("/admin/account/manage-subscription")}>Gérer mon abonnement</Button>
                    </div>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Sécurité</CardTitle>
                            <CardDescription>
                                Changez votre mot de passe
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" defaultValue="Pedro Duarte" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" defaultValue="@peduarte" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save changes</Button>
                        </CardFooter>
                    </Card>
                </div>

            </div>
        </Layout>
    )
}