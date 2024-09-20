import { ethers, HDNodeWallet, InfuraProvider } from "ethers";
import { useEffect, useState } from 'react';

export default function ethersComponent() {

    const [loadTimeCreateProvider, setLoadTimeCreateProvider] = useState<number>();
    const [loadTimeGetBlock, setLoadTimeGetBlock] = useState<number>();
    const [loadTimeGetBalance, setLoadTimeGetBalance] = useState<number>();
    const [loadTimeGetChain, setLoadTimeGetChain] = useState<number>();
    const [loadTimeCreateWallet, setLoadTimeCreateWallet] = useState<number>();
    const [loadTimeSign, setLoadTimeSign] = useState<number>();

    const [block, setBlock] = useState<number>();
    const [balance, setBalance] = useState<bigint>();
    const [chain, setChain] = useState<bigint>();
    const [signature, setSignature] = useState<string>();

    useEffect(() => {
        const ethersInteractions = async () => {
            let startTime = performance.now();
            const provider = await new ethers.InfuraProvider("sepolia","4434a7b126ac4ebdaa6eba9bb94075a7");
            let endTime = performance.now();
            let loadTime = endTime - startTime;
            setLoadTimeCreateProvider(loadTime);

            startTime = performance.now();
            const block = await provider.getBlockNumber();
            endTime = performance.now();
            loadTime = endTime - startTime;
            setLoadTimeGetBlock(loadTime);
            setBlock(block);

            startTime = performance.now();
            const balance = await provider.getBalance("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
            endTime = performance.now();
            loadTime = endTime - startTime;
            setLoadTimeGetBalance(loadTime);
            setBalance(balance);

            startTime = performance.now();
            const chain = await provider.getNetwork();
            endTime = performance.now();
            loadTime = endTime - startTime;
            setLoadTimeGetChain(loadTime);
            setChain(chain.chainId);

            startTime = performance.now();
            const wallet = await ethers.Wallet.createRandom(); 
            endTime = performance.now();
            loadTime = endTime - startTime;
            setLoadTimeCreateWallet(loadTime);

            startTime = performance.now();
            const signature = await wallet.signMessage("Hello world");
            endTime = performance.now();
            loadTime = endTime - startTime;
            setLoadTimeSign(loadTime);
            setSignature(signature);
        };
        ethersInteractions();

        
    },[]);
    return(
        <div>
            Ethers component
            <p data-cy="ethers-createProvider-time">
                Ethers Create method loading time: {loadTimeCreateProvider ? loadTimeCreateProvider : 'Loading...'}ms
            </p>
            <p data-cy="ethers-getBlock-time">
                Ethers get Block loading time: {loadTimeGetBlock ? loadTimeGetBlock : 'Loading...'}ms
            </p>
            <p data-cy="ethers-getBalance-time">
                Ethers get Balance loading time: {loadTimeGetBalance ? loadTimeGetBalance : 'Loading...'}ms
            </p>
            <p data-cy="ethers-getChain-time">
                Ethers get Chain loading time: {loadTimeGetChain ? loadTimeGetChain : 'Loading...'}ms
            </p>
            <p data-cy="ethers-getWallet-time">
                Ethers Create wallet loading time: {loadTimeCreateWallet ? loadTimeCreateWallet : 'Loading...'}ms
            </p>
            <p data-cy="ethers-sign-time">
                Ethers sign with wallet loading time: {loadTimeSign ? loadTimeSign : 'Loading...'}ms
            </p>
            <p>
                Ethers get Block: {block}
            </p>
            <p>
                Ethers get Balance from address 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045: {balance ? balance.toString() : 'Loading...'}
            </p>
            {/* <p>
                Ethers get chain: {chain?.toString() ? chain.toString() : 'Loading...'}
            </p> */}
            <p>
                Ethers get signature: {signature ? signature : 'Loading...'}
            </p>
        </div>
    )
};