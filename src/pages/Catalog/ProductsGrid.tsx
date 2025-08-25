import type { Product } from "@/types";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  isLoading: boolean;
  products: Product[];
};

const ProductsGrid = ({ isLoading, products }: ProductGridProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="w-full text-center text-gray-500 py-8">
        Nothing to show
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
      {products.map(({ id, title, price, images, rating }) => {
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
