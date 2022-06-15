import { Transition, Dialog } from "@headlessui/react";
import { useWindowWidth } from "@react-hook/window-size";
import { Fragment, FunctionComponent, useState } from "react";

import { BREAKPOINTS } from "../../../lib/constants";

interface TooltipProps {
  children: React.ReactNode;
}

const Tooltip: FunctionComponent<TooltipProps> = ({ children }) => {
  const width = useWindowWidth();
  const isMobile = width < BREAKPOINTS.SM;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="tooltip text-gray-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        onClick={() => (isMobile ? setIsOpen(true) : null)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {!isMobile ? (
        <div className="tooltip-content">{children}</div>
      ) : (
        <Transition.Root show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative h-fit transform overflow-hidden rounded bg-accent p-3 text-left text-sm text-white shadow-xl transition-all">
                    {children}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </div>
  );
};
export default Tooltip;
