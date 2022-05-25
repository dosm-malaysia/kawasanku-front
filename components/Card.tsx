interface CardProps {
  rounded?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Card = ({ rounded = true, className, children }: CardProps) => (
  <div
    className={`
      h-full w-full bg-white p-4
      ${rounded ? "rounded-lg" : ""} 
      ${className}
    `}
  >
    {children}
  </div>
);

export default Card;
