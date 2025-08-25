import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/types";

type ProductCardProps = Pick<Product, "title" | "price" | "images">;

const ProductCard = ({ title, price }: ProductCardProps) => {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{price}</CardDescription>
      <CardFooter>
        <Button>View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
