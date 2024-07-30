import { initSdk, sdk } from './sdk';
import scenarios from './scenarios';
import { assert } from 'console';

async function main() {
    await initSdk();
    console.log(await (sdk.fetchGoogleAccessToken().then(r => r.googleAccessToken)));
    const scenario_name = process.env["SCENARIO"]!;
    assert(scenario_name, "Scenario environment variable is unset.");
    const scenario = scenarios[scenario_name]!;
    assert(scenario, `Scenario ${scenario_name} does not exist.`);

    try {
        await scenario();
    } catch (e: any){
        console.error("Failed.");
        console.error(e.stack);
    }  
}

main().then(() => process.exit());
