"use client";
import useProducts from "@/hooks/useProducts";
import classNames from "classnames";
import { notFound } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useSelectedProductContext } from "./Invoice";
import { Product, SelectedProduct } from "./types";

const ProductSelector = ({ token }: { token: string }) => {
  const { selectedProducts, setSelectedProducts } = useSelectedProductContext();
  const { data: products, isPending, error } = useProducts(token);
  console.log(selectedProducts);

  {
    error && notFound();
  }
  {
    isPending && <h1>Loading...</h1>;
  }
  return (
    <div className="rounded-md">
      <h1 className="mb-4 text-2xl font-semibold">Products</h1>

      <div className="flex flex-wrap justify-center gap-4">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isSelected={selectedProducts?.some((p) => p.id === product.id)}
            setSelected={setSelectedProducts}
          />
        ))}
      </div>
    </div>
  );
};

type ProductCardProps = {
  product: Product;
  isSelected: boolean | undefined;
  setSelected: Dispatch<SetStateAction<SelectedProduct[]>>;
};
const ProductCard = ({
  product,
  isSelected,
  setSelected,
}: ProductCardProps) => {
  const { increaseCount, decreaseCount } = useSelectedProductContext();
  const handleSelect = () => {
    isSelected
      ? setSelected((prev) => prev.filter((p) => p.id !== product.id))
      : setSelected((prev) => [...prev, { ...product, selectedCount: 1 }]);
  };

  return (
    <div
      onClick={handleSelect}
      className={classNames({
        "relative flex h-52 w-52 flex-col overflow-hidden rounded-md border border-navBorder transition-all":
          true,
        "!border-Primary": isSelected,
      })}
    >
      <div className="h-full bg-skeleton"></div>

      <div className="flex justify-between p-2">
        <div className="flex flex-col">
          {isSelected && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                increaseCount(product.id);
              }}
            >
              +
            </button>
          )}
          {isSelected && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                decreaseCount(product.id);
              }}
            >
              -
            </button>
          )}
          <h3 className="text-xs font-semibold">{product.name}</h3>
          <h4 className="text-xs">{product.sellingPrice} $</h4>
        </div>

        {product.quantity !== 0 && (
          <h4 className="justify-self-center text-xs">Out of stock</h4>
        )}
      </div>
    </div>
  );
};
export default ProductSelector;
