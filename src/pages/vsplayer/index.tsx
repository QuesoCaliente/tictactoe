import Image from "next/image";
import React from "react";
import { useTicTacToe } from "../../context";
import { useEffect } from "react";
import Modal from "@/components/modal";
import { motion } from "framer-motion";

export default function VsPlayer() {
  const { state, checkWinner, gameMode } = useTicTacToe();

  useEffect(() => {
    checkWinner();
  }, [state.board]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={["mx-auto mt-32 px-5 md:max-w-2xl lg:px-0 "].join(" ")}
    >
      <div className="mb-5 flex flex-col items-center justify-around gap-5 lg:flex-row">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          exit={{ opacity: 0, y: 100 }}
          className="flex-[1]"
        >
          <Image src="/logo.svg" alt="Logo" width={100} height={100} />
        </motion.div>
        <div className="flex w-fit flex-[3] justify-around gap-5">
          <button className="bg-brand-green-300 py-4 px-5 font-bold text-brand-white-200">
            {state.turn} TURN
          </button>
          <button
            onClick={() => gameMode.reset()}
            className="bg-brand-green-300 py-4 px-5 font-bold text-brand-white-200"
          >
            Reload
          </button>
        </div>
      </div>
      <Board />
    </motion.div>
  );
}

export const Board = () => {
  const { state, gameMode } = useTicTacToe();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
      },
    },
  };

  return (
    <>
      <Modal />
      <div className="flex flex-col gap-5">
        {state.board.map((row, i) => {
          return (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              key={i}
              className="grid grid-cols-3 gap-4 lg:gap-8"
            >
              {row.map((cell, j) => {
                return (
                  <Cell
                    key={j}
                    value={cell as "X" | "O"}
                    onClick={() => gameMode.move(i, j, state.turn)}
                    isDisabled={cell !== ""}
                  />
                );
              })}
            </motion.div>
          );
        })}
        <div className="flex w-full flex-col items-center justify-between gap-3 lg:flex-row">
          <div className="flex w-full flex-col items-center justify-center gap-3 rounded-xl bg-brand-green-200 p-3 lg:w-[202px]">
            <span className="text-xl">Player X</span>
            <span className="text-3xl">{state.score.X}</span>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-3 rounded-xl bg-brand-white-200 p-3 lg:w-[202px]">
            <span className="text-xl">Ties</span>
            <span className="text-xl">not available</span>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-3 rounded-xl bg-brand-yellow-200 p-3 lg:w-[202px]">
            <span className="text-xl">Player O</span>
            <span className="text-3xl">{state.score.O}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export const Cell = ({
  onClick,
  value,
  isDisabled,
}: {
  onClick?: () => void;
  value?: "X" | "O";
  isDisabled?: boolean;
}) => {
  const animatedCell = {
    hidden: { opacity: 0, scale: 0 },
    show: { opacity: 1, scale: 1 },
  };
  return (
    <motion.div
      variants={animatedCell}
      className="shadow-cell flex h-[80px] w-full items-center justify-center rounded-xl bg-brand-green-300 lg:h-[140px]"
    >
      <button
        className="flex h-full w-full items-center justify-center rounded-xl"
        onClick={onClick}
        disabled={isDisabled}
      >
        {value === "X" ? <XIcon /> : value === "O" ? <OIcon /> : null}
      </button>
    </motion.div>
  );
};

export const XIcon = () => {
  return (
    <svg
      width="64px"
      height="64px"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      stroke="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill="#31C3BD"
          d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
        ></path>
      </g>
    </svg>
  );
};

export const OIcon = () => {
  return (
    <svg
      width="64px"
      height="64px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          stroke="#F2B137"
          strokeWidth="2"
        ></path>{" "}
      </g>
    </svg>
  );
};
