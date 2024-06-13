"use client";
import { useSearchParams } from "next/navigation";
import { AddProvider } from "./add-provider";
import Step1 from "./step1";
// import Step2 from "./step2";
// import Step3 from "./step3";
export default function Home() {
    const step = useSearchParams().get("step");
    return (
        <div className="w-full flex flex-col justify-start items-start gap-5">
            <AddProvider>
                {step === "1" && <Step1 />}
                {/* {step === "2" && <Step2 />}
                {step === "3" && <Step3 />} */}
            </AddProvider>
        </div>
    );
}
