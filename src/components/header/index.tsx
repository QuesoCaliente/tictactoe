import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header>
      <Logo />
    </header>
  );
}

export function Logo() {
  return (
    <Image
      className="mx-auto"
      src="/logo.svg"
      alt="Logo"
      width={100}
      height={100}
    />
  );
}
