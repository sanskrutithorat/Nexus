import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";
import styles from "./FeaturesSection.module.scss";

const features = [
  {
    icon: "🐄",
    title: "Grass-Fed Cows",
    desc: "Sourced from our own farm with free-grazing desi cows",
  },
  {
    icon: "🫕",
    title: "Bilona Method",
    desc: "Traditional hand-churned process for authentic taste",
  },
  {
    icon: "🔬",
    title: "Lab Tested",
    desc: "Every batch tested for purity and quality assurance",
  },
  {
    icon: "🚚",
    title: "Fresh Delivery",
    desc: "Packed fresh and delivered to your doorstep",
  },
];

const FeaturesSection = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <AnimatedSection animation="fadeUp">
          <div className={styles.header}>
            <span className={styles.eyebrow}>Why Devyani Farms</span>
            <h2>The Pure Ghee Promise</h2>
          </div>
        </AnimatedSection>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title} animation="fadeUp" delay={index * 100}>
              <div className={styles.card}>
                <div className={styles.icon}>{feature.icon}</div>
                <h5>{feature.title}</h5>
                <p>{feature.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
