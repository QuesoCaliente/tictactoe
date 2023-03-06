import { createContext, useContext, useState } from "react";

interface TicTacToeContext {
  state: {
    board: string[][];
    turn: "X" | "O";
    winner: "X" | "O" | null;
    score: {
      X: number;
      O: number;
    };
  };
  actions: {
    move: (row: number, col: number, turn: "X" | "O") => void;
    reset: () => void;
    checkWinner: (board: String[][]) => void;
    upScore: (player: "X" | "O") => void;
    setPlayer: (player: "X" | "O") => void;
  };
}

const defaultContext: TicTacToeContext = {
  state: {
    board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    turn: "X",
    winner: null,
    score: {
      X: 0,
      O: 0,
    },
  },
  actions: {
    move: (row: number, col: number, turn: "X" | "O") => {},
    reset: () => {},
    checkWinner: () => {},
    upScore: (player: "X" | "O") => {},
    setPlayer: (player: "X" | "O") => {},
  },
};

const TicTacToeContext = createContext<TicTacToeContext>(defaultContext);

export const useTicTacToe = () => useContext(TicTacToeContext);

export const TicTacToeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const move = (rowMove: number, col: number, turn: "X" | "O") => {
    setState((prevState) => {
      const newBoard = prevState.board.map((row, i) => {
        if (i === rowMove) {
          return row.map((cell, j) => {
            if (j === col) {
              return turn;
            }
            return cell;
          });
        }
        return row;
      });
      return {
        ...prevState,
        board: newBoard,
        turn: turn === "X" ? "O" : "X",
      };
    });
  };

  const reset = () => {
    setState((prevState) => {
      return {
        ...prevState,
        board: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        winner: null,
      };
    });
  };

  const setPlayer = (player: "X" | "O") => {
    setState((prevState) => {
      return {
        ...prevState,
        turn: player,
      };
    });
  };

  const checkWinner = (board: String[][]) => {
    let winner: "X" | "O" | null = null;

    board.forEach((row) => {
      if (row.every((cell) => cell === "X")) {
        winner = "X";
      } else if (row.every((cell) => cell === "O")) {
        winner = "O";
      }
    });

    for (let i = 0; i < board.length; i++) {
      if (
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i] &&
        board[0][i] !== ""
      ) {
        winner = board[0][i] as "X" | "O";
      }
    }

    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== ""
    ) {
      winner = board[0][0] as "X" | "O";
    }
    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] !== ""
    ) {
      winner = board[0][2] as "X" | "O";
    }

    if (winner) {
      setState((prevState) => {
        return {
          ...prevState,
          winner,
        };
      });
    }
  };

  const upScore = (player: "X" | "O") => {
    setState((prevState) => {
      return {
        ...prevState,
        score: {
          ...prevState.score,
          [player]: prevState.score[player] + 1,
        },
      };
    });
  };
  const [state, setState] = useState(defaultContext.state);
  const [actions, setActions] = useState({
    move,
    reset,
    checkWinner,
    upScore,
    setPlayer,
  });

  return (
    <TicTacToeContext.Provider
      value={{
        state,
        actions,
      }}
    >
      {children}
    </TicTacToeContext.Provider>
  );
};
