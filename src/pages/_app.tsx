import '@/styles/devices.css'
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import UserProvider from "@/context/user";
import Nav from "@/components/nav";
import { Inter } from '@next/font/google';
import { Database } from '@/types/database.types'
import { useRouter } from 'next/router';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export default function App({
  Component,
  pageProps
}: AppProps<{ initialSession: Session }>) {
  // Create a new supabase browser client on every first render.
  const [supabase] = useState(() => createBrowserSupabaseClient<Database>());
  const router = useRouter()

  const isVisibleNav =
    router.pathname !== '/auth'
    && router.pathname !== '/'

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <UserProvider>
        <main className={inter.className}>
          {isVisibleNav ? <Nav /> : null}
          <Component {...pageProps} />
          <Toaster />
        </main>
      </UserProvider>
    </SessionContextProvider>
  )
}