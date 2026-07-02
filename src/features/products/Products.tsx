import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import styles from "./Products.module.scss"
// import shoeImag from "@/assets/ryan-waring-164_6wVEHfI-unsplash.jpg"



const Products = () => {
  const [page, setPage] = useState(1);

  const limit = 10;
  const skip = (page - 1) * limit;

  const { data, isLoading, error } = useProducts(
    limit,
    skip
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  const totalPages = Math.ceil(
    (data?.total ?? 0) / limit
  );

  return (
    <div>
      {/* <h1>Products</h1> */}
      <div className={styles.productsGrid}>

      {data?.products.map((product) => (
        <div className={styles.cardWrapper} key={product.id}>
          <div className={styles.imageSection}>
            <button className={styles.favoriteBtn}>♡</button>
            <img
              src={product.thumbnail}
              alt="Nike Running Shoe"
              className={product.title}
            />
          </div>

          <div className={styles.cardContent}>
            <h2>{product.title}</h2>

            <div className={styles.tags}>
              <span>EU38</span>
              <span>BLACK/WHITE</span>
            </div>

            <p>
              {product.description}
            </p>

            <div className={styles.footer}>
              <div>
                <small>PRICE</small>
                <h3>${product.price}</h3>
              </div>

              <button className={styles.addButton}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ))}
      </div>
   
      {/* pagination div */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>


    </div>
  );
}
export default Products;