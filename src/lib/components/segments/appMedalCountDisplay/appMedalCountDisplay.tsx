import { MedalData } from "@/lib/utils";
import AppFlagComponent from "../../blocks/appFlagComponent/appFlagComponent";

const AppMedalCountDisplay = ({ medalData }: { medalData: MedalData[] }) => {
  return (
    <>
      {medalData
        .slice(0, 10)
        .map(({ code, position, gold, silver, bronze, total }, i) => (
          <div
            key={i}
            className="grid grid-cols-6 gap-8 items-center py-2 border-b hover:bg-gray-50  border-gray-200"
          >
            <div>{i + 1}</div>
            <div className="flex items-center gap-4">
              <AppFlagComponent code={code} position={position} />
            </div>
            <div className="ml-3">{gold}</div>
            <div className="ml-3">{silver}</div>
            <div className="ml-3">{bronze}</div>
            <div className="font-bold">{total}</div>
          </div>
        ))}
    </>
  );
};

export default AppMedalCountDisplay;
