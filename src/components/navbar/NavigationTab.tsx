import Image from "next/image";
import { type FC } from "react";

type NavigationTabProps = {
  svgSource: string;
  text: string;
  isHover?: boolean;
  className?: string;
};

export const NavigationTab: FC<NavigationTabProps> = (
  props: NavigationTabProps = {
    svgSource: "",
    text: "",
    isHover: false,
  },
) => {
  return (
    <div className="py-3 px-4 flex">
      <Image src={"/icons/angle-right.svg"} alt="" width={24} height={24} />
      <div className="px-2">
        <Image src={props.svgSource} alt="" width={24} height={24} />
      </div>
      <span className="text-[#EFEFEF] text-base">{props.text}</span>
    </div>
  );
};
