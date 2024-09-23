import Web3 from 'web3';
import { useState, useEffect } from 'react';

export default function Web3Component() {
    const [loadTimeCreate, setLoadTime ] = useState<number>(-1);
    const [loadTimeBlock, setBlockLoadTime ] = useState<number>(-1);
    const [loadTimeBalance, setLoadTimeBalance ] = useState<number>(-1);
    const [loadTimeGasPrice, setLoadTimeGasPrice ] = useState<number>(-1);
    const [loadTimeAccountsCreate, setLoadTimeAccountsCreate ] = useState<number>(-1);
    const [loadTimeGetChainId, setLoadTimeGetChainId ] = useState<number>(-1);
    const [loadTimeGetSignature, setLoadTimeGetSignature ] = useState<number>(-1);
    const [loadTimeSignTransaction, setLoadTimeSignTransaction] = useState<number>(-1);
    const [balance, setBalance] = useState<bigint>();
    const [gasPrice, setGasPrice] = useState<bigint>();
    const [chainId, setChainId] = useState<bigint>();
    const [signature, setSignature] = useState<string>();
    const [signedTransaction, setSignedTransaction] = useState<string>();
    const [block, setBlock] = useState<bigint>();

    
    useEffect(() => {
        const web3Interactions = async () => {
            let startTime:number;
            let endTime:number;
            let loadTime:number;
            if (typeof window !== "undefined") {
                startTime = performance.now();
                const web3 = new Web3("https://sepolia.infura.io/v3/4434a7b126ac4ebdaa6eba9bb94075a7");
                endTime = performance.now();
                loadTime = endTime - startTime;
                window.web3LoadTime = loadTime
                setLoadTime(loadTime);
    
                // get Block
                // startTime = performance.now();
                // const block = await web3.eth.getBlock("latest");
                // endTime = performance.now();
                // loadTime = endTime - startTime;
                // setBlockLoadTime(loadTime);
                // setBlock(block.number);

                // get Balance
                // startTime = performance.now();
                // const getBalance = await web3.eth.getBalance("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
                // endTime = performance.now();
                // loadTime = endTime - startTime;
                // setLoadTimeBalance(loadTime);
                // setBalance(getBalance);

                // get gas price
                // startTime = performance.now();
                // const gasprice = await web3.eth.getGasPrice();
                // endTime = performance.now();
                // setLoadTimeGasPrice(endTime - startTime);
                // setGasPrice(gasprice);

                // create web3-eth-accounts instance
                startTime = performance.now();
                const walletWeb3 = web3.eth.accounts.create();
                endTime = performance.now();
                setLoadTimeAccountsCreate(endTime - startTime);

                // get chainId
                // startTime = performance.now();
                // const chainId = await web3.eth.getChainId();
                // endTime = performance.now();
                // setLoadTimeGetChainId(endTime - startTime);
                // setChainId(chainId);

                // signing
                startTime = performance.now();
                const signature = await walletWeb3.sign("Hello world");
                endTime = performance.now();
                setLoadTimeGetSignature(endTime - startTime);
                setSignature(signature.signature);

                // sign a transaction
                startTime = performance.now();
                const signedTransaction = await web3.eth.accounts.signTransaction({from: walletWeb3.address, to: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", value: "0", gas: "21000", gasPrice: "21000"}, walletWeb3.privateKey);
                endTime = performance.now();
                console.log(signedTransaction)
                setLoadTimeSignTransaction(endTime - startTime);
                setSignedTransaction(signedTransaction.rawTransaction);
                

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
            Load time to create Web3 instance: {loadTimeCreate > 0 ? loadTimeCreate : `Loading...`}ms
        </p>
        {/* <p data-cy="web3-getblock-time">
            Load time to getBlock from Web3 instance: {loadTimeBlock > 0 ? loadTimeBlock: `Loading...`}ms
        </p>
        <p data-cy="web3-getChainId-time">
            Load time to get chainId from Web3 instance: {loadTimeGetChainId > 0 ? loadTimeGetChainId: `Loading...`}ms
        </p>
        <p data-cy="web3-getBalance-time">
            Load time to getBalance from Web3 instance: {loadTimeBalance > 0 ? loadTimeBalance : `Loading...`}ms
        </p>
        <p data-cy="web3-getGasprice-time">
            Load time to getGasPrice from Web3 instance: {loadTimeGasPrice > 0 ? loadTimeGasPrice : `Loading...`}ms
        </p> */}
        <p data-cy="web3-createAccount-time">
            Load time to create web3-eth-accounts from Web3 instance: {loadTimeAccountsCreate > 0 ? loadTimeAccountsCreate: `Loading...`}ms
        </p>
        <p data-cy="web3-getSignature-time">
            Load time to get sign a message from Web3 instance: {loadTimeGetSignature > 0 ? loadTimeGetSignature: `Loading...`}ms
        </p>
        <p data-cy="web3-getSignedTransaction-time">
            Load time to get a signed transaction from Web3 instance: {loadTimeSignTransaction > 0 ? loadTimeSignTransaction: `Loading...`}ms
        </p>
        {/* <p>
            Block number: {block?.toString()}
        </p>
        <p>
            ChainID: {chainId ? chainId.toString(): `Loading...`}
        </p> */}
        <p>
            Signature: {signature ? signature: `Loading...`}
        </p>
        {/* <p>
            Balance: {balance?.toString()} 
        </p>
        <p>
            Gas price: {gasPrice?.toString()}
        </p> */}
        
    </div>);
};