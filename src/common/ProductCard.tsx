import { Button } from "react-bootstrap";
import { FiShoppingBag } from "react-icons/fi";
import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";
import styles from "./ProductCard.module.scss";

export interface Product {
  id: number;
  name: string;
  price: string;
  weight: string;
  image: string;
  tag?: string;
}

interface ProductCardProps {
  product: Product;
  delay?: number;
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({
  product,
  delay = 0,
  onQuickView,
  onAddToCart,
}: ProductCardProps) => {
  return (
    <AnimatedSection animation="fadeUp" delay={delay}>
      <div className={styles.productCard}>
        {product.tag && (
          <span className={styles.tag}>{product.tag}</span>
        )}

        <div className={styles.imageWrapper}>
          <img src={product.image} alt={product.name} />

          <div className={styles.overlay}>
            <Button
              size="sm"
              variant="light"
              className={styles.quickBtn}
              onClick={() => onQuickView?.(product)}
            >
              Quick View
            </Button>
          </div>
        </div>

        <div className={styles.content}>
          <span className={styles.weight}>{product.weight}</span>

          <h6>{product.name}</h6>

          <div className={styles.bottom}>
            <span className={styles.price}>{product.price}</span>

            <Button
              size="sm"
              variant="primary"
              className={styles.addBtn}
              onClick={() => onAddToCart?.(product)}
            >
              <FiShoppingBag />
              Add
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ProductCard;