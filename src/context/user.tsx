import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient, useSession, useSessionContext } from '@supabase/auth-helpers-react'
import { Database } from '@/types/database.types'

type ContextType = any;

const Context = createContext<ContextType>({});

const Provider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const supabaseClient = useSupabaseClient<Database>();
    // const { session } = useSessionContext();

    const [user, setUser] = useState<any | null>(null);
    const [initializing, setInitializing] = useState<boolean | null>(true);

    useEffect(() => {
        async function getUserProfile() {
            const { data: { session } } = await supabaseClient.auth.getSession()

            if (session) {
                const { data: profile } = await supabaseClient
                    .from("profile")
                    .select("*")
                    .eq("id", session?.user?.id)
                    .single();

                setUser({
                    ...session?.user,
                    ...profile,
                    db_profile: {
                        ...profile
                    }
                });
            }
        };


        supabaseClient.auth.onAuthStateChange((event, session) => {
            if (("SIGNED_IN" === event || "INITIAL_SESSION" === event) && session) {
                setTimeout(() => {
                    setInitializing(false);
                }, 1000);
                getUserProfile()
                // router.push(`/restaurant/${session?.user?.id}/admin/restaurant`)
            } else if ("INITIAL_SESSION" === event) {
                setUser(null);
                setInitializing(false);
            } else if ("SIGNED_OUT" === event) {
                setUser(null);
                setInitializing(true);
            }
        });

    }, []);

    useEffect(() => {
        if (user) {
            const subscription = supabaseClient
                .channel(`profile:id=eq.${user.id}`)
                .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profile' }, (payload: any) => {
                    setUser({ ...user, ...payload.new });
                })
                .subscribe();

            return () => {
                supabaseClient.removeChannel(subscription);
            };
        }
    }, [user]);

    const login = async () => {
        await supabaseClient.auth.signInWithOAuth({
            provider: "github",
        });
    };

    const logout = async () => {
        await supabaseClient.auth.signOut();
        setUser(null);
        router.push("/");
    };

    const exposed = {
        user,
        login,
        logout,
        initializing
    };

    return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUserContext = () => useContext(Context);

export default Provider;