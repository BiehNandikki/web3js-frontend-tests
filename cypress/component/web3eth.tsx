import { Web3Eth } from 'web3-eth';
import { useState, useEffect } from 'react';

declare global {
    interface Window {
    }
  }

export default function Web3EthComponent() {

    const [loadTimeWeb3EthConstructor, setLoadTimeWeb3EthConstructor] = useState<number>(-1);
    const [loadTimeWeb3EthBlock, setLoadTimeWeb3EthBlock] = useState<number>(-1);
    const [loadTimeWeb3EthBalance, setLoadTimeWeb3EthBalance] = useState<number>();
    const [block, setBlock] = useState<bigint>();
    const [balance, setBalance] = useState<bigint>();

    useEffect(() => {
        const createWeb3Eth = async () => {
            return new Web3Eth("https://ethereum-sepolia-rpc.publicnode.com");
        }
        const getBlock = async (web3Eth: Web3Eth) => {
            const block = await web3Eth.getBlock();
            setBlock(block.number);
        }
        const getBalance = async (web3Eth: Web3Eth) => {
            const balance = await web3Eth.getBalance("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
            setBalance(balance);

        };
        const web3EthInteractions = async () => {
            let startTime = performance.now();
            const web3Eth = await createWeb3Eth();
            let endTime = performance.now();
            let loadTime = endTime - startTime;
            setLoadTimeWeb3EthConstructor(loadTime);

            startTime = performance.now();
            await getBlock(web3Eth);
            endTime = performance.now();
            loadTime = endTime - startTime;
            setLoadTimeWeb3EthBlock(loadTime);

            startTime = performance.now();
            await getBalance(web3Eth);
            endTime = performance.now();
            loadTime = endTime - startTime;
            setLoadTimeWeb3EthBalance(loadTime);

        };
        if (typeof window !== "undefined") {
            web3EthInteractions();
          }

    }, []);
    
    return (
    <div>
        <div> web3-eth-accounts package
            <p data-cy="web3-eth-constructor-time">
                    web3-eth Create method loading time: {loadTimeWeb3EthConstructor > 0 ? loadTimeWeb3EthConstructor: `Loading...` }ms
            </p>
            <p data-cy="web3-eth-getBlock-time">
                    web3-eth getBlock method loading time: {loadTimeWeb3EthBlock > 0 ? loadTimeWeb3EthBlock: `Loading...` }ms
            </p>
            <p>
                    web3-eth getBlock number: {block ? block.toString(): `Loading...` }
            </p>
            <p data-cy="web3-eth-getBalance-time">
                    web3-eth get balance method loading time: {loadTimeWeb3EthBalance ? loadTimeWeb3EthBlock: `Loading...` }ms
            </p>
            <p>
                    balance of address '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045': {balance ? balance.toString(): `Loading...` }
            </p>
        </div>
    </div>);
};