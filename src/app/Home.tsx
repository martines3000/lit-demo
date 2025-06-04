'use client';

import { Button } from '@nextui-org/react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';
import { useEffect, useState } from 'react';
import { LitNodeClient } from '@lit-protocol/lit-node-client';
import { LitContracts } from '@lit-protocol/contracts-sdk';
import { LitAuthClient } from '@lit-protocol/lit-auth-client';
import { AuthMethodScope, AuthMethodType } from '@lit-protocol/constants';
import IpfsHash from 'ipfs-only-hash';
import { signInWithGitHub } from './actions/signInWithGitHub';
import type { Session } from 'next-auth';

const RELAYER_API_KEY = '';

export const Home = ({
  session,
}: {
  session: Session | null;
}) => {
  const { open } = useWeb3Modal();
  const { address, connector, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const [litNodeClient, setLitNodeClient] = useState<LitNodeClient | null>(
    null
  );

  const [litAuthClient, setLitAuthClient] = useState<LitAuthClient | null>(
    null
  );

  // const mint = async () => {
  //   const litContracts = new LitContracts({
  //     network: 'cayenne',
  //   });
  //   await litContracts.connect();

  //   const authMethod = {
  //     authMethodType: AuthMethodType.EthWallet,
  //   };

  //   const mintCost = await litContracts.pkpNftContract.read.mintCost();

  //   // const txHash = await provider.mintPKPThroughRelayer(resolvedAuthMethod!, {
  //   //   keyType: 2,
  //   //   permittedAuthMethodTypes: [resolvedAuthMethod!.authMethodType, 2],
  //   //   permittedAuthMethodIds: [authMethodId, litActionHashAsBytes],
  //   //   permittedAuthMethodPubkeys: ["0x", "0x"],
  //   //   permittedAuthMethodScopes: [
  //   //     [AuthMethodScope.SignAnything],
  //   //     [AuthMethodScope.SignAnything],
  //   //   ],
  //   //   addPkpEthAddressAsPermittedAddress: true,
  //   //   sendPkpToItself: false,
  //   // });

  //   console.log(mintCost);

  //   const litActionHash = await IpfsHash.of(litActionCode);
  //   console.log(litActionHash);
  //   console.log('my hash:', 'QmcVjRDibwv9EU375YqDzhMiMKuSxeVjDzYT8muAJkCeLd');
  //   const litActionHashAsBytes =
  //     litContracts.utils.getBytesFromMultihash(litActionHash);

  //   // Key type 2 ?
  //   // Permitted auth method types: [2] - LitAction
  //   // Permitted auth method ids: [litActionHashAsBytes] - LitAction hash
  //   // Permitted auth method pubkeys: ["0x"]
  //   // Permitted auth method scopes: [[AuthMethodScope.SignAnything]]
  //   // Add PKP ETH address as permitted address: true
  //   // Send PKP to itself: true

  //   const tx =
  //     await litContracts.pkpHelperContract.write.mintNextAndAddAuthMethods(
  //       2,
  //       [2],
  //       [litActionHashAsBytes],
  //       ['0x'],
  //       [[AuthMethodScope.SignAnything]],
  //       true,
  //       false,
  //       { value: mintCost }
  //     );

  //   console.log(tx);

  //   // const mintInfo = await litContracts.mintWithAuth({
  //   //   authMethod: authMethod,
  //   //   scopes: [
  //   //     // AuthMethodScope.NoPermissions,
  //   //     AuthMethodScope.SignAnything,
  //   //     AuthMethodScope.PersonalSign,
  //   //   ],
  //   // });

  //   // console.log(mintInfo);
  // };

  useEffect(() => {
    const initLitClients = async () => {
      if (!litNodeClient) {
        const _litNodeClient = new LitNodeClient({
          litNetwork: 'cayenne',
          debug: false,
        });

        await _litNodeClient.connect();
        setLitNodeClient(_litNodeClient);
        console.log('Lit Node Client connected');
      }

      if (!litAuthClient && litNodeClient) {
        const _litAuthClient = new LitAuthClient({
          litNodeClient: litNodeClient,
          litRelayConfig: { relayApiKey: RELAYER_API_KEY },
        });

        setLitAuthClient(_litAuthClient);
      }
    };

    initLitClients();
  }, [litNodeClient]);

  return (
    <div className="p-8 flex h-screen flex-col items-center">
      <h1 className="text-4xl mb-8">Welcome to Lit Demo!</h1>
      <div className="flex flex-1 w-full max-w-6xl space-x-2">
        <div className="flex-1 bg-red-100 space-y-4 p-4">
          <Button onClick={() => open()}>Open Connect Modal</Button>
          {isConnected && (
            <div>
              <div>Connected to {connector?.name}</div>
              <div>Address: {address}</div>
            </div>
          )}
        </div>
        <div className="flex-1 bg-blue-200">
          {!session && (
            <form action={signInWithGitHub}>
              <Button type="submit">Sign in with GitHub</Button>
            </form>
          )}

          {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
        </div>
      </div>
    </div>
  );
};
