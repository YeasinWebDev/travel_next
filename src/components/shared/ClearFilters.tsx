"use client";

import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function ClearFilters({route}: {route: string}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      router.push(route);
    });
  };
  return <Button disabled={isPending} onClick={handleClick}>Clear</Button>;
}

export default ClearFilters;
