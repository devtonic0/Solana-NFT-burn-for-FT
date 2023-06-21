import { FC, useState, useEffect } from "react";
import useSWR from "swr";
import { EyeOffIcon } from "@heroicons/react/outline";

import { fetcher } from "utils/fetcher";

type Props = {
  details: any;
  selected: boolean,
  onSelect: (id: string) => void;
  
  onTokenDetailsFetched?: (props: any) => unknown;
};

export const NftCard: FC<Props> = ({
  details,
  selected,
  onSelect,
  onTokenDetailsFetched = () => { }
}) => {
  const [fallbackImage, setFallbackImage] = useState(false);
  const { name, uri } = details?.data ?? {};

  const { data, error } = useSWR(
    // uri || url ? getMetaUrl(details) : null,
    uri,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (!error && !!data) {
      // console.log('data', data);
      onTokenDetailsFetched(data);
    }
  }, [data, error]);

  const onImageError = () => setFallbackImage(true);
  const { image } = data ?? {};

  const [isSelected, setIsSelected] = useState(selected);

  return (
    <div className={`card bordered z-index-100 max-w-xs text-white compact rounded-md bg-gray-200 bg-opacity-40 cursor-pointer`} onClick={() => {onSelect(details.mint); setIsSelected(!isSelected) }}>
      <figure className="min-h-16 animation-pulse-color">
        {!fallbackImage || !error ? (
          <img
            src={image}
            onError={onImageError}
            className="bg-gray-200 object-cover h-40 lg:h-80"
          />
        ) : (
          // Fallback when preview isn't available
          // This could be broken image, video, or audio
          <div className="w-auto flex items-center justify-center bg-gray-200 bg-opacity-40">
            <EyeOffIcon className="h-16 w-16 text-white-500" />
          </div>
        )}
      </figure>
      <div className="card-body py-5">
        <h2 className="card-title text-md text-black text-center">{data?.name}</h2>
      </div>
      <div className="sm:flex justify-center">
        <div className={`w-full text-14-px py-3 ${isSelected ? 'selected bg-[#353435] text-white' : 'selected bg-[#D7D7D6] text-black'}`}>
          {isSelected ? 'Chosen for burn' : 'Select'}
        </div>

        {/* <SelectBurnButton tokenMintAddress={tokenMintAddress} connection={connection} publicKey={publicKey} NFTstoBurn={NFTtoBurn} /> */}
      </div>
    </div>
  );
};
