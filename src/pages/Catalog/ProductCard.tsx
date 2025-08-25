import { Image as ImageIcon, Star as StarIcon } from "lucide-react";
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

type ProductCardProps = Pick<
  Product,
  "id" | "title" | "price" | "images" | "rating"
>;

const ProductCard = ({
  id,
  images,
  title,
  price,
  rating,
}: ProductCardProps) => {
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
        <div className="flex flex-row items-center gap-1 text-gray-600 mt-3">
          <p className="text-sm font-medium">{rating}</p>
          <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="pointer" onClick={openProductDetails}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
