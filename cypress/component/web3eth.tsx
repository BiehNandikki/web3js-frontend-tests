import { Web3Eth } from 'web3-eth';
import { useState, useEffect } from 'react';

declare global {
    interface Window {
        web3AccountsLoadTime: any;
        web3PackageAccountsLoadTime: any;
    }
  }

export default function Web3EthComponent() {

    const [loadTimeWeb3EthConstructor, setLoadTimeWeb3EthConstructor] = useState<number>(0);

    useEffect(() => {
        if (typeof window !== "undefined") {
      
            let startTime = performance.now();
            const web3Eth = new Web3Eth("https://ethereum-sepolia-rpc.publicnode.com");
            let endTime = performance.now();
            const loadTime = endTime - startTime;
            setLoadTimeWeb3EthConstructor(loadTime);
        
          }

    });
    
    return (
    <div>
        <div> web3-eth-accounts package
            <p data-cy="web3-eth-constructor-time">
                    web3-eth Create method loading time: {loadTimeWeb3EthConstructor}ms
            </p>
        </div>
    </div>);
};