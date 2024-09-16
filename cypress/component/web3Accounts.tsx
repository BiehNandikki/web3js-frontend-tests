import { create } from 'web3-eth-accounts';
import { useState, useEffect } from 'react';

declare global {
    interface Window {
        web3AccountsLoadTime: any;
        web3PackageAccountsLoadTime: any;
    }
  }

export default function Web3Accounts() {

    const [loadTimeAccountsCreate, setLoadTimeAccountsCreate ] = useState<number>(-1);
    const [loadTimeAccountsSign, setLoadTimeAccountsSign ] = useState<number>(-1);
    const [signature, setSignature] = useState<string>("");

    useEffect(() => {
        const createWallet = async () => {
            return create();
        }

        const signWallet = async (wallet: any) => {
            const signature = wallet.sign("Hello world");
            setSignature(signature.signature);
            return signature;
        };
        const web3AccountsInteractions = async () => {
            let startTime = performance.now();
            const wallet = await createWallet();
            let endTime = performance.now();
            let loadTime = endTime - startTime;
            setLoadTimeAccountsCreate(loadTime);
            // sign with account
            startTime = performance.now();
            await signWallet(wallet);
            endTime = performance.now();
            loadTime = endTime - startTime;
            setLoadTimeAccountsSign(loadTime);
        }
        web3AccountsInteractions();
            

    }, []);
    
    return (
    <div>
        <div> web3-eth-accounts package
            <p data-cy="web3-eth-accounts-create-time">
                web3-eth-accounts Create method loading time: {loadTimeAccountsCreate > 0 ? loadTimeAccountsCreate : `Loading...`}ms
            </p>
            <p data-cy="web3-eth-accounts-sign-time">
                web3-eth-accounts Sign method loading time: {loadTimeAccountsSign > 0 ? loadTimeAccountsSign : `Loading...`}ms
            </p>
            <p>
                web3-eth-accounts signature: {signature}
            </p>
        </div>
    </div>);
};