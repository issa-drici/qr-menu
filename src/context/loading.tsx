import { useRouter } from "next/router";
import { createContext, useState, useContext, ReactNode, useEffect } from "react";

type ContextType = any;

const Context = createContext<ContextType>({});

const Provider = ({ children }: { children: ReactNode }) => {
  const [isLoadingApp, setIsLoadingApp] = useState<boolean | null>(false);
  const router = useRouter()

  const pushWithLoading = (path: string) => {
    console.log(path)
    // const handleRouteChange = () => {
    //   setIsLoadingApp(false)
    //   router.events.off('routeChangeComplete', handleRouteChange);
    // };

    // setIsLoadingApp(true)
    // setTimeout(() => {
    //   router.events.on('routeChangeComplete', handleRouteChange);
      router.push(path);
    // }, 1000);

  };



  const exposed = {
    isLoadingApp,
    setIsLoadingApp,
    pushWithLoading
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useLoadingContext = () => useContext(Context);

export default Provider;