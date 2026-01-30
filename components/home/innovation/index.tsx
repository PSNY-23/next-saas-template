"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { pageData } from "@/utils/data";

const { innovationList } = pageData;

function Innovation() {
  const ref = useRef(null);
  const inView = useInView(ref);

  const bottomAnimation = (index: number) => ({
    initial: { y: "25%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "25%", opacity: 0 },
    transition: { duration: 0.3, delay: 0.3 + index * 0.3 },
  });
  return (
    <section id="services">
      <div ref={ref} className="2xl:py-20 py-11">
        <div>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col justify-center items-center gap-10 lg:gap-16">
              <motion.div
                {...bottomAnimation(1)}
                className="max-w-(--breakpoint-Xsm) text-center"
              >
                <h2>
                  <TextGenerateEffect
                    words="Where innovation meets"
                    delay={0.4}
                    className="text-3xl md:text-5xl"
                  />
                  <TextGenerateEffect
                    words="aesthetics"
                    delay={1}
                    className="italic font-normal instrument-font text-3xl md:text-5xl"
                  />
                </h2>
              </motion.div>
              <div ref={ref} className="w-full">
                <div className="grid auto-rows-max grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 w-full">
                  {innovationList?.map((items, index) => {
                    return (
                      <motion.div
                        key={index}
                        className={`${items.bg_color} flex flex-col p-8 rounded-2xl gap-6 lg:gap-9`}
                        initial={{
                          scale: 1.2,
                          opacity: 0,
                          filter: "blur(8px)",
                        }}
                        animate={
                          inView
                            ? { scale: 1, opacity: 1, filter: "blur(0px)" }
                            : {}
                        }
                        transition={{
                          duration: 0.6,
                          delay: 0.3 + index * 0.2,
                          ease: "easeInOut",
                        }}
                      >
                        <div>
                          <Image
                            src={items.image}
                            alt="image"
                            height={40}
                            width={40}
                          />
                        </div>
                        <div>
                          <h3 className={`text-2xl ${items.txt_color}`}>
                            {items.title.split("\n")?.map((line, i: number) => (
                              <React.Fragment key={i}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                          </h3>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 xl:flex xl:flex-row bg-foreground text-background items-center justify-between py-6 px-4 sm:px-12 rounded-3xl w-full">
              <h4 className="text-center text-xl md:text-3xl font-semibold xl:text-left">
                See Our Work in Action.
                <br /> Start Your Creative Journey with Us!
              </h4>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <Link
                  href="/contact"
                  className="bg-background text-foreground group gap-2 font-medium rounded-full flex items-center lg:gap-4 py-2 pl-5 pr-2 border hover:text-background  hover:bg-transparent  transition-all duration-200 ease-in-out"
                >
                  <span className="group-hover:translate-x-9 transform transition-transform duration-200 ease-in-out">
                    Let’s Collaborate
                  </span>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:-translate-x-36 transition-all duration-200 ease-in-out"
                  >
                    <rect
                      width="32"
                      height="32"
                      rx="16"
                      fill="#1B1D1E"
                      className=" transition-colors duration-200 ease-in-out group-hover:fill-white"
                    />
                    <path
                      d="M11.832 11.3335H20.1654M20.1654 11.3335V19.6668M20.1654 11.3335L11.832 19.6668"
                      stroke="white"
                      strokeWidth="1.42857"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:stroke-black"
                    />
                  </svg>
                </Link>
                <Link
                  href="/#work"
                  className="bg-background text-foreground group gap-2 font-medium rounded-full flex items-center lg:gap-4 py-2 pl-5 pr-2 border hover:text-background  hover:bg-transparent  transition-all duration-200 ease-in-out"
                >
                  <span className="hover:translate-x-9 transform transition-transform duration-200 ease-in-out">
                    View Portfolio
                  </span>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:-translate-x-30 transition-all duration-200 ease-in-out "
                  >
                    <rect width="32" height="32" rx="16" fill="white" />
                    <path
                      d="M11.832 11.3334H20.1654M20.1654 11.3334V19.6668M20.1654 11.3334L11.832 19.6668"
                      stroke="#1B1D1E"
                      strokeWidth="1.42857"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Innovation;
