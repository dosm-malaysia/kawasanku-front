import { FunctionComponent } from "react";
import { useTranslation } from "next-i18next";

interface ChoroplethScaleProps {
  colorScale?: string[];
}

const ChoroplethScale: FunctionComponent<ChoroplethScaleProps> = ({
  colorScale,
}) => {
  const { t } = useTranslation();

  const scale = colorScale || Array(10).fill("#FFFFFF");

  return (
    <>
      {/* COLOR SCALE */}
      <div className="grid h-3 w-full grid-cols-11">
        {scale.slice(0, -1).map((color, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundImage: `linear-gradient(to right, ${color}, ${
                  scale[index + 1]
                })`,
              }}
              className={`
                col-span-1 h-full border-y border-y-black 
                ${index === 0 ? "col-start-2 border-l border-l-black" : ""}
                ${index === scale.length - 2 ? "border-r border-r-black" : ""}
              `}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-11 text-xs">
        {/* MIN */}
        <div className="col-span-2 col-start-1 flex w-full items-center">
          <p className="w-full text-center">{t("min")}</p>
        </div>
        {/* MAX */}
        <div className="col-span-2 col-start-10 flex w-full items-center">
          <p className="w-full text-center">{t("max")}</p>
        </div>
      </div>
    </>
  );
};

export default ChoroplethScale;
