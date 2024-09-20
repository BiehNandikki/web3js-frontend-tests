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
        const getBlock = async (client: Client<Transport, Chain, Account, RpcSchema, PublicActions>) => {
            const block = await client.getBlockNumber();
            setBlock(block);
        }
        const createClient = async () => {
            return createPublicClient({
                chain: sepolia,
                transport: http("https://eth-sepolia.api.onfinality.io/public"),
            });
        }
        const getBalance = async (client: Client<Transport, Chain, Account, RpcSchema, PublicActions>) => {
            const balance = await client.getBalance({address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"});
            setBalance(balance);
        };
        const getChainId = async (client: Client<Transport, Chain, Account, RpcSchema, PublicActions>) => {
            const chainId = await client.getChainId();
            setChainId(chainId);
        };
        const getWalletClient = async () => {
            const walletClient = createWalletClient({
                chain: sepolia,
                transport: http(),
            });
            return walletClient;
        };

        const viemInteractions = async () => {
            let startTime = performance.now();
            const client = await createClient();
            let endTime = performance.now();
            let loadTime = endTime - startTime;
            setLoadTimeCreateClient(loadTime);

            startTime = performance.now();
            await getBlock(client as unknown as Client<Transport, Chain, Account, RpcSchema, PublicActions>);
            endTime = performance.now();
            loadTime = endTime - startTime;
            setLoadTimeBlock(loadTime);

            startTime = performance.now();
            await getBalance(client as unknown as Client<Transport, Chain, Account, RpcSchema, PublicActions>);
            endTime = performance.now();
            loadTime = endTime - startTime;
            setLoadTimeBalance(loadTime);

            startTime = performance.now();
            await getChainId(client as unknown as Client<Transport, Chain, Account, RpcSchema, PublicActions>);
            endTime = performance.now();
            loadTime = endTime - startTime;
            setLoadTimeChainId(loadTime);

            startTime = performance.now();
            const walletClient = await getWalletClient();
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