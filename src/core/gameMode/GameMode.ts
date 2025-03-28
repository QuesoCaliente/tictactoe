export interface GameMode {
    move: (row: number, col: number, turn: "X" | "O") => void;
    reset: () => void;
    createRoom?: () => void;
    joinRoom?: (roomId: string) => void;
  }
  