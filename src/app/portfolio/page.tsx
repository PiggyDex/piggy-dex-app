import { PortfolioManagement } from "@/components";
import { Navbar, PageLayout } from "@/layout";

export default function Portfolio() {
  return (
    <PageLayout>
      <Navbar />
      <PortfolioManagement />
    </PageLayout>
  );
}
