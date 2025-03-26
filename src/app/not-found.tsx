"use client"
import Link from "next/link";
import dynamic from "next/dynamic";
import Button from "@/components/common/Button";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import AnimationData from "../assets/lotties/404.json";

export default function NotFound() {
  return (
    <div className="my-52 flex flex-col gap-8">
      <Lottie animationData={AnimationData} loop={true}/>
      <div className="flex flex-col gap-3 items-center">
        <h1>404</h1>
        <div className="bodyMD">Oops, meow meow meow</div>
      </div>
      <Button variant="primary">
        <Link href="/" passHref>
          Go back home
        </Link>
      </Button>
    </div>
  );
}
