import LottieBookAnimation from "./LottieBookAnimation";

export default function Middle() {
  return (
    <div className="grid grid-cols-2 min-h-full w-full">
      <div className="   relative">
        <p className="text-9xl font-bold absolute top-1/4 left-2">Welcome!</p>
      </div>

      <div className="bg-teal-400">
        <div style={{ width: "100%", height: "100%" }}>
          {/* <LottieBookAnimation />  */}
        </div>
      </div>
    </div>
  );
}
