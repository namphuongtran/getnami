import { env } from "@/lib/env";
import { ConsentBanner } from "./consent-banner";

/**
 * Env-gated analytics. Cloudflare Web Analytics is cookieless and needs no banner.
 * GA4 loads with Consent Mode v2 defaulting to denied, and a banner asks before granting.
 */
export function Analytics() {
  return (
    <>
      {env.cfBeaconToken && (
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({ token: env.cfBeaconToken })}
        />
      )}
      {env.gaId && (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("consent","default",{ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:"denied"});try{if(localStorage.getItem("consent")==="granted")gtag("consent","update",{analytics_storage:"granted"})}catch(e){}gtag("js",new Date());gtag("config",${JSON.stringify(env.gaId)});`,
            }}
          />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${env.gaId}`} />
          <ConsentBanner />
        </>
      )}
    </>
  );
}
