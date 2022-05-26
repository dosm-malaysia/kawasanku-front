import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}

export default function Portal({ children }: PortalProps) {
  const ref = useRef<HTMLElement>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    ref.current = document.getElementById("iframe") as HTMLElement;
    setIsMounted(true);
  }, []);

  return (
    <div id="iframe">
      {isMounted ? createPortal(children, ref.current!) : null}
    </div>
  );
}
