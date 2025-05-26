"use client";
import { useMedalStore } from "@/store/flagStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { BtnType } from "../components/blocks/appButton/appButton";

export const setSortOption = useMedalStore.getState().setSortOption;
function useQueryParam() {
  const searchParams = useSearchParams();

  const sortValue = useMemo(() => {
    return searchParams.get("sort");
  }, [searchParams]);

  useEffect(() => {
    if (sortValue) {
      console.log(sortValue);
      setSortOption(sortValue as BtnType);
    }
  }, [sortValue]);
}

export default useQueryParam;
