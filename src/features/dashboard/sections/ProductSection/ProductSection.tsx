import { Button } from "react-bootstrap";
// import { FiShoppingBag } from "react-icons/fi";
import AnimatedSection from "@/components/AnimatedSection/AnimatedSection";
import styles from "./ProductSection.module.scss";
import gheepic1 from "@/assets/images/gheePic1.png"
import ProductCard from "@/common/ProductCard";

interface Product {
  id: number;
  name: string;
  price: string;
  weight: string;
  image: string;
  tag?: string;
}

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Devyani Pure Cow Ghee",
    price: "₹599",
    weight: "500ml",
    image: gheepic1,
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "A2 Bilona Desi Ghee",
    price: "₹1,299",
    weight: "1 Litre",
    image: gheepic1,
    tag: "Premium",
  },
  {
    id: 3,
    name: "Herbal Tulsi Ghee",
    price: "₹749",
    weight: "500ml",
    image: gheepic1,
  },
  {
    id: 4,
    name: "Ghee Gift Hamper",
    price: "₹1,499",
    weight: "Combo Pack",
    image: gheepic1,
    tag: "New",
  },
];

const trendingProducts: Product[] = [
  {
    id: 5,
    name: "Buffalo Ghee",
    price: "₹699",
    weight: "500ml",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Organic A2 Ghee",
    price: "₹899",
    weight: "500ml",
    image: "https://images.unsplash.com/photo-1558642452-9d2ab7c34623?w=400&h=400&fit=crop",
    tag: "Organic",
  },
  {
    id: 7,
    name: "Family Pack Ghee",
    price: "₹2,199",
    weight: "2 Litres",
    image: "https://images.unsplash.com/photo-1576041010634-3ebb017b0957?w=400&h=400&fit=crop",
  },
  {
    id: 8,
    name: "Mini Trial Jar",
    price: "₹249",
    weight: "200ml",
    image: "https://images.unsplash.com/photo-1595855759920-865aaad9451f?w=400&h=400&fit=crop",
  },
];

interface ProductSectionProps {
  title: string;
  variant?: "featured" | "trending";
}

const ProductSection = ({ title, variant = "featured" }: ProductSectionProps) => {
  const products = variant === "trending" ? trendingProducts : featuredProducts;

  return (
    <section className={styles.productSection}>
      <div className="container">
        <AnimatedSection animation="fadeUp">
          <div className={styles.header}>
            <div>
              <span className={styles.eyebrow}>Handcrafted</span>
              <h2>{title}</h2>
            </div>
            <Button variant="link" className={styles.viewAll}>
              View All →
            </Button>
          </div>
        </AnimatedSection>

        <div className={styles.productGrid}>
          {products.map((product, index) => (
            <AnimatedSection key={product.id} animation="fadeUp" delay={index * 100}>
              <ProductCard
                key={product.id}
                product={product}
                delay={index * 100}
                onQuickView={(item) => console.log("Quick View", item)}
                onAddToCart={(item) => console.log("Add To Cart", item)}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
