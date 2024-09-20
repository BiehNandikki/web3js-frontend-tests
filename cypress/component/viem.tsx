import { createPublicClient, http, createWalletClient, custom} from 'viem'
import type { Transport, Client, Account, RpcSchema, PublicActions, Chain} from 'viem';
import { sepolia } from 'viem/chains';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import { useEffect, useState} from 'react';


declare global {
    interface Window {
        ethereum: any
    }
}
export default function viemComponent() {
    const [loadTimeCreateClient, setLoadTimeCreateClient] = useState<number>();
    const [loadTimeBalance, setLoadTimeBalance] = useState<number>();
    const [loadTimeBlock, setLoadTimeBlock] = useState<number>();
    const [loadTimeChainId, setLoadTimeChainId] = useState<number>();
    const [loadTimeCreateWalletClient, setLoadTimeCreateWalletClient] = useState<number>();
    const [loadSignTime, setLoadSignTime] = useState<number>();
    

    const [block, setBlock] = useState<bigint>();
    const [balance, setBalance] = useState<bigint>();
    const [chainId, setChainId] = useState<number>();
    const [signature, setSignature] = useState<string>();


    useEffect(() => {

        const viemInteractions = async () => {
            let startTime = performance.now();
            const client = await createPublicClient({
                chain: sepolia,
                transport: http("https://sepolia.infura.io/v3/4434a7b126ac4ebdaa6eba9bb94075a7"),
            });
            let endTime = performance.now();
            let loadTime = endTime - startTime;
            setLoadTimeCreateClient(loadTime);

            startTime = performance.now();
            const block = await client.getBlockNumber();
            endTime = performance.now();
            loadTime = endTime - startTime;
            setLoadTimeBlock(loadTime);
            setBlock(block);

            startTime = performance.now();
            const balance = await client.getBalance({address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"});
            endTime = performance.now();
            loadTime = endTime - startTime;
            setLoadTimeBalance(loadTime);
            setBalance(balance);

            startTime = performance.now();
            const chainId = await client.getChainId();
            endTime = performance.now();
            loadTime = endTime - startTime;
            setLoadTimeChainId(loadTime);
            setChainId(chainId);

            startTime = performance.now();
            const walletClient = await createWalletClient({
                chain: sepolia,
                transport: http(),
            });
            endTime = performance.now();
            loadTime = endTime - startTime;
            setLoadTimeCreateWalletClient(loadTime);
            const pk = generatePrivateKey();
            const account = privateKeyToAccount(pk);
            startTime = performance.now();
            const signature = await walletClient.signMessage({message:"Hello world", account: account});
            endTime = performance.now();
            loadTime = endTime - startTime;
            setLoadSignTime(loadTime);
            setSignature(signature)
        }
        viemInteractions();
    }, []);

    return (
        <div>
            <div>
                Viem package
            </div>
            <p data-cy="viem-createClient-time">
                Loading time to create client: {loadTimeCreateClient ? loadTimeCreateClient : `Loading...`}ms
            </p>
            <p data-cy="viem-getBlock-time">
                Loading time to get block: {loadTimeBlock ? loadTimeBlock : `Loading...`}ms
            </p>
            <p data-cy="viem-getBalance-time">
                Loading time to get balance: {loadTimeBalance ? loadTimeBalance : `Loading...`}ms
            </p>
            <p data-cy="viem-getChainId-time">
                Loading time to get chainID: {loadTimeChainId ? loadTimeChainId : `Loading...`}ms
            </p>
            <p data-cy="viem-createWalletClient-time">
                Loading time to create Wallet client: {loadTimeCreateWalletClient ? loadTimeCreateWalletClient : `Loading...`}ms
            </p>
            <p data-cy="viem-sign-time">
                Loading time to sign: {loadSignTime ? loadSignTime : `Loading...`}ms
            </p>
            <p>
                Block number: {block?.toString()}
            </p>
            <p>
                Balance for address 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045: {balance?.toString()}
            </p>
            <p>
                Chain ID: {chainId}
            </p>
            <p>
                Signature: {signature}
            </p>
        </div>
    )
};