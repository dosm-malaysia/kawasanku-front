import { FunctionComponent } from "react";

interface TooltipProps {
  children: React.ReactNode;
}

const Tooltip: FunctionComponent<TooltipProps> = ({ children }) => {
  return (
    <div className="tooltip text-gray-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <div className="tooltip-content">{children}</div>
    </div>
  );
};
export default Tooltip;
