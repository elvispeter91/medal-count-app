import { useMemo } from "react";
import AppButton, { BtnType } from "../../blocks/appButton/appButton";

export type AppMedalFilterHeaderProps = {
  handleOnClick: (type: BtnType) => void;
  sortOption: BtnType | null;
};
const AppMedalFilterHeader = ({
  handleOnClick,
  sortOption,
}: AppMedalFilterHeaderProps) => {
  const filterButtons = useMemo(() => {
    return ["gold", "silver", "bronze", "total"].map((e, i) => (
      <AppButton
        key={`${i}${e}`}
        type={e as BtnType}
        onClick={handleOnClick}
        selectedType={sortOption}
      />
    ));
  }, [handleOnClick, sortOption]);

  return (
    <div className="grid grid-cols-6 gap-8 items-center py-2 border-b hover:bg-gray-50  border-gray-700">
      <div>#</div>
      <div></div>
      {filterButtons}
    </div>
  );
};

export default AppMedalFilterHeader;
