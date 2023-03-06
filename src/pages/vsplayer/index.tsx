import Image from "next/image";
import React from "react";
import { useTicTacToe } from "../../context";
import { useEffect } from "react";
import Modal from "@/components/modal";

export default function VsPlayer() {
  const { state, actions } = useTicTacToe();

  useEffect(() => {
    actions.checkWinner(state.board);
  }, [state.board]);

  return (
    <div className="mx-auto mt-32 md:max-w-2xl">
      <div className="mb-5 flex items-center justify-around">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
        <button className="bg-brand-green-300 py-4 px-5 font-bold text-brand-white-200">
          {state.turn} TURN
        </button>
        <button
          onClick={() => actions.reset()}
          className="bg-brand-green-300 py-4 px-5 font-bold text-brand-white-200"
        >
          Reload
        </button>
      </div>
      <Board />
    </div>
  );
}

const Board = () => {
  const { state, actions } = useTicTacToe();
  return (
    <>
      <Modal />
      <div className="flex flex-col gap-5">
        {state.board.map((row, i) => {
          return (
            <div key={i} className="grid grid-cols-3 gap-8">
              {row.map((cell, j) => {
                return (
                  <Cell
                    key={j}
                    value={cell as "X" | "O"}
                    onClick={() => actions.move(i, j, state.turn)}
                    isDisabled={cell !== ""}
                  />
                );
              })}
            </div>
          );
        })}
        <div className="flex w-full justify-between">
          <div className="flex w-[202px] flex-col items-center justify-center gap-3 rounded-xl bg-brand-green-200 p-3">
            <span className="text-xl">Player X</span>
            <span className="text-3xl">{state.score.X}</span>
          </div>
          <div className="flex w-[202px] flex-col items-center justify-center gap-3 rounded-xl bg-brand-white-200 p-3">
            <span className="text-xl">Ties</span>
            <span className="text-xl">not available</span>
          </div>
          <div className="flex w-[202px] flex-col items-center justify-center gap-3 rounded-xl bg-brand-yellow-200 p-3">
            <span className="text-xl">Player O</span>
            <span className="text-3xl">{state.score.O}</span>
          </div>
        </div>
      </div>
    </>
  );
};

const Cell = ({
  onClick,
  value,
  isDisabled,
}: {
  onClick?: () => void;
  value?: "X" | "O";
  isDisabled?: boolean;
}) => {
  return (
    <div className="shadow-cell flex h-[140px] w-full items-center justify-center rounded-xl bg-brand-green-300">
      <button
        className="flex h-full w-full items-center justify-center rounded-xl"
        onClick={onClick}
        disabled={isDisabled}
      >
        {value === "X" ? <XIcon /> : value === "O" ? <OIcon /> : null}
      </button>
    </div>
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