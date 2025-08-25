import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";

const ProductsGrid = () => {
  const { isLoading, productsByCategory } = useProducts();

  if (isLoading) {
    return <div>Skeleton</div>;
  }

  return (
    <section className="grid grid-cols-3 gap-3 w-full">
      {Object.values(productsByCategory).map(({ title, price, images }) => {
        return <ProductCard title={title} price={price} images={images} />;
      })}
    </section>
  );
};

export default ProductsGrid;
