import { GameMode } from "@/core/gameMode/GameMode";
import { LocalGame } from "@/core/gameMode/LocalGame";
import { WebSocketGame } from "@/core/gameMode/WebSocketGame";
import { createContext, useContext, useState } from "react";

interface TicTacToeState {
  status: string;
  board: string[][];
  turn: "X" | "O";
  winner: "X" | "O" | null;
  roomId: string | null;
  error: string | null;
  score: {
    X: number;
    O: number;
  };
}

interface TicTacToeContextType {
  state: TicTacToeState;
  gameMode: GameMode;
  switchMode: (mode: 'local' | 'online') => void;
  setPlayer: (player: "X" | "O") => void;
  updateScore: (player: "X" | "O") => void;
  checkWinner: () => void;
}

const TicTacToeContext = createContext<TicTacToeContextType | null>(null);

export const useTicTacToe = () => {
  const context = useContext(TicTacToeContext);
  if (!context) throw new Error("Debe usarse dentro de TicTacToeProvider");
  return context;
};

export const TicTacToeProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<TicTacToeState>({
    status: "idle",
    board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    turn: "X",
    winner: null,
    roomId: null,
    error: null,
    owner: {
      id: "",
      option: "",
    },
    opponent: {
      id: "",
      option: "",
    },
    score: {
      X: 0,
      O: 0,
    },
  });

  const [gameMode, setGameMode] = useState<GameMode>(new LocalGame(setState));

  const checkWinner = () => {
    const { board } = state;
    const winningCombinations = [
      // Filas
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      // Columnas
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      // Diagonales
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];

    for (let combination of winningCombinations) {
      if (combination.every(cell => cell === "X")) {
        setState((prev) => ({ ...prev, winner: "X" }));
        updateScore("X");
        return;
      }
      if (combination.every(cell => cell === "O")) {
        setState((prev) => ({ ...prev, winner: "O" }));
        updateScore("O");
        return;
      }
    }

    // Empate
    if (board.every(row => row.every(cell => cell !== "")) && !state.winner) {
      setState((prev) => ({ ...prev, status: "draw" }));
    }
  };

  const switchMode = (mode: "local" | "online") => {
    if (mode === "online") setGameMode(new WebSocketGame(setState));
    else setGameMode(new LocalGame(setState));
  };
  const updateScore = (player: "X" | "O") => {
    setState((prev) => ({
      ...prev,
      score: { ...prev.score, [player]: prev.score[player] + 1 },
    }));
  };

  const setPlayer = (player: "X" | "O") => {
    setState((prev) => ({ ...prev, turn: player }));
  };

  return (
    <TicTacToeContext.Provider value={{ state, gameMode, switchMode, setPlayer, updateScore, checkWinner }}>
      {children}
    </TicTacToeContext.Provider>
  );
};
