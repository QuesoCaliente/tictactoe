import { useRouter } from "next/router";
import React from "react";
import { useTicTacToe } from "../../context/index";
import Button from "../button";

export default function Modal() {
  const { state, actions } = useTicTacToe();
  const navigation = useRouter();

  const handleNextRound = () => {
    actions.upScore(state.winner!);
    actions.reset();
  };
  if (!state.winner) return null;

  return (
    <>
      <div className="absolute top-[30%] left-0 z-10 flex h-[270px] w-full flex-col items-center gap-5 bg-brand-green-300 py-5 text-center ">
        <span className="font-bold text-brand-white-200">
          PLAYER {state.winner === "X" ? "1" : "2"} Wins!
        </span>
        <span className="text-5xl font-bold text-brand-green-200">
          <span className="text-6xl font-extrabold">{state.winner}</span> TAKES
          THE ROUND
        </span>
        <Button onClick={() => handleNextRound()} fit>
          Next Round
        </Button>
      </div>
      <div className="absolute left-0 top-0 z-0 h-screen w-screen bg-black opacity-50"></div>
    </>
  );
}
