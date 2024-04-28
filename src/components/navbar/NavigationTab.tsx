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
    <div className="flex px-4 py-3">
      <Image src={"/icons/angle-right.svg"} alt="" width={24} height={24} />
      <div className="px-2">
        <Image src={props.svgSource} alt="" width={24} height={24} />
      </div>
      <span className="text-base text-[#EFEFEF]">{props.text}</span>
    </div>
  );
};
