'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [advice, setAdvice] = useState('Loading advice...');

  // Function to fetch advice from the API
  const fetchAdvice = async () => {
    try {
      const res = await fetch('https://api.adviceslip.com/advice');
      const data = await res.json();
      console.log('🚀 ~ fetchAdvice ~ data:', data);
      setAdvice(data.slip.advice);
    } catch (err) {
      console.error(err);
      setAdvice('Failed to fetch advice.');
    }
  };

  // useEffect to call fetchAdvice on component mount
  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col bg-slate-800 relative min-w-96 min-h-96 rounded-xl px-8 pt-12 pb-20">
        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-green-800 font-semibold">Advice #1</p>

          <p className="flex flex-col justify-center text-center min-h-64 w-4/5 p-auto">
            {advice}
          </p>
        </div>

        <Image
          src="/pattern-divider-mobile.svg"
          width={320}
          height={18}
          alt="divider-mobile"
        />

        <button
          onClick={fetchAdvice}
          className="absolute top-[90%] left-[39%] flex items-center justify-center h-20 w-20 rounded-full bg-green-300"
        >
          <Image src="/icon-dice.svg" width={36} height={36} alt="dice" />
        </button>
      </div>
    </main>
  );
}
