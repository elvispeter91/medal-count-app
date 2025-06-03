export type FlagComponentProp = {
  code: string;
  position: string;
};

export default function AppFlagComponent({ code, position }: FlagComponentProp) {
  return (
    <>
      <div className="flex flex-row">
        <div
          className="w-[38px] h-[23px] bg-no-repeat"
          style={{
            backgroundImage: `url("./flags.png")`,
            backgroundPosition: position,
            backgroundSize: `100% auto`,
          }}
        ></div>
        <div className="flex-1 pl-2 font-bold">{code}</div>
      </div>
    </>
  );
}
