import { handleError } from "@/app/products/add-product/AddProductForm";
import { AddProductFormType } from "@/app/products/add-product/types";
import { addProduct } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useAddProduct = (reset: VoidFunction, token: string) => {
  return useMutation({
    mutationFn: (data: AddProductFormType) => addProduct(data, token),
    onSuccess: () => {
      reset();
      toast.success("Product has been added successfully");
    },
    onError: (error) => handleError(error),
  });
};

export default useAddProduct;
