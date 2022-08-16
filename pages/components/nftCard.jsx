/*
 * @Author: hsl947 1506070803@qq.com
 * @Date: 2022-08-13 17:09:19
 * @LastEditors: hsl947 1506070803@qq.com
 * @LastEditTime: 2022-08-13 17:31:02
 * @FilePath: \Week4-NameOfTheProject\pages\nftCard.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const NFTCard = ({ nft }) => {
	if(!nft.media[0].gateway) return null
  return (
    <div className="w-1/4 flex flex-col overflow-hidden">
      <div className="rounded-md">
        <img
          className="object-cover h-128 w-full rounded-t-md"
          src={nft.media[0].gateway}></img>
      </div>
      <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
        <div className="">
          <h2 className="text-xl text-gray-800 whitespace-normal">
            {nft.title}
          </h2>
          <p className="text-gray-600">Id: {nft.id.tokenId.substring(61)}</p>
          {/* <p className="text-gray-600 whitespace-normal">
            {nft.contract.address}
          </p> */}
        </div>

        {/* <div className="flex-grow mt-2">
          <p className="text-gray-600 whitespace-normal">{nft.description}</p>
        </div> */}
      </div>
    </div>
  );
};
