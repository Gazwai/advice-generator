"use client";

import Image from "next/image";
import { useState } from "react";
import useGetRequest from "./hooks/useFetch";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const { data, mutate } = useGetRequest("https://api.adviceslip.com/advice");

  const handleMutate = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    mutate();
  };

  const adviceId = data?.slip?.id || "0";
  const advice = data?.slip?.advice;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex min-h-80 w-96 flex-col rounded-xl bg-slate-700 px-8 pb-20 pt-12 md:w-[32rem]">
        <div className="flex flex-col items-center gap-4">
          <p className="text-center font-semibold tracking-[.5em] text-green-300">
            ADVICE #{adviceId}
          </p>

          <p className="mb-8 flex min-h-40 w-4/5 flex-col justify-center text-center text-2xl font-medium">
            {advice && `"${advice}"`}
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
          aria-label="Load new advice"
          disabled={loading}
          onClick={handleMutate}
          className="absolute left-[39%] top-[90%] flex h-20 w-20 items-center justify-center rounded-full bg-green-300 hover:shadow-[0_0_3rem_0.5rem_rgba(0,0,0,0.3)] hover:shadow-green-300 md:left-[42%]"
        >
          <div className={loading ? "animate-spin" : ""}>
            <Image src="/icon-dice.svg" width={36} height={36} alt="dice" />
          </div>
        </button>
      </div>
    </main>
  );
}
