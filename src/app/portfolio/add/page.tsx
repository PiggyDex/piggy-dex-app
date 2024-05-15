import { PortfolioManagement } from "@/components";
import { Page } from "@/constants";
import { PageLayout } from "@/layout";

export default function Portfolio() {
  return (
    <PageLayout>
      <PortfolioManagement showPage={Page.AddLiquidity} />
    </PageLayout>
  );
}
