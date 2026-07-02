import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";
import styles from "./TestimonialsSection.module.scss";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    review:
      "The A2 Bilona ghee tastes exactly like my grandmother's homemade ghee. Rich aroma and perfect golden color!",
    rating: 5,
  },
  {
    name: "Rajesh Patel",
    location: "Ahmedabad",
    review:
      "We've switched entirely to Devyani Farms ghee. You can taste the purity — no adulteration, just real desi ghee.",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    location: "Hyderabad",
    review:
      "Fast delivery and beautiful packaging. The gift hamper was perfect for Diwali. Highly recommend!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <AnimatedSection animation="fadeUp">
          <div className={styles.header}>
            <span className={styles.eyebrow}>Testimonials</span>
            <h2>What Our Customers Say</h2>
          </div>
        </AnimatedSection>

        <div className={styles.grid}>
          {testimonials.map((item, index) => (
            <AnimatedSection key={item.name} animation="fadeUp" delay={index * 120}>
              <div className={styles.card}>
                <div className={styles.stars}>
                  {"★".repeat(item.rating)}
                </div>
                <p>&ldquo;{item.review}&rdquo;</p>
                <div className={styles.author}>
                  <div className={styles.avatar}>
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h6>{item.name}</h6>
                    <small>{item.location}</small>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
