import React from "react";
import Image from "next/image";
import Link from "next/link";
import aboutImg from "@/public/images/ma_hero_bcg.jpg"; // Make sure to place your image in the public folder

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-blue-800">
      {/* If you want to add PageHero later */}
      {/* <PageHero title='about' /> */}

      <section className="grid gap-16 py-8 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="w-full">
          <Image
            src={aboutImg}
            alt="Max's Axes"
            className="block w-full rounded-md h-[500px] object-cover"
            width={800}
            height={500}
            priority
          />
        </div>

        <article className="max-w-3xl mx-auto lg:max-w-none">
          <div className="title text-left text-blue-100 mb-4">
            <h2 className="text-3xl font-bold">About the axes</h2>
            <div className="underline h-1 bg-blue-500 w-20 mt-2"></div>
          </div>

          <p className="text-gray-300 leading-relaxed mt-8 mb-4 max-w-[45em] mx-auto">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
            accusantium sapiente tempora sed dolore esse deserunt eaque
            excepturi, delectus error accusamus vel eligendi, omnis beatae.
            Quisquam, dicta. Eos quod quisquam esse recusandae vitae neque
            dolore, obcaecati incidunt sequi blanditiis est exercitationem
            molestiae delectus saepe odio eligendi modi porro eaque in libero
            minus unde sapiente consectetur architecto. Ullam rerum, nemo iste
            ex, eaque perspiciatis nisi, eum totam velit saepe sed quos
            similique amet. Ex, voluptate accusamus nesciunt totam vitae esse
            iste.
          </p>

          <Link
            href="/"
            className="link-btn inline-block bg-blue-500 text-blue-100 py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors mt-4"
          >
            Back Home
          </Link>
        </article>
      </section>
    </main>
  );
};

export default AboutPage;
