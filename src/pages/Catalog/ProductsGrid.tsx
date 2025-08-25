import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";

const ProductsGrid = () => {
  const { isLoading, productsByCategory } = useProducts();

  if (isLoading) {
    return <div>Skeleton</div>;
  }

  return (
    <section className="grid grid-cols-3 gap-3 w-full">
      {Object.values(productsByCategory).map(({ id, title, price, images }) => {
        return (
          <ProductCard
            key={id}
            id={id}
            title={title}
            price={price}
            images={images}
          />
        );
      })}
    </section>
  );
};

export default ProductsGrid;
