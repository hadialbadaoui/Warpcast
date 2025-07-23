import type { Hex } from 'viem';
import { createBaseAccountSDK } from '../../../index.js';
import type { PayerInfoResponses } from '../types.js';
/**
 * Type for wallet_sendCalls request parameters
 */
type WalletSendCallsRequestParams = {
    version: string;
    chainId: number;
    calls: Array<{
        to: Hex;
        data: Hex;
        value: Hex;
    }>;
    capabilities: Record<string, unknown>;
};
/**
 * Type for payment execution result
 */
export interface PaymentExecutionResult {
    transactionHash: Hex;
    payerInfoResponses?: PayerInfoResponses;
}
/**
 * Creates an ephemeral SDK instance configured for payments
 * @param chainId - The chain ID to use
 * @returns The configured SDK instance
 */
export declare function createEphemeralSDK(chainId: number): {
    getProvider: () => import("../../../index.js").ProviderInterface;
    subAccount: {
        create(account: import("../../../core/rpc/wallet_addSubAccount.js").AddSubAccountAccount): Promise<import("../../../store/store.js").SubAccount>;
        get(): Promise<import("../../../store/store.js").SubAccount | null>;
        addOwner: ({ address, publicKey, chainId, }: {
            address?: `0x${string}`;
            publicKey?: `0x${string}`;
            chainId: number;
        }) => Promise<string>;
        setToOwnerAccount(toSubAccountOwner: import("../../../store/store.js").ToOwnerAccountFn): void;
    };
};
/**
 * Executes a payment using the SDK
 * @param sdk - The SDK instance
 * @param requestParams - The wallet_sendCalls request parameters
 * @returns The payment execution result with transaction hash and optional info responses
 */
export declare function executePayment(sdk: ReturnType<typeof createBaseAccountSDK>, requestParams: WalletSendCallsRequestParams): Promise<PaymentExecutionResult>;
/**
 * Manages the complete payment flow with SDK lifecycle
 * @param requestParams - The wallet_sendCalls request parameters
 * @param testnet - Whether to use testnet
 * @returns The payment execution result
 */
export declare function executePaymentWithSDK(requestParams: WalletSendCallsRequestParams, testnet: boolean): Promise<PaymentExecutionResult>;
export {};
//# sourceMappingURL=sdkManager.d.ts.map