import { createPublicClient, http, createWalletClient, custom, parseGwei } from 'viem'
import { sepolia } from 'viem/chains';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import { useEffect, useState} from 'react';


declare global {
    interface Window {
        ethereum: any
    }
}
export default function viemComponent() {
    const [loadTimeCreateClient, setLoadTimeCreateClient] = useState<number>(-1);
    const [loadTimeCreateWalletClient, setLoadTimeCreateWalletClient] = useState<number>(-1);
    const [loadSignTime, setLoadSignTime] = useState<number>();
    const [loadSignTransactionTime, setLoadSignTransactionTime] = useState<number>();
    
    const [signature, setSignature] = useState<string>();


    const createClient = async () => {
        let startTime;
        let endTime;
        let loadTime;

        startTime = performance.now();
        await createPublicClient({
            chain: sepolia,
            transport: http(""),
        });
        endTime = performance.now();
        loadTime = endTime - startTime;
        setLoadTimeCreateClient(loadTime);
    }

    const createWallet = async () => {
        let startTime;
        let endTime;
        let loadTime;
        startTime = performance.now();
        const walletClient = await createWalletClient({
            chain: sepolia,
            transport: http(),
        });
        endTime = performance.now();
        loadTime = endTime - startTime;
        setLoadTimeCreateWalletClient(loadTime);
        return walletClient;
    }
    useEffect(() => {

        const viemInteractions = async () => {
            let startTime;
            let endTime;
            let loadTime;
            
            // create client
            await createClient();

            const walletClient = await createWallet();


            // sign message
            const pk = generatePrivateKey();
            const account = privateKeyToAccount(pk);
            startTime = performance.now();
            const signature = await walletClient.signMessage({message:"Hello world", account: account});
            endTime = performance.now();
            loadTime = endTime - startTime;
            setLoadSignTime(loadTime);
            setSignature(signature);

            // sign transaction
            startTime = performance.now();
            await account.signTransaction({
                maxFeePerGas: BigInt(20),
                maxPriorityFeePerGas: BigInt(3),
                gas: BigInt(21000),
                nonce: 69,
                to: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
                chainId: 11155111,
              })
            endTime = performance.now();
            loadTime = endTime - startTime;
            setLoadSignTransactionTime(loadTime);
        }
        if (typeof window !== "undefined")
        viemInteractions();
    }, []);

    return (
        <div>
            <div>
                Viem package
            </div>
            <p data-cy="viem-createClient-time">
                Loading time to create client: {loadTimeCreateClient > 0 ? loadTimeCreateClient : `Loading...`}ms
            </p>
            <p data-cy="viem-createWalletClient-time">
                Loading time to create Wallet client: {loadTimeCreateWalletClient > 0 ? loadTimeCreateWalletClient : `Loading...`}ms
            </p>
            <p data-cy="viem-sign-time">
                Loading time to sign message: {loadSignTime ? loadSignTime : `Loading...`}ms
            </p>
            <p data-cy="viem-signTransaction-time">
                Loading time to sign transaction: {loadSignTransactionTime ? loadSignTransactionTime : `Loading...`}ms
            </p>
            <p>
                Signature: {signature}
            </p>
        </div>
    )
};