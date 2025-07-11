'use client';

import React, { type ReactNode } from 'react';
import { config, projectId } from '@/config';

import { createWeb3Modal } from '@web3modal/wagmi/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { type State, WagmiProvider } from 'wagmi';

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error('Project ID is not defined');

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

export const Providers = ({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) => {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
