import { create } from 'web3-eth-accounts';
import Web3 from 'web3';
import { useState, useEffect } from 'react';

declare global {
    interface Window {
        web3AccountsLoadTime: any;
        web3PackageAccountsLoadTime: any;
    }
  }

export default function Web3Accounts() {

    const [loadTimeAccountsCreate, setLoadTimeAccountsCreate ] = useState<number>(0);
    const [loadTimeWeb3AccountsCreate, setLoadTimeWeb3AccountsCreate ] = useState<number>(0);

    useEffect(() => {
        if (typeof window !== "undefined") {
      
            let startTime = performance.now();
            const wallet = create();
            let endTime = performance.now();
            const loadTime = endTime - startTime;
            window.web3AccountsLoadTime = loadTime
            setLoadTimeAccountsCreate(loadTime);
        
            const web3 = new Web3("");
            startTime = performance.now();
            const walletWeb3 = web3.eth.accounts.create();
            endTime = performance.now();
            window.web3PackageAccountsLoadTime = endTime - startTime;
            setLoadTimeWeb3AccountsCreate(endTime - startTime);
          }

    });
    
    return (
    <div>
        <div> web3-eth-accounts package
            <p data-cy="web3-eth-accounts-time">
                    web3-eth-accounts Create method loading time: {loadTimeAccountsCreate}ms
            </p>
            <p data-cy="web3-create-time"> web3 main package Create method loading time: {loadTimeWeb3AccountsCreate}ms</p>
        </div>
    </div>);
};