interface ContainerProps {
  backgroundColor?: string;
  className?: string;
  children: React.ReactNode;
}

const Container = ({
  backgroundColor,
  className,
  children,
}: ContainerProps) => (
  <div className={`flex h-full w-full justify-center ${backgroundColor}`}>
    <div className={`h-full w-full max-w-screen-lg ${className}`}>
      {children}
    </div>
  </div>
);

export default Container;