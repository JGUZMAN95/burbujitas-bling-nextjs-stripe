"use client";
import React from "react";

//TODO: import clsx from "clsx";
// Cleaner conditional handling of classNames

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

// Static button component with default styling and active state effects.
const StaticButton: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`bg-softYellow text-sm font-extrabold py-2 px-3 w-full max-w-lg mx-auto shadow-md 
    active:translate-y-1 
    active:shadow-inner 
    transition-all ${className || ""}`}
    >
      {children}
    </button>
  );
};

export default StaticButton;
