"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="min-h-[60vh] pt-20 pb-12">
      <div className="mx-auto max-w-screen-xl px-4 p lg:flex  lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Understand User Flow.
            <strong className="font-extrabold text-primary sm:block">
              {" "}
              Increase Conversion.{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed  ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={"/dashboard"}>
              <Button
                className="text-white hover:bg-secondary transition-all duration-500"
                size={"lg"}
              >
                GET STARTED
              </Button>
            </Link>
            <Button
              className="text-white bg-secondary hover:bg-primary transition-all duration-500"
              size={"lg"}
              onClick={() => alert("HEY SAAD ! 💞💞")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
