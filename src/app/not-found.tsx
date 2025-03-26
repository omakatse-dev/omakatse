import Link from "next/link";
import Image from "next/image";
import Button from "@/components/common/Button";

export default function NotFound() {
  return (
    <div className="my-52 flex flex-col gap-8">
      <Image
        src="/assets/Animated_404.svg"
        alt="404 Not Found"
        width={309}
        height={229}
        className=""
      />
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
