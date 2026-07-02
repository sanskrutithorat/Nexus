import { Button, Form } from "react-bootstrap";
import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";
import styles from "./NewsletterSection.module.scss";

const NewsletterSection = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <AnimatedSection animation="fadeUp">
          <div className={styles.box}>
            <span className={styles.icon}>📬</span>
            <h2>Stay Connected with Devyani Farms</h2>
            <p>
              Subscribe for recipes, farm updates, and exclusive ghee offers
              delivered to your inbox.
            </p>
            <div className={styles.form}>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
              />
              <Button variant="primary">Subscribe</Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default NewsletterSection;
