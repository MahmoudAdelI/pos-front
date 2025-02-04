import { AddProductFormType } from "@/app/products/add-product/types";
import { addProduct } from "@/app/utils/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useAddProduct = (reset: VoidFunction, token: string) => {
  return useMutation({
    mutationFn: (data: AddProductFormType) => addProduct(data, token),
    onSuccess: () => {
      reset();
      toast.success("Product has been added successfully");
    },
    onError: (error) => toast.error(error.message),
  });
};

export default useAddProduct;
