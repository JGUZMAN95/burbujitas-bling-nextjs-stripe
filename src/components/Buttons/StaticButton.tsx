"use client";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string; // for custom styling overrides
};

export default function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-softYellow text-sm font-extrabold py-2 px-3 w-full max-w-lg mx-auto  shadow-md 
    active:translate-y-1 
    active:shadow-inner 
    transition-all  ${className}`}
    >
      {children}
    </button>
  );
}
