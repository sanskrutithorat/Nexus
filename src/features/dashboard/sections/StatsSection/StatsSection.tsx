import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";
import styles from "./StatsSection.module.scss";

const stats = [
  { value: "15+", label: "Years of Farming", icon: "🌾" },
  { value: "10K+", label: "Jars Delivered", icon: "🫙" },
  { value: "98%", label: "Customer Satisfaction", icon: "⭐" },
  { value: "100%", label: "Pure & Natural", icon: "🐄" },
];

const StatsSection = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <AnimatedSection key={stat.label} animation="fadeUp" delay={index * 100}>
              <div className={styles.card}>
                <span className={styles.icon}>{stat.icon}</span>
                <strong className={styles.value}>{stat.value}</strong>
                <span className={styles.label}>{stat.label}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
