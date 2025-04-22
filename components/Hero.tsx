import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import heroImg from "@/public/images/ma_hero_bcg.jpg";
import heroImg2 from "@/public/images/ma_hero_bcg_2.png";

const Hero = () => {
  return (
    <section className="min-h-[100vh] grid place-items-start bg-blue-900 lg:grid-cols-2 lg:gap-[4rem]">
      {/* Text Content */}
      <article className="text-left w-full lg:w-[50%] p-2 lg:p-0 mx-auto my-auto">
        <h1 className="text-5xl text-blue-50 font-bold">
          Max's Axes <br />
          <div className="w-[9rem] h-[0.25rem] bg-blue-500 mt-[0.25rem]"></div>
        </h1>
        <p className="text-blue-50 text-lg mt-2">
          Get your hands around their necks. &#8482;
        </p>
        <p className="leading-5 max-w-[45em] mb-8 text-gray-300 text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis iure
          eos modi hic aperiam vitae aliquid incidunt quaerat corrupti nam?
        </p>
        <Link href={"/axes"}>
          <Button className="bg-blue-500 text-primary-10 py-1.5 px-3 tracking-wider inline-block font-normal transition-all text-sm cursor-pointer shadow-md rounded-lg border-transparent hover:text-blue-900 hover:bg-blue-400">
            <p className="text-blue-50 uppercase">shop now</p>
          </Button>
        </Link>
      </article>

      {/* Image Container */}
      <article className="hidden lg:block relative w-full  h-[400px] lg:h-[550px] p-8 mx-auto my-auto">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image src={heroImg} className="object-cover" alt="guitars" />
        </div>
        <div className="absolute bottom-0 -left-8 w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] border-4 border-blue-900 rounded-lg overflow-hidden shadow-xl">
          <Image
            src={heroImg2}
            className="object-cover pb-8"
            alt="man playing guitar"
          />
        </div>
      </article>
    </section>
  );
};

export default Hero;
