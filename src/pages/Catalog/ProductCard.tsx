import { Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/types";
import { useNavigate } from "react-router";
import { useState } from "react";

type ProductCardProps = Pick<Product, "id" | "title" | "price" | "images">;

const ProductCard = ({ id, images, title, price }: ProductCardProps) => {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  const imageUrl = !imgError && images?.[0] ? images[0] : null;

  const openProductDetails = () => {
    navigate(`/${id}`);
  };
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow rounded-2xl">
      <CardHeader className="p-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-muted">
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg font-semibold truncate">
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">{price}€</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="pointer" onClick={openProductDetails}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
