import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { FiSend, FiStar } from "react-icons/fi";
import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";
import styles from "./FeedbackSection.module.scss";

const feedbackSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FeedbackForm = z.infer<typeof feedbackSchema>;

const FeedbackSection = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = async (_data: FeedbackForm) => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 800));

    toast.success("Thank you for your feedback!");
    reset();
    setRating(0);
  };

  return (
    <section className={styles.section} id="feedback">
      <div className="container">
        <div className={styles.wrapper}>
          <AnimatedSection animation="fadeLeft" className={styles.infoCol}>
            <div className={styles.info}>
              <span className={styles.eyebrow}>We Value You</span>
              <h2>Share Your Feedback</h2>
              <p>
                Your experience matters to us. Tell us about your ghee journey
                with Devyani Farms — we read every message and use your
                feedback to improve.
              </p>
              <ul className={styles.highlights}>
                <li>📝 Quick & easy form</li>
                <li>💬 We respond within 24 hours</li>
                <li>🎁 Surprise rewards for detailed reviews</li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeRight" delay={150} className={styles.formCol}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.ratingGroup}>
                <label>Your Rating</label>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`${styles.starBtn} ${
                        star <= (hoverRating || rating) ? styles.active : ""
                      }`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`Rate ${star} stars`}
                    >
                      <FiStar />
                    </button>
                  ))}
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  isInvalid={!!errors.name}
                  {...register("name")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="you@example.com"
                  isInvalid={!!errors.email}
                  {...register("email")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Your Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Tell us about your experience with our ghee..."
                  isInvalid={!!errors.message}
                  {...register("message")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.message?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Submit Feedback"}
                <FiSend />
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
