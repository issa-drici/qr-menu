import '@/styles/devices.css'
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import UserProvider from "@/context/user";
import LoadingProvider from "@/context/loading";
import Nav from "@/components/nav";
import { Inter } from '@next/font/google';
import { Database } from '@/types/database.types'
import { useRouter } from 'next/router';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export default function App({
  Component,
  pageProps
}: AppProps<{ initialSession: Session }>) {
  // Create a new supabase browser client on every first render.
  const [supabase] = useState(() => createBrowserSupabaseClient<Database>());
  const router = useRouter()

  const isActive = (pathname) => router.pathname === pathname;
  const isHomePage = router.pathname === '/';

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <LoadingProvider>
        <UserProvider>
          <div className={cn(!isHomePage ? 'md:max-h-screen md:max-w-[100vh] md:overflow-hidden' : null)}>
            <main className={cn(inter.className, !isHomePage ? 'md:max-w-[430px] md:mx-auto md:w-full md:h-[730px] md:overflow-auto md:border md:border-[#e1e1e1] md:rounded-[25px] md:mt-[50px] md:shadow-md md:shadow-[rgba(0,0,0,0.1)]' : null)}>
              {!isActive('/') ? <Nav /> : null}
              <Component {...pageProps} />
              <Toaster />
            </main>
          </div>
        </UserProvider>
      </LoadingProvider>
    </SessionContextProvider>
  )
}