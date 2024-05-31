'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import useGetRequest from './hooks/useFetch';

export default function Home() {
  const [slip, setSlip] = useState({ id: 0, advice: 'Loading advice...' });
  const [loading, setLoading] = useState(false);

  const { data, mutate } = useGetRequest('https://api.adviceslip.com/advice');

  useEffect(() => {
    if (data?.slip) {
      setSlip(data.slip);
    }
  }, [data?.slip]);

  const handleMutate = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    mutate();
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="flex flex-col bg-slate-700 relative w-96 min-h-80 rounded-xl px-8 pt-12 pb-20 md:w-[32rem]">
        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-green-300 font-semibold tracking-[.5em]">
            ADVICE #{slip.id ? slip.id : '0'}
          </p>

          <p className="min-h-40 flex flex-col justify-center w-4/5 mb-8 text-2xl font-medium text-center">
            &quot;
            {slip.advice ? slip.advice : 'Loading advice...'}
            &quot;
          </p>
        </div>

        <Image
          className="md:w-[32rem]"
          src="/pattern-divider-mobile.svg"
          width={320}
          height={18}
          alt="divider-mobile"
        />

        <button
          disabled={loading}
          onClick={handleMutate}
          className="absolute top-[90%] left-[39%] md:left-[42%] flex items-center justify-center
            h-20 w-20 rounded-full bg-green-300 hover:shadow-[0_0_3rem_0.5rem_rgba(0,0,0,0.3)]
          hover:shadow-green-300 disabled:cursor-wait"
        >
          <Image src="/icon-dice.svg" width={36} height={36} alt="dice" />
        </button>
      </div>
    </main>
  );
}
