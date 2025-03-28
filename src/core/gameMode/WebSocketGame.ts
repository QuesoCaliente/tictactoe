import { io } from "socket.io-client";
import { GameMode } from "./GameMode";

export class WebSocketGame implements GameMode {
  private socket = io("http://localhost:4000/", {
    withCredentials: true,
  });
  private setState: React.Dispatch<React.SetStateAction<any>>;

  constructor(setState: React.Dispatch<React.SetStateAction<any>>) {
    this.setState = setState;

    this.socket.on("boardState", (board) => {
      this.setState((prevState: any) => ({ ...prevState, board }));
    });

    this.socket.on("move", ({ row, col, turn }) => {
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
    });

    this.socket.on("reset", () => {
      this.setState((prevState: any) => ({
        ...prevState,
        board: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        winner: null,
      }));
    });

    this.socket.on("roomCreated", (roomId) => {
      this.setState((prevState: any) => ({ ...prevState, roomId }));
    });

    this.socket.on("roomJoined", (roomId) => {
      this.setState((prevState: any) => ({ ...prevState, roomId }));
    });

    this.socket.on("error", (errorMessage) => {
      this.setState((prevState: any) => ({ ...prevState, error: errorMessage }));
    });
  }

  move(row: number, col: number, turn: "X" | "O") {
    const state = this.setState as any;
    if (!state.roomId) return;
    this.socket.emit("move", { roomId: state.roomId, row, col, turn });
  }

  reset() {
    const state = this.setState as any;
    if (!state.roomId) return;
    this.socket.emit("reset", state.roomId);
  }

  createRoom() {
    this.socket.emit("createRoom");
  }

  joinRoom(roomId: string) {
    this.socket.emit("joinRoom", roomId);
  }
}
