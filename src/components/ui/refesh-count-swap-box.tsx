// "use client";

// import { type FC, useEffect, useState } from "react";

// const reloadAfter = 15; // in second

// export const RefeshCountSwapBox: FC = () => {
//   const circumference = 2 * Math.PI * 800;
//   const [currentCount, setCurrentCount] = useState<number>(1);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentCount((prev) => {
//         if (prev < reloadAfter) {
//           return prev + 1;
//         }
//         return 1;
//       });
//       // Only update the state for display if necessary, e.g., when user clicks a button
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center gap-[10px] px-[10px] py-[6px]">
//       <svg viewBox="0 0 288 288" className="h-7 w-7 -rotate-90 transform">
//         <circle
//           cx="145"
//           cy="145"
//           r="120"
//           stroke="currentColor"
//           strokeWidth="30"
//           fill="transparent"
//           className="text-black-700"
//         />
//         <circle
//           cx="145"
//           cy="145"
//           r="120"
//           stroke="currentColor"
//           strokeWidth="30"
//           fill="transparent"
//           strokeDasharray={circumference}
//           strokeDashoffset={
//             circumference - (currentCount / 100) * circumference
//           }
//           className="text-pink-400"
//           style={{ transition: "stroke-dashoffset 0.35s ease 0s" }}
//         />
//       </svg>
//       <div className="absolute text-base text-[#D2738B]">{`${currentCount}`}</div>
//     </div>
//   );
// };
