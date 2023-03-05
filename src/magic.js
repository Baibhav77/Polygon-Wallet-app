

/**
 * Configure Polygon Connection
 */
const polygonNodeOptions = {

  rpcUrl: 'https://polygon-rpc.com',
  chainId: 137,
};

export const magicMatic = new Magic(
  process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY,
  {

    network: polygonNodeOptions,
  },
);
magicMatic.network = 'matic';

export const maticWeb3 = new Web3(magicMatic.rpcProvider);

// Connect to Ethereum (Goerli Testnet)
const polygonTest = {

  rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
  chainId: 80001,
};

export const magicEthereum = new Magic(
  process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY,
  {
    network: polygonTest,
  },
);
magicEthereum.network = 'matice';

export const ethWeb3 = new Web3(magicEthereum.rpcProvider);