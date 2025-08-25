import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";

const ProductsGrid = () => {
  const { products } = useProducts();

  return (
    <section className="grid grid-cols-3 gap-3">
      {products.map(({ title, price, images }) => {
        return <ProductCard title={title} price={price} images={images} />;
      })}
    </section>
  );
};

export default ProductsGrid;
