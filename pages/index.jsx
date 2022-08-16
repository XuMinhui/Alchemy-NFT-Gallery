import { useState } from "react";
import { NFTCard } from "./components/nftCard"

const api_key = "BMjr_vaYBecfnv1FoWVFMihloWMf_UlF"

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("0xbce3781ae7ca1a5e050bd9c4c77369867ebc307e");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(true)

  const fetchNFTs = async () => {
    let nfts;
    console.log("fetching nfts");

    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`;
    var requestOptions = {
      method: "GET",
    };

    if (!collection.length) {
      const fetchURL = `${baseURL}?owner=${wallet}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    } else {
      console.log("fetching nfts for collection owned by address");
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    }

    console.log("nfts:", nfts);
    if (nfts) {
      setNFTs(nfts.ownedNfts);
    }
  };

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET'
      };
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input
          disabled={fetchForCollection}
          className="w-1/4 border py-2 px-3 text-grey-darkest"
          type={"text"}
          onChange={(e) => {
            setWalletAddress(e.target.value);
          }}
          value={wallet}
          placeholder="输入钱包地址"></input>
        <input
          className="w-1/4 border py-2 px-3 text-grey-darkest"
          onChange={(e) => {
            setCollectionAddress(e.target.value);
          }}
          value={collection}
          type={"text"}
          placeholder="输入合约地址"></input>
        <label className="text-gray-600 flex">
          <input
            onChange={(e) => { setFetchForCollection(e.target.checked) }}
            checked={fetchForCollection}
            className="border py-2 px-3 text-grey-darkest mr-2"
            type={"checkbox"}></input>
          获取NFT集合数据
        </label>
        <button
          className={
            "disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/4"
          }
          onClick={
            () => {
              if (fetchForCollection) {
                fetchNFTsForCollection()
              } else {
                fetchNFTs()
              }
            }
          }>
          冲冲冲
        </button>
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length > 0 && NFTs.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>
    </div>
  );
};

export default Home;
