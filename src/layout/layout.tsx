import Authenticated from "@/components/authenticated";

export default function Layout({ isLoading, children, withAuth }) {
    return <div className="flex justify-center container pb-10 gap-x-5 h-screen pt-20">
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