import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "green" | "red";
  fit?: boolean;
}

export default function Button({
  children,
  onClick,
  variant = "default",
  disabled,
  fit,
  ...props
}: ButtonProps) {
  const variants = {
    default: "bg-brand-yellow-200 hover:bg-brand-yellow-100 btn-shadow",
    green: "bg-brand-green-200 hover:bg-brand-green-100 btn-shadow-green",
    red: "bg-red-400 hover:bg-red-300 btn-shadow-red",
    disabled: "bg-gray-400 cursor-not-allowed btn-shadow-gray opacity-50",
  };

  return (
    <button
      disabled={disabled}
      {...props}
      onClick={() => onClick && onClick()}
      className={`${variants[(disabled && "disabled") || variant]} ${
        fit ? "lg:w-fit" : "lg:w-full"
      } w-full rounded-2xl  py-4 font-bold text-brand-green-400 transition-colors duration-300 ease-in-out  disabled:bg-gray-400 md:px-32`}
    >
      {children}
    </button>
  );
}
