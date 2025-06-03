import { BtnType } from "@/lib/components/blocks/appButton/appButton";
import { MedalData } from "@/lib/utils";
import { create } from "zustand";

export type MedalStoreType = {
  data: MedalData[];
  sortOption: BtnType | null;
  setMedalData: (data: MedalData[]) => void;
  setSortOption: (sortOption: BtnType) => void;
};

export const useMedalStore = create<MedalStoreType>((set) => ({
  data: [],
  sortOption: 'gold',
  setMedalData: (data: MedalData[]) => set(() => ({ data })),
  setSortOption: (sortOption: BtnType) => set(() => ({ sortOption })),
}));


export const setMedalDataArray = (data: MedalData[]) => {
  const { setMedalData } = useMedalStore.getState();
  setMedalData(data);
};
