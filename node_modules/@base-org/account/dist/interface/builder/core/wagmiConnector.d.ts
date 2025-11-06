import type { ProviderInterface } from '../../../core/provider/interface.js';
import type { Mutable, Omit } from '@wagmi/core/internal';
import { type Address } from 'viem';
import type { createBaseAccountSDK } from './createBaseAccountSDK.js';
export type BaseAccountSDKParameters = Mutable<Omit<Parameters<typeof createBaseAccountSDK>[0], 'appChainIds'>>;
export declare function baseAccountConnector(parameters: BaseAccountSDKParameters): import("@wagmi/core").CreateConnectorFn<ProviderInterface, {
    connect(parameters?: {
        chainId?: number | undefined;
        isReconnecting?: boolean | undefined;
    }): Promise<{
        accounts: readonly Address[];
        chainId: number;
    }>;
}, Record<string, unknown>>;
//# sourceMappingURL=wagmiConnector.d.ts.map