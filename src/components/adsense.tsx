import { useEffect } from "react";
import Script from "next/script";

const AdSense: React.FC = () => {
  useEffect(() => {
    if (window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error: ", e);
      }
    }
  }, []);

  return (
    <>
      {/* Charger le script AdSense */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7096629722694309"
        crossOrigin="anonymous"
      />
      {/* Conteneur pour l'annonce */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7096629722694309"
        data-ad-slot="6076107771"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};

export default AdSense;
