import { ethers, parseEther, parseUnits } from "ethers";
import { useEffect, useState } from 'react';

export default function ethersComponent() {

    const [loadTimeCreateProvider, setLoadTimeCreateProvider] = useState<number>();
    const [loadTimeCreateWallet, setLoadTimeCreateWallet] = useState<number>();
    const [loadTimeSign, setLoadTimeSign] = useState<number>();
    const [loadTimeSignTransaction, setLoadTimeSignTransaction] = useState<number>();

    const [signature, setSignature] = useState<string>();

    useEffect(() => {
        const ethersInteractions = async () => {
            // create an ethers provider
            let startTime = performance.now();
            await new ethers.InfuraProvider("sepolia", "addProviderHere");
            let endTime = performance.now();
            let loadTime = endTime - startTime;
            setLoadTimeCreateProvider(loadTime);

            // create a wallet
            startTime = performance.now();
            const wallet = await ethers.Wallet.createRandom(); 
            endTime = performance.now();
            loadTime = endTime - startTime;
            setLoadTimeCreateWallet(loadTime);

            // sign a message
            startTime = performance.now();
            const signature = await wallet.signMessage("Hello world");
            endTime = performance.now();
            loadTime = endTime - startTime;
            setLoadTimeSign(loadTime);
            setSignature(signature);

            // sign transaction
            const tx = {
                to: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
                value: parseEther("1.0"),
                gasLimit: 21000,
                gasPrice: parseUnits('10.0', 'gwei'),
                nonce: 0, // You may need to fetch the correct nonce via an RPC call
              };

            startTime = performance.now();
            await wallet.signTransaction(tx);
            endTime = performance.now();
            loadTime = endTime - startTime;
            setLoadTimeSignTransaction(loadTime);

        };
        ethersInteractions();

        
    },[]);
    return(
        <div>
            Ethers component
            <p data-cy="ethers-createProvider-time">
                Ethers Create method loading time: {loadTimeCreateProvider ? loadTimeCreateProvider : 'Loading...'}ms
            </p>
            <p data-cy="ethers-getWallet-time">
                Ethers Create wallet loading time: {loadTimeCreateWallet ? loadTimeCreateWallet : 'Loading...'}ms
            </p>
            <p data-cy="ethers-sign-time">
                Ethers sign message with wallet loading time: {loadTimeSign ? loadTimeSign : 'Loading...'}ms
            </p>
            <p data-cy="ethers-signTransaction-time">
                Ethers sign transaction with wallet loading time: {loadTimeSignTransaction ? loadTimeSignTransaction : 'Loading...'}ms
            </p>
            <p>
                Ethers get signature: {signature ? signature : 'Loading...'}
            </p>
        </div>
    )
};