import { PortfolioManagement } from "@/components";
import { Page } from "@/constants";

export default function Portfolio() {
  return <PortfolioManagement showPage={Page.AddLiquidity} />;
}
