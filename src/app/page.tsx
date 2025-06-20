"use client";
import { BtnType } from "@/lib/components/blocks/appButton/appButton";
import AppHeader from "@/lib/components/blocks/appHeader/appHeader";
import AppMedalCountDisplay from "@/lib/components/segments/appMedalCountDisplay/appMedalCountDisplay";
import AppMedalFilterHeader from "@/lib/components/segments/appMedalFilterHeader/appMedalFilter";
import { getSortedMedalsArray } from "@/lib/utils";
import { setMedalDataArray, useMedalStore } from "@/store/flagStore";
import useQueryParam from "@/lib/hooks/useQueryParams";
import useMedalDataFetcher from "@/lib/hooks/useMedalDataFetcher";
import { Suspense } from "react";

function MedalContent() {
  const { data, sortOption } = useMedalStore();
  useQueryParam();
  const { isLoading } = useMedalDataFetcher();

  const handleOnClick = (type: BtnType) => {
    setMedalDataArray(getSortedMedalsArray(data, type));
  };

  if (isLoading) return <p>Loading...</p>;

  if (data.length === 0) return <p>No data available.</p>;

  return (
    <div>
      <AppHeader />
      <AppMedalFilterHeader
        handleOnClick={handleOnClick}
        sortOption={sortOption}
      />
      <AppMedalCountDisplay medalData={data} />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <MedalContent />
    </Suspense>
  );
}
