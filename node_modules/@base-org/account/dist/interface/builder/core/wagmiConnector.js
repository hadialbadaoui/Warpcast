import { ChainNotConfiguredError, createConnector } from '@wagmi/core';
import { SwitchChainError, UserRejectedRequestError, getAddress, numberToHex, } from 'viem';
export function baseAccountConnector(parameters) {
    let walletProvider;
    let accountsChanged;
    let chainChanged;
    let disconnect;
    return createConnector((config) => ({
        id: 'baseAccountSDK',
        name: 'Base Account',
        rdns: 'app.base.account',
        type: 'baseAccount',
        async connect({ chainId } = {}) {
            var _a;
            try {
                const provider = await this.getProvider();
                const accounts = (await provider.request({
                    method: 'eth_requestAccounts',
                    params: [],
                })).map((x) => getAddress(x));
                if (!accountsChanged) {
                    accountsChanged = this.onAccountsChanged.bind(this);
                    provider.on('accountsChanged', accountsChanged);
                }
                if (!chainChanged) {
                    chainChanged = this.onChainChanged.bind(this);
                    provider.on('chainChanged', chainChanged);
                }
                if (!disconnect) {
                    disconnect = this.onDisconnect.bind(this);
                    provider.on('disconnect', disconnect);
                }
                // Switch to chain if provided
                let currentChainId = await this.getChainId();
                if (chainId && currentChainId !== chainId) {
                    const chain = await this.switchChain({ chainId }).catch((error) => {
                        if (error.code === UserRejectedRequestError.code)
                            throw error;
                        return { id: currentChainId };
                    });
                    currentChainId = (_a = chain === null || chain === void 0 ? void 0 : chain.id) !== null && _a !== void 0 ? _a : currentChainId;
                }
                return { accounts, chainId: currentChainId };
            }
            catch (error) {
                if (/(user closed modal|accounts received is empty|user denied account|request rejected)/i.test(error.message))
                    throw new UserRejectedRequestError(error);
                throw error;
            }
        },
        async disconnect() {
            const provider = await this.getProvider();
            if (accountsChanged) {
                provider.removeListener('accountsChanged', accountsChanged);
                accountsChanged = undefined;
            }
            if (chainChanged) {
                provider.removeListener('chainChanged', chainChanged);
                chainChanged = undefined;
            }
            if (disconnect) {
                provider.removeListener('disconnect', disconnect);
                disconnect = undefined;
            }
            await provider.disconnect();
        },
        async getAccounts() {
            const provider = await this.getProvider();
            return (await provider.request({
                method: 'eth_accounts',
            })).map((x) => getAddress(x));
        },
        async getChainId() {
            const provider = await this.getProvider();
            const chainId = (await provider.request({
                method: 'eth_chainId',
            }));
            return Number(chainId);
        },
        async getProvider() {
            if (!walletProvider) {
                const preference = (() => {
                    var _a, _b;
                    if (typeof parameters.preference === 'string')
                        return { options: parameters.preference };
                    return Object.assign(Object.assign({}, parameters.preference), { options: (_b = (_a = parameters.preference) === null || _a === void 0 ? void 0 : _a.options) !== null && _b !== void 0 ? _b : 'all' });
                })();
                const { createBaseAccountSDK } = await import('@base-org/account');
                const sdk = createBaseAccountSDK(Object.assign(Object.assign({}, parameters), { appChainIds: config.chains.map((x) => x.id), preference }));
                walletProvider = sdk.getProvider();
            }
            return walletProvider;
        },
        async isAuthorized() {
            try {
                const accounts = await this.getAccounts();
                return !!accounts.length;
            }
            catch (_a) {
                return false;
            }
        },
        async switchChain({ addEthereumChainParameter, chainId }) {
            var _a, _b, _c, _d, _e, _f, _g;
            const chain = config.chains.find((chain) => chain.id === chainId);
            if (!chain)
                throw new SwitchChainError(new ChainNotConfiguredError());
            const provider = await this.getProvider();
            try {
                await provider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: numberToHex(chain.id) }],
                });
                return chain;
            }
            catch (error) {
                // Indicates chain is not added to provider
                if (error.code === 4902) {
                    try {
                        let blockExplorerUrls;
                        if (addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.blockExplorerUrls)
                            blockExplorerUrls = addEthereumChainParameter.blockExplorerUrls;
                        else
                            blockExplorerUrls = ((_a = chain.blockExplorers) === null || _a === void 0 ? void 0 : _a.default.url)
                                ? [(_b = chain.blockExplorers) === null || _b === void 0 ? void 0 : _b.default.url]
                                : [];
                        let rpcUrls;
                        if ((_c = addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.rpcUrls) === null || _c === void 0 ? void 0 : _c.length)
                            rpcUrls = addEthereumChainParameter.rpcUrls;
                        else
                            rpcUrls = [(_e = (_d = chain.rpcUrls.default) === null || _d === void 0 ? void 0 : _d.http[0]) !== null && _e !== void 0 ? _e : ''];
                        const addEthereumChain = {
                            blockExplorerUrls,
                            chainId: numberToHex(chainId),
                            chainName: (_f = addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.chainName) !== null && _f !== void 0 ? _f : chain.name,
                            iconUrls: addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.iconUrls,
                            nativeCurrency: (_g = addEthereumChainParameter === null || addEthereumChainParameter === void 0 ? void 0 : addEthereumChainParameter.nativeCurrency) !== null && _g !== void 0 ? _g : chain.nativeCurrency,
                            rpcUrls,
                        };
                        await provider.request({
                            method: 'wallet_addEthereumChain',
                            params: [addEthereumChain],
                        });
                        return chain;
                    }
                    catch (error) {
                        throw new UserRejectedRequestError(error);
                    }
                }
                throw new SwitchChainError(error);
            }
        },
        onAccountsChanged(accounts) {
            if (accounts.length === 0)
                this.onDisconnect();
            else
                config.emitter.emit('change', {
                    accounts: accounts.map((x) => getAddress(x)),
                });
        },
        onChainChanged(chain) {
            const chainId = Number(chain);
            config.emitter.emit('change', { chainId });
        },
        async onDisconnect(_error) {
            config.emitter.emit('disconnect');
            const provider = await this.getProvider();
            if (accountsChanged) {
                provider.removeListener('accountsChanged', accountsChanged);
                accountsChanged = undefined;
            }
            if (chainChanged) {
                provider.removeListener('chainChanged', chainChanged);
                chainChanged = undefined;
            }
            if (disconnect) {
                provider.removeListener('disconnect', disconnect);
                disconnect = undefined;
            }
        },
    }));
}
//# sourceMappingURL=wagmiConnector.js.map