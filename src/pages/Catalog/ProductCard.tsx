import {
  Image as ImageIcon,
  Star as StarIcon,
  Heart as HeartIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/types";
import { useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";

type ProductCardProps = Pick<
  Product,
  "id" | "title" | "price" | "images" | "rating"
>;

const ProductCardSkeleton = () => {
  return (
    <div className="absolute inset-0 z-10 rounded-2xl bg-card">
      <div className="py-6 px-4 space-y-4">
        <Skeleton className="w-full h-48 rounded-t-2xl" />
        <Skeleton className="h-5 w-3/5" />
        <Skeleton className="h-4 w-24" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
        <div className="pt-0 pb-1">
          <Skeleton className="h-9 w-28" />
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({
  id,
  images,
  title,
  price,
  rating,
}: ProductCardProps) => {
  const navigate = useNavigate();

  const primaryUrl = useMemo(() => images?.[0] ?? null, [images]);

  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState<boolean>(!!primaryUrl);

  useEffect(() => {
    setImgError(false);
    setImgLoading(!!primaryUrl);
  }, [primaryUrl]);

  const imageUrl = !imgError && primaryUrl ? primaryUrl : null;

  const [isLiked, setIsLiked] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem("likedProducts");
      if (!raw) return false;
      const likedIds = JSON.parse(raw) as number[];
      return likedIds.includes(id);
    } catch {
      return false;
    }
  });

  const openProductDetails = () => navigate(`/${id}`);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("likedProducts");
      const likedIds = raw ? (JSON.parse(raw) as number[]) ?? [] : [];
      const next = isLiked
        ? Array.from(new Set([...likedIds, id]))
        : likedIds.filter((v) => v !== id);
      localStorage.setItem("likedProducts", JSON.stringify(next));
    } catch {
      console.log("error");
    }
  }, [isLiked, id]);

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow rounded-2xl relative"
      aria-busy={imgLoading}
    >
      {imgLoading && <ProductCardSkeleton />}
      <div aria-hidden={imgLoading}>
        <CardHeader className="p-0 px-4 relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className={`w-full h-48 object-cover rounded-t-2xl ${
                imgLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setImgLoading(false)}
              onError={() => {
                setImgError(true);
                setImgLoading(false);
              }}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center bg-muted rounded-t-2xl">
              <ImageIcon className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
        </CardHeader>

        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold leading-5 truncate">
            {title}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">{price}€</p>
          <div className="flex items-center gap-2 text-gray-600 mt-3">
            <p className="text-sm font-medium">{rating}</p>
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          </div>
        </CardContent>
        <CardFooter className="pt-0 px-4 pb-1">
          <Button
            className="pointer h-9 w-28"
            onClick={openProductDetails}
            disabled={imgLoading}
          >
            View Details
          </Button>
        </CardFooter>
        <Button
          className="absolute bottom-7 right-6 rounded-full p-2 bg-white shadow hover:bg-slate-100 disabled:opacity-50"
          onClick={() => setIsLiked(!isLiked)}
          aria-pressed={isLiked}
          aria-label={isLiked ? "Unlike product" : "Like product"}
          disabled={imgLoading}
        >
          <HeartIcon
            className={`h-5 w-5 ${
              isLiked ? "text-red-500 fill-red-500" : "text-slate-600"
            }`}
          />
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
