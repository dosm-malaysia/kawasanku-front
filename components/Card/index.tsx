import { FunctionComponent } from "react";

interface CardProps {
  padding?: string;
  className?: string;
  children: React.ReactNode;
}

const Card: FunctionComponent<CardProps> = ({
  padding,
  className,
  children,
}) => (
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
