import { Button } from "react-bootstrap";
import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";
import styles from "./PromoBanner.module.scss";

const PromoBanner = () => {
  return (
    <section className={styles.banner}>
      <div className="container">
        <AnimatedSection animation="scale">
          <div className={styles.content}>
            <div className={styles.text}>
              <span className={styles.label}>Limited Offer</span>
              <h2>Festive Ghee Collection</h2>
              <p>
                Get 20% off on our premium A2 Bilona Ghee. Pure, golden,
                and traditionally churned — perfect for your festive kitchen.
              </p>
              <Button variant="light" className={styles.cta}>
                Grab the Offer
              </Button>
            </div>
            <div className={styles.decor} aria-hidden>
              <span>🫙</span>
              <span>✨</span>
              <span>🌾</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default PromoBanner;
