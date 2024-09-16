import Web3 from 'web3';
import { useState, useEffect } from 'react';

export default function Web3Component() {
    const [loadTimeCreate, setLoadTime ] = useState<number>(0);
    const [loadTimeBlock, setBlockLoadTime ] = useState<number>(0);
    const [loadTimeBalance, setLoadTimeBalance ] = useState<number>(0);
    const [loadTimeGasPrice, setLoadTimeGasPrice ] = useState<number>(0);
    const [balance, setBalance] = useState<bigint>();
    const [gasPrice, setGasPrice] = useState<bigint>();
    const [loadTimeAccountsCreate, setLoadTimeAccountsCreate ] = useState<number>(0);

    
    useEffect(() => {
        const createWeb3Instance = async () => {
            return new Web3("https://ethereum-sepolia-rpc.publicnode.com");
        };
        const getBlock = async (web3: Web3) => {
            return await web3.eth.getBlock("latest");
        };
        const getBalance = async (web3: Web3) => {
            const getBalance = await web3.eth.getBalance("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
            setBalance(getBalance);
            return getBalance;
        };
        const getGasPrice = async (web3: Web3) => {
            const gasprice = await web3.eth.getGasPrice();
            setGasPrice(gasprice);
            return;
        }
        const web3Interactions = async () => {
            let startTime:number;
            let endTime:number;
            let loadTime:number;
            if (typeof window !== "undefined") {
                // construct web3 instance
                startTime = performance.now();
                const web3 = await createWeb3Instance();
                endTime = performance.now();
                loadTime = endTime - startTime;
                window.web3LoadTime = loadTime
                setLoadTime(loadTime);
    
                // get Block
                startTime = performance.now();
                await getBlock(web3);
                endTime = performance.now();
                loadTime = endTime - startTime;
                setBlockLoadTime(loadTime);

                // get Balance
                startTime = performance.now();
                await getBalance(web3);
                endTime = performance.now();
                loadTime = endTime - startTime;
                setLoadTimeBalance(loadTime);

                // get gas price
                startTime = performance.now();
                await getGasPrice(web3);
                endTime = performance.now();
                setLoadTimeGasPrice(endTime - startTime);

                // create web3-eth-accounts instance
                startTime = performance.now();
                const walletWeb3 = web3.eth.accounts.create();
                endTime = performance.now();
                setLoadTimeAccountsCreate(endTime - startTime);

    
              }

        }
        web3Interactions();
    }, [])
    
    return (
    <div> 
        <div>
            Web3 package
        </div>
        <p data-cy="web3-create-time">
            Load time to create Web3 instance: {loadTimeCreate}ms
        </p>
        <p data-cy="web3-getblock-time">
            Load time to getBlock from Web3 instance: {loadTimeBlock}ms
        </p>
        <p data-cy="web3-getBalance-time">
            Balance: {balance?.toString()} Load time to getBalance from Web3 instance: {loadTimeBalance}ms
        </p>
        <p data-cy="web3-getGasprice-time">
            GasPrice: {gasPrice?.toString()} Load time to getGasPrice from Web3 instance: {loadTimeGasPrice}ms
        </p>
        <p data-cy="web3-createAccount-time">
            Load time to create web3-eth-accounts from Web3 instance: {loadTimeAccountsCreate}ms
        </p>
        
    </div>);
};