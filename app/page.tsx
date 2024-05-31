'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState({ id: 0, advice: 'Loading advice...' });

  const fetchAdvice = async () => {
    try {
      const res = await fetch('https://api.adviceslip.com/advice');
      const data = await res.json();
      setData(data.slip);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col bg-slate-700 relative w-96 min-h-80 rounded-xl px-8 pt-12 pb-20 md:w-[32rem]">
        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-green-300 font-semibold tracking-[.5em]">
            ADVICE #{data?.id}
          </p>

          <p className="flex flex-col justify-center text-center min-h-40 w-4/5 p-auto text-2xl font-medium">
            &quot;{data?.advice}&quot;
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
          onClick={fetchAdvice}
          className="absolute top-[90%] left-[39%] md:left-[42%] flex items-center justify-center h-20 w-20 rounded-full bg-green-300 hover:shadow-[0_0_3rem_0.5rem_rgba(0,0,0,0.3)] hover:shadow-green-300 "
        >
          <Image src="/icon-dice.svg" width={36} height={36} alt="dice" />
        </button>
      </div>
    </main>
  );
}
