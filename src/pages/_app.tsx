import "../styles/globals.css";
import type { AppProps } from "next/app";
import { TicTacToeProvider } from "../context/index";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TicTacToeProvider>
      <Component {...pageProps} />
    </TicTacToeProvider>
  );
}
