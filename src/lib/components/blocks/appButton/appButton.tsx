export type BtnType = "gold" | "silver" | "bronze" | "total";

interface AppButtonProps {
  type: BtnType;
  onClick: (type: BtnType) => void;
  selectedType: BtnType | null;
}

function AppButton({ type, onClick, selectedType }: AppButtonProps) {
  const btnType = {
    gold: "w-7 h-7  ml-[5px] rounded-full bg-yellow-500 shadow-lg",
    silver: "w-7 h-7 ml-[5px] rounded-full bg-gray-400 shadow-lg",
    bronze: "w-7 h-7 ml-[5px] rounded-full bg-orange-700 shadow-lg",
    total: "font-bold",
  };

  return (
    <div className="flex flex-col gap-1 items-start">
      <div
        className={`h-1 w-9 rounded-full transition-all duration-200 ${
          type === selectedType ? "bg-black" : "bg-transparent"
        }`}
      />
      <button className={btnType[type]} onClick={() => onClick(type)}>
        {type === "total" ? "Total" : null}
      </button>
    </div>
  );
}

export default AppButton;
