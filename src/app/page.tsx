"use client";
import HowItWorks from "@/components/home/HowItWorks";
import ChooseYourPlan from "@/components/home/ChooseYourPlan";
import Blog from "@/components/home/Blog";
import MainLandingPage from "@/components/home/MainLandingPage";

export default function Home() {
  return (
    <div className="pt-32 w-full">

      <MainLandingPage />
      <HowItWorks />
      <ChooseYourPlan />
      <Blog />

      <div className="bg-yellow flex flex-col py-15 px-8 gap-8">
        <h1 className="text-white text-center text-5xl">@Omakatse</h1>
        <div className="flex flex-row"></div>
      </div>
    </div>
  );
}
