"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";

const Page = () => {
  const invoke = trpc.invoke.useMutation({
    onSuccess: () => {
      toast.success("Background job started")
    }
  });

  const handleClick = () => {
    invoke.mutate({ text: "John" });
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Button disabled={invoke.isPending} onClick={handleClick}>
        Invoke Background Job
      </Button>
    </div>
  );
}

export default Page;