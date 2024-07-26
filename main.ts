import { initSdk, sdk } from './sdk';
import rootLinkCreation from "./scenarios/rootlinkCreation";


async function main() {
    await initSdk();
    console.log(await (sdk.fetchGoogleAccessToken().then(r => r.googleAccessToken)));
    try {
        await rootLinkCreation();
    } catch (e: any){
        console.error("Rootlink creation failed");
        console.error(e.stack);
    }  
}

main();