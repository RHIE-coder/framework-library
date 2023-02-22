const SafeAppsSDK = require('@safe-global/safe-apps-sdk').default

const opts = {
  allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
  debug: false,
};

const appsSdk = new SafeAppsSDK(opts);

(async() => {
    const safe = await appsSdk.safe.getInfo();
    console.log(safe)
})()