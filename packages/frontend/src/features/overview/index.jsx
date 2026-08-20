import OverviewHero from "./components/OverviewHero";
import ChangeFeed from "./components/ChangeFeed";
export default function Overview() {
  return (
    // Removed the negative margin. Make sure your parent layout doesn't have default padding!
    <div className="w-full min-h-screen pb-12" style={{ background: "#020817" }}>
      
      {/* Hero Section */}
      <OverviewHero />
      <ChangeFeed />

      {/* Your feed, data tables, or changelog tracker components go right here */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-8">
        {/* e.g., <ChangeFeed /> or <StatsFilter /> */}
      </div>
    </div>
  );
}