import Head from "next/head";
import { useEffect, useState } from "react";
import Button from "../components/button";
import Header from "../components/header";
import PickPlayer from "../components/pickPlayer";
import { useTicTacToe } from "../context/index";
import { useRouter } from "next/router";

export default function Home() {
  const navigation = useRouter();
  const { setPlayer } = useTicTacToe();
  const handleVsPlayer = () => {
    navigation.push("/vsplayer");
  };
  return (
    <div className="flex min-h-screen w-full flex-col justify-center gap-10 px-5">
      <Header />
      <main className="mx-auto flex w-full max-w-lg flex-col items-center gap-3">
        <PickPlayer onMark={(mark) => setPlayer(mark.player1)} />
        <Button disabled>NEW GAME (VS CPU)</Button>
        <Button onClick={() => handleVsPlayer()} variant="green">
          NEW GAME (VS Player)
        </Button>
        <Button disabled variant="red">
          NEW GAME (Multiplayer Online)
        </Button>
      </main>
    </div>
  );
}
