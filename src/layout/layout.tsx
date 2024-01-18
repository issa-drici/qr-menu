import Authenticated from "@/components/authenticated";
import { cn } from "@/lib/utils";

export default function Layout({ isLoading, children, withAuth, fullHeight }) {
    return <div className={cn("flex justify-center container pb-10 gap-x-5 pt-20", fullHeight ? "min-h-screen" : "h-screen")}>
        {withAuth ? (
            <Authenticated>
                {isLoading ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <p>Chargement en cours</p>
                    </div>
                ) : children}
            </Authenticated>
        ) : null}
        {(!withAuth && !isLoading) ? children : null}
    </div>;
}