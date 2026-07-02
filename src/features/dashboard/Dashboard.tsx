// import CategorySection from "./sections/CategorySection/CategorySection";
import FeaturesSection from "./sections/FeaturesSection/FeaturesSection";
import FeedbackSection from "./sections/FeedbackSection/FeedbackSection";
import HeroSection from "./sections/HeroSection/HeroSection";
// import NewsletterSection from "./sections/NewsletterSection/NewsletterSection";
import ProductSection from "./sections/ProductSection/ProductSection";
import PromoBanner from "./sections/PromoBanner/PromoBanner";
import StatsSection from "./sections/StatsSection/StatsSection";
import TestimonialsSection from "./sections/TestimonialsSection/TestimonialsSection";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <HeroSection />
      <StatsSection />
      {/* <CategorySection /> */}
      <ProductSection title="Featured Ghee" variant="featured" />
      <PromoBanner />
      {/* <ProductSection title="Trending Now" variant="trending" /> */}
      <FeaturesSection />
      <TestimonialsSection />
      <FeedbackSection />
      {/* <NewsletterSection /> */}
    </div>
  );
};

export default Dashboard;
