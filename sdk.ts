import { exec } from 'child_process';
import { createSDK, encodeCommitChanges } from 'filemap/sdk';
import keytar from "keytar"

const APP_NAME = "fm-server-driver";
const STANDALONE_KEYTAR_KEY = "keykey";

const { sdk, options, waitForAuth } = createSDK({
    enableOperationQueue: true,
    fetchTokens: async () => {
        const accessToken = await keytar.getPassword(
            APP_NAME,
            STANDALONE_KEYTAR_KEY,
        );
        return { accessToken: accessToken || undefined };
    },
    afterInit: async () => {
        if (!options.accessToken) {
            return;
        }
        try {
            await keytar.setPassword(
                APP_NAME,
                STANDALONE_KEYTAR_KEY,
                options.accessToken,
            );
        } catch {
            console.warn(
                'keychain error while setting access token in keytar',
            );
        }
    },
});

async function initStandaloneSDK() {
    try {
        await sdk.fetchAuthenticatedUser();
    } catch {
        const { loginUrl, wait } = await sdk.loginWithChallenge(
            'desktop_browser',
            100_000,
        );

        console.log('Please click url', loginUrl);
        const cmd =
            process.platform === 'darwin'
                ? 'open'
                : process.platform === 'win32'
                ? 'start'
                : 'xdg-open';
        const url =
            process.platform === 'darwin'
                ? loginUrl.replace('&', '\\&')
                : process.platform === 'win32'
                ? loginUrl.replace('&', '^&')
                : loginUrl;
        exec(`${cmd} ${url}`);

        await wait();
    }
}

export{ initStandaloneSDK as initSdk, sdk, encodeCommitChanges };
