import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useProductDetails from "@/hooks/useProductDetails";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Image as ImageIcon } from "lucide-react";

const Product = () => {
  const { productId } = useParams();
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  const product = useProductDetails(Number(productId));

  if (!product) return null;

  const imageUrl = !imgError && product.images?.[0] ? product.images[0] : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Button
        variant="ghost"
        className="mb-4 gap-2"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="rounded-xl border bg-white shadow-sm">
          <CardContent className="p-4">
            {imageUrl ? (
              <div className="aspect-square w-full overflow-hidden rounded-lg">
                <img
                  src={imageUrl}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                  onError={() => setImgError(true)}
                />
              </div>
            ) : (
              <div className="w-full h-48 flex items-center justify-center bg-muted">
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="rounded-xl border bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl font-semibold">{product.title}</h1>
              {product.category && (
                <span className="shrink-0 rounded-full border px-3 py-1 text-xs font-medium text-slate-600">
                  {product.category}
                </span>
              )}
            </div>

            <div className="mt-2 text-2xl font-semibold">
              {typeof product.price === "number"
                ? `$${product.price}`
                : product.price}
            </div>

            {product.description ? (
              <p className="text-sm leading-6 text-slate-700">
                {product.description}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                No description provided.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Product;
