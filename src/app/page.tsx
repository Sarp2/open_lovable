"use client";

import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";

import { trpc } from "@/trpc/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Page = () => {
  const [value, setValue] = useState<string>("");
  const invoke = trpc.invoke.useMutation({
    onSuccess: () => {
      toast.success("Background job started")
    }
  });

  const handleClick = () => {
    invoke.mutate({ value });
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Input value={value} onChange={onChange} />
      <Button disabled={invoke.isPending} onClick={handleClick}>
        Invoke Background Job
      </Button>
    </div>
  );
}

export default Page;