// import Link from "next/link";
import Footer from "@/components/Footer";
import Middle from "@/components/Middle";
import { Fragment } from "react";

export default function Home() {
  // app.tsx
  return (
    <Fragment>
      {/* grid container */}
      <div className="bg-slate-700 h-dvh flex flex-col">
        {/* main */}
        <div className="bg-red-500 h-[80%]">
          <Middle />
        </div>
        {/* === main === */}

        {/* footer */}
        <div className="bg-green-500 h-[20%]">
          <Footer />
        </div>

        {/* === footer === */}
      </div>
      {/* === grid container === */}
    </Fragment>
  );
}
