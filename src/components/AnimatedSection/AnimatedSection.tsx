import type { CSSProperties, ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./AnimatedSection.module.scss";

type AnimationType = "fadeUp" | "fadeLeft" | "fadeRight" | "scale";

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
}

const AnimatedSection = ({
  children,
  animation = "fadeUp",
  delay = 0,
  className = "",
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollReveal();

  const style: CSSProperties = { transitionDelay: `${delay}ms` };

  return (
    <div
      ref={ref}
      className={`${styles.animated} ${styles[animation]} ${isVisible ? styles.visible : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
