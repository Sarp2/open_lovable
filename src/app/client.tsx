"use client";

import { trpc } from "@/trpc/client";

export const Client = () => {
  const [{ data }] = trpc.createAI.useSuspenseQuery({ text: "Hello" });
  return (
    <div>{JSON.stringify(data)}</div>
  )
}