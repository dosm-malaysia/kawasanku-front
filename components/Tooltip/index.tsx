interface TooltipProps {
  children: React.ReactNode;
}

const Tooltip = ({ children }: TooltipProps) => {
  return (
    <div className="tooltip">
      <svg
        fill="#13293d"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        width="16px"
        height="16px"
      >
        <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16,21h-2v-7h2V21z M15,11.5 c-0.828,0-1.5-0.672-1.5-1.5s0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5S15.828,11.5,15,11.5z" />
      </svg>

      <div className="tooltip-content">{children}</div>
    </div>
  );
};
export default Tooltip;