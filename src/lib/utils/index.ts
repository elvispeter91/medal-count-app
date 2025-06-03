import { useMedalStore } from "@/store/flagStore";
import { BtnType } from "../components/blocks/appButton/appButton";

export type MedalObj = {
  code: string;
  gold: number;
  silver: number;
  bronze: number;
};

export type MeppingData = {
  total: number;
  position: string;
};

export type MedalData = MedalObj & MeppingData;

export const country2FlagMapper = (data: MedalObj[]): MedalData[] => {
  return data
    .sort((a, b) => (a.code > b.code ? 1 : b.code > a.code ? -1 : 0))
    .map((e, i) => ({
      ...e,
      position: `0px ${-23 * i}px`,
      total: e.gold + e.silver + e.bronze,
    }));
};

export const getSortedMedalsArray = (
  data: MedalData[],
  type: BtnType = <BtnType>useMedalStore.getState().sortOption
) => {
  useMedalStore.getState().setSortOption(type);
  type = <BtnType>useMedalStore.getState().sortOption;

  let tieBraker: BtnType = "gold";
  if (type === "gold") {
    tieBraker = "silver";
  }

  return [...data].sort((a, b) => {
    if (b[type] !== a[type]) {
      return b[type] - a[type];
    }
    return b[tieBraker] - a[tieBraker];
  });
};
