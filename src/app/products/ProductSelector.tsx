"use client";
import useProducts from "@/hooks/useProducts";
import classNames from "classnames";
import { notFound } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { Product } from "./types";
type SelectedProduct = {
  itemId: string;
  quantity: number;
};

const ProductSelector = ({ token }: { token: string }) => {
  const [selected, setSelected] = useState<SelectedProduct[] | null>(null);
  const { data: products, isPending, error } = useProducts(token);

  {
    error && notFound();
  }
  {
    isPending && <h1>Loading...</h1>;
  }
  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold">Products</h1>

      <div className="flex flex-wrap gap-4">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isSelected={selected?.some((p) => p.itemId === product.id)}
            setSelected={setSelected}
          />
        ))}
      </div>
    </>
  );
};

type ProductCardProps = {
  product: Product;
  isSelected: boolean | undefined;
  setSelected: Dispatch<SetStateAction<SelectedProduct[] | null>>;
};
const ProductCard = ({
  product,
  isSelected,
  setSelected,
}: ProductCardProps) => {
  const handleSelect = () => {
    isSelected
      ? setSelected((prev) =>
          prev ? prev.filter((p) => p.itemId !== product.id) : null,
        )
      : setSelected((prev) =>
          prev
            ? [...prev, { itemId: product.id, quantity: 1 }]
            : [{ itemId: product.id, quantity: 1 }],
        );
  };
  return (
    <div
      onClick={handleSelect}
      className={classNames({
        "relative flex h-60 w-60 flex-col overflow-hidden rounded-md border border-navBorder":
          true,
        "!border-Primary after:absolute after:inset-0 after:h-60 after:w-60 after:bg-violet-700/10":
          isSelected,
      })}
    >
      <div className="h-full bg-skeleton"></div>

      <div className="flex justify-between p-2">
        <div className="flex flex-col">
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
