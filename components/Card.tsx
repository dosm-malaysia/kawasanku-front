interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => (
  <div className="flex h-full w-full items-center justify-center rounded-lg bg-white p-2">
    {children}
  </div>
);

export default Card;
