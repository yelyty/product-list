import ProductCard from "./ProductCard";
import type { ProductsByCategory } from "@/types";

type ProductGridProps = {
  isLoading: boolean;
  products: ProductsByCategory;
};

const ProductsGrid = ({ isLoading, products }: ProductGridProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const allProducts = Object.values(products).flat();

  if (allProducts.length === 0) {
    return (
      <div className="w-full text-center text-gray-500 py-8">
        Nothing to show
      </div>
    );
  }

  return (
    <section className="grid grid-cols-3 gap-3 w-full">
      {allProducts.map(({ id, title, price, images, rating }) => {
        return (
          <ProductCard
            key={id}
            id={id}
            title={title}
            price={price}
            images={images}
            rating={rating}
          />
        );
      })}
    </section>
  );
};

export default ProductsGrid;
