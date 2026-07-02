import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";
import styles from "./CategorySection.module.scss";

const categories = [
  { id: 1, name: "Pure Cow Ghee", icon: "🐄" },
  { id: 2, name: "A2 Desi Ghee", icon: "🌿" },
  { id: 3, name: "Bilona Ghee", icon: "🫕" },
  { id: 4, name: "Herbal Ghee", icon: "🌱" },
  { id: 5, name: "Gift Sets", icon: "🎁" },
  { id: 6, name: "Bulk Orders", icon: "📦" },
];

const CategorySection = () => {
  return (
    <section className={styles.categorySection} id="categories">
      <div className="container">
        <AnimatedSection animation="fadeUp">
          <div className={styles.header}>
            <span className={styles.eyebrow}>Our Range</span>
            <h2>Shop By Category</h2>
            <p>Explore our handcrafted ghee collection for every need</p>
          </div>
        </AnimatedSection>

        <div className={styles.categoryList}>
          {categories.map((category, index) => (
            <AnimatedSection
              key={category.id}
              animation="scale"
              delay={index * 80}
            >
              <div className={styles.categoryCard}>
                <div className={styles.icon}>{category.icon}</div>
                <h6>{category.name}</h6>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
