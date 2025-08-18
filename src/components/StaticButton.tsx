type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string; // for custom styling overrides
};

export default function Button({ children, onClick, className = '' }: ButtonProps) {
  return (
    <button className="font-accent bg-softYellow text-softBrown rounded-md px-6 py-2 hover:bg-softCoral hover:text-white
    transition delay-50 duration-500 ease-in-out hover:-translate-y-1 hover:scale-120"
      onClick={onClick}>
              {children}
    </button>
  );
}