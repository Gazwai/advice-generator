import useSWR, { Fetcher, SWRConfiguration } from "swr";

type SlipProps = {
  id: number;
  advice: string;
};

type UseGetRequestOptions = SWRConfiguration & {
  initialData?: SlipProps;
};

const fetcher: Fetcher<{ slip: SlipProps }> = async (route: string) => {
  const response = await fetch(route, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return response.json();
};

const useGetRequest = (route: string, options?: UseGetRequestOptions) => {
  const defaultOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    ...options,
  };

  return useSWR<{ slip: SlipProps }>(route, fetcher, defaultOptions);
};

export default useGetRequest;
