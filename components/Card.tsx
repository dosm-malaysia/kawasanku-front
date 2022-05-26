interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card = ({ className, children }: CardProps) => (
  <div
    className={`
      h-full w-full bg-white p-4
      ${className}
    `}
  >
    {children}
  </div>
);

export default Card;
