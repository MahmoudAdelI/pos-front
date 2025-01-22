import React from "react";
import getToken from "../auth/getToken";
import axios from "axios";
import { productSchema } from "./types";
import { notFound } from "next/navigation";

const products = async () => {
  const token = await getToken();
  console.log(token);

  const { data: productsResponse } = await axios.get(
    "http://localhost:5091/api/Product/GetAll",
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  console.log("axios data: ", productsResponse);
  const products = productSchema.safeParse(productsResponse);
  console.log("zod data :", products.data);
  if (!products.success) {
    notFound();
  }
  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold">Products</h1>
      <div className="mb-4 flex justify-between">
        <button>Filter</button>
        <form className="border bg-navBorder">
          <input type="text" className="outline-none" />
        </form>
      </div>
      <div className="flex flex-wrap gap-4">
        {products.data.map((product) => (
          <div key={product.id} className="h-40 w-40 border border-navBorder">
            <div className="h-[70%] bg-red-700">
              <img
                src="https://placehold.co/160x112/png"
                className="object-cover"
              />
            </div>

            <div className="flex justify-between p-1">
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold">{product.name}</h3>
                <h4 className="text-xs">{product.sellingPrice} $</h4>
              </div>

              {product.quantity !== 0 && (
                <h4 className="justify-self-center text-xs">Out of stock</h4>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default products;
