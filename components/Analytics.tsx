import Script from "next/script";
import { clientConfig } from "@/config/client.config";

/**
 * GA4 loader. Renders nothing unless analytics.ga4Id is set in client.config.ts,
 * so the template ships analytics-off by default.
 */
export function Analytics() {
  const id = clientConfig.analytics.ga4Id;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
