import Authenticated from "@/components/authenticated";
import { useLoadingContext } from "@/context/loading";
import { cn } from "@/lib/utils";

export default function Layout({ children, withAuth, fullHeight, className }) {
    const { isLoadingApp } = useLoadingContext()

    return <div className={cn("flex flex-col justify-center px-4 py-5 gap-x-5", className, fullHeight ? "min-h-[calc(screen_-_56px)]" : "h-[calc(screen_-_56px)]")}>
        {withAuth ? (
            <Authenticated>
                {isLoadingApp ? (
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-[#fffafc]">
                        <img src="/assets/images/loader.gif" className="h-30 object-contain mb-2" />
                    </div>
                ) : children}
            </Authenticated>
        ) : null}
        {(!withAuth && !isLoadingApp) ? children : null}
    </div>;
}