import { Button } from "react-bootstrap";
import { FiArrowRight } from "react-icons/fi";
import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";
import styles from "./HeroSection.module.scss";
import gheePic1 from "@/assets/images/gheePic1.png"

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.glowOrb} aria-hidden />
      <div className={styles.glowOrb2} aria-hidden />

      <div className="container h-100">
        <div className="row h-100 align-items-center">
          <div className="col-lg-6">
            <AnimatedSection animation="fadeLeft">
              <div className={styles.content}>
                <span className={styles.badge}>
                  🌿 Farm Fresh · 100% Pure
                </span>

                <h1>
                  Pure Golden
                  <br />
                  <span className={styles.highlight}>Desi Ghee</span>
                </h1>

                <p>
                  Handcrafted using traditional bilona method from grass-fed
                  cows at Devyani Farms. Taste the richness of authentic
                  Indian ghee.
                </p>

                <div className={styles.actions}>
                  <Button variant="primary" className={styles.ctaBtn}>
                    Shop Ghee
                    <FiArrowRight />
                  </Button>
                  <Button variant="outline-primary" className={styles.outlineBtn}>
                    Our Story
                  </Button>
                </div>

                <div className={styles.trustBadges}>
                  <span>✓ Lab Tested</span>
                  <span>✓ No Preservatives</span>
                  <span>✓ A2 Certified</span>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <div className="col-lg-6">
            <AnimatedSection animation="fadeRight" delay={200}>
              <div className={styles.imageWrapper}>
                <img
                  src={gheePic1}
                  alt="Pure golden ghee in a traditional jar"
                  className={styles.heroImage}
                />
                <div className={styles.floatingCard}>
                  <span className={styles.cardIcon}>🥛</span>
                  <div>
                    <strong>500+</strong>
                    <small>Happy Families</small>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
