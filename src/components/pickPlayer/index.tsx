import React, { useEffect } from "react";
import { useState } from "react";

interface PickPlayerProps {
  onMark: (players: { player1: "X" | "O"; player2: "X" | "O" }) => void;
}

export default function PickPlayer({ onMark }: PickPlayerProps) {
  const [playersPick, setPlayersPick] = useState<{
    player1: "X" | "O";
    player2: "X" | "O";
  }>({
    player1: "X",
    player2: "O",
  });

  useEffect(() => {
    onMark(playersPick);
  }, [playersPick]);

  return (
    <section className="flex w-full flex-col items-center rounded-2xl bg-brand-green-300 p-5 text-brand-white-200">
      <h2>PICK PLAYER 1&apos;S MARK</h2>
      <div className="flex w-full">
        <MarkButton
          active={playersPick.player1 === "X"}
          mark="X"
          onClick={(mark) => setPlayersPick({ ...playersPick, player1: mark })}
        />
        <MarkButton
          active={playersPick.player1 === "O"}
          mark="O"
          onClick={(mark) => setPlayersPick({ ...playersPick, player1: mark })}
        />
      </div>
    </section>
  );
}

interface MarkButtonProps {
  mark: "X" | "O";
  onClick: (mark: "X" | "O") => void;
  active?: boolean;
}

const MarkButton = ({ mark, onClick, active }: MarkButtonProps) => {
  return (
    <button
      onClick={() => onClick(mark)}
      className={`h-20 w-20 flex-1 rounded-xl ${
        active
          ? "bg-brand-white-200 text-brand-green-300"
          : "bg-brand-green-300 text-brand-white-200"
      } font-bol btn-shadow-gray text-4xl`}
    >
      {mark}
    </button>
  );
};
