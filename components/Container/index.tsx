import { FunctionComponent } from "react";

interface ContainerProps {
  backgroundColor?: string;
  className?: string;
  children: React.ReactNode;
}

const Container: FunctionComponent<ContainerProps> = ({
  backgroundColor,
  className,
  children,
}) => (
  <div className={`flex h-full w-full justify-center ${backgroundColor}`}>
    <div className={`h-full w-full max-w-screen-xl px-3 ${className}`}>
      {children}
    </div>
  </div>
);

export default Container;
