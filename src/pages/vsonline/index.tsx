import { useTicTacToe } from "@/context";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect } from "react";
import { Board } from "../vsplayer";

export default function Vsonline() {
  const { state, checkWinner, gameMode, switchMode } = useTicTacToe();

  useEffect(() => {
    checkWinner();
  }, [state.board]);

  useEffect(() => {
    switchMode("online")
  }, []);

  useEffect(() => {
    if (gameMode.createRoom){
      gameMode.createRoom()
    }
  }, [gameMode])
  


  return     <motion.div
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
    <h2>
      {state.roomId} ola
    </h2>
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
</motion.div>;
}
