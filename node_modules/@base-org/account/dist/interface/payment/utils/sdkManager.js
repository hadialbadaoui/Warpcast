import { createBaseAccountSDK } from '../../../index.js';
import { CHAIN_IDS } from '../constants.js';
/**
 * Creates an ephemeral SDK instance configured for payments
 * @param chainId - The chain ID to use
 * @returns The configured SDK instance
 */
export function createEphemeralSDK(chainId) {
    const appName = typeof window !== 'undefined' ? window.location.origin : 'Base Pay SDK';
    const sdk = createBaseAccountSDK({
        appName: appName,
        appChainIds: [chainId],
        preference: {
            telemetry: true,
        },
    });
    return sdk;
}
/**
 * Executes a payment using the SDK
 * @param sdk - The SDK instance
 * @param requestParams - The wallet_sendCalls request parameters
 * @returns The payment execution result with transaction hash and optional info responses
 */
export async function executePayment(sdk, requestParams) {
    var _a;
    const provider = sdk.getProvider();
    const result = await provider.request({
        method: 'wallet_sendCalls',
        params: [requestParams],
    });
    let transactionHash;
    let payerInfoResponses;
    // Handle different response formats
    if (typeof result === 'string' && result.length >= 66) {
        // Standard response format - just a transaction hash
        transactionHash = result.slice(0, 66);
    }
    else if (typeof result === 'object' && result !== null) {
        // Object response format - contains callsId and capabilities with dataCallback
        const resultObj = result;
        // Extract transaction hash from callsId
        if (typeof resultObj.callsId === 'string' && resultObj.callsId.length >= 66) {
            transactionHash = resultObj.callsId.slice(0, 66);
            // Extract info responses from capabilities.dataCallback
            if ((_a = resultObj.capabilities) === null || _a === void 0 ? void 0 : _a.dataCallback) {
                payerInfoResponses = resultObj.capabilities.dataCallback;
            }
        }
        else {
            throw new Error(`Could not extract transaction hash from object response. Available fields: ${Object.keys(resultObj).join(', ')}`);
        }
    }
    else {
        throw new Error(`Unexpected response format from wallet_sendCalls: expected string with length > 66 or object with callsId, got ${typeof result}`);
    }
    return { transactionHash, payerInfoResponses };
}
/**
 * Manages the complete payment flow with SDK lifecycle
 * @param requestParams - The wallet_sendCalls request parameters
 * @param testnet - Whether to use testnet
 * @returns The payment execution result
 */
export async function executePaymentWithSDK(requestParams, testnet) {
    const network = testnet ? 'baseSepolia' : 'base';
    const chainId = CHAIN_IDS[network];
    const sdk = createEphemeralSDK(chainId);
    const provider = sdk.getProvider();
    try {
        const result = await executePayment(sdk, requestParams);
        return result;
    }
    finally {
        // Clean up provider state for subsequent payments
        await provider.disconnect();
    }
}
//# sourceMappingURL=sdkManager.js.map