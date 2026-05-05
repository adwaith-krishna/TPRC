"use client";

import { motion } from "framer-motion";
import React from "react";

export const textRevealAnimation = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

interface AnimatedTextProps {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
  type?: "word" | "character";
  delay?: number;
  stagger?: number;
  trigger?: "mount" | "inView";
}

export const AnimatedText = ({
  text,
  el: Wrapper = "p",
  className,
  once = true,
  type = "word",
  delay = 0,
  stagger,
  trigger = "inView",
}: AnimatedTextProps) => {
  // Split into words or characters
  const itemArray = type === "word" ? text.split(" ") : text.split("");
  const defaultStagger = type === "word" ? 0.04 : 0.02;

  return (
    <Wrapper className={className}>
      <motion.span
        initial="hidden"
        animate={trigger === "mount" ? "visible" : undefined}
        whileInView={trigger === "inView" ? "visible" : undefined}
        viewport={trigger === "inView" ? { once, margin: "-10%" } : undefined}
        variants={{
          visible: {
            transition: {
              staggerChildren: stagger !== undefined ? stagger : defaultStagger,
              delayChildren: delay,
            },
          },
          hidden: {},
        }}
        aria-hidden
      >
        {itemArray.map((item, index) => (
          <span key={index} className="inline-block overflow-hidden align-bottom">
            <motion.span className="inline-block" variants={textRevealAnimation}>
              {item === " " ? "\u00A0" : item}
              {type === "word" && "\u00A0"}
            </motion.span>
          </span>
        ))}
      </motion.span>
      <span className="sr-only">{text}</span>
    </Wrapper>
  );
};

export const AnimatedContainer = ({
  children,
  el: Wrapper = "div",
  className,
  once = true,
  delay = 0,
  stagger = 0.04,
  trigger = "inView",
}: {
  children: React.ReactNode;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
  delay?: number;
  stagger?: number;
  trigger?: "mount" | "inView";
}) => {
  const MotionWrapper = motion(Wrapper as any) as any;
  return (
    <MotionWrapper
      initial="hidden"
      animate={trigger === "mount" ? "visible" : undefined}
      whileInView={trigger === "inView" ? "visible" : undefined}
      viewport={trigger === "inView" ? { once, margin: "-10%" } : undefined}
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </MotionWrapper>
  );
};

export const AnimatedWord = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className || ""}`}>
      <motion.span className="inline-block" variants={textRevealAnimation}>
        {children}
      </motion.span>
    </span>
  );
};
