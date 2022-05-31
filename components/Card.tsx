interface CardProps {
  padding?: string;
  className?: string;
  children: React.ReactNode;
}

const Card = ({ padding, className, children }: CardProps) => (
  <div
    className={`
      h-full w-full bg-white 
      ${padding ?? "p-4"}
      ${className}
    `}
  >
    {children}
  </div>
);

export default Card;
