import useSWR, { Fetcher } from 'swr';

type slipProps = {
  id: number;
  advice: string;
};

const useGetRequest = (route: string) => {
  const fetcher: Fetcher<{ slip: slipProps }> = async (route: string) => {
    const res = await fetch(route);

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      throw error;
    }

    return res.json();
  };

  return useSWR(route, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

export default useGetRequest;
