import { GameMode } from "./GameMode";

export class LocalGame implements GameMode {
    private setState: React.Dispatch<React.SetStateAction<any>>;
  
    constructor(setState: React.Dispatch<React.SetStateAction<any>>) {
      this.setState = setState;
    }
  
    move(row: number, col: number, turn: "X" | "O") {
      this.setState((prevState: { board: string[][]; }) => {
        const newBoard = prevState.board.map((r: string[], i: number) =>
          r.map((cell, j) => (i === row && j === col ? turn : cell))
        );
  
        return {
          ...prevState,
          board: newBoard,
          turn: turn === "X" ? "O" : "X",
        };
      });
    }
  
    reset() {
      this.setState((prevState: any) => ({
        ...prevState,
        board: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        winner: null,
      }));
    }
  }
  