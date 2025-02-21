import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "./FormInput";
import { handleError } from "../products/add-product/AddProductForm";
import { toast } from "sonner";

export type PropertyType = "brands" | "categories" | "units";
const createValidationSchema = (type: PropertyType) =>
  z.object({
    name: z
      .string()
      .min(
        2,
        `${type === "brands" ? "Brand" : type === "categories" ? "Category" : "Unit"} name must be at least 2 characters`
      )
      .max(50),
  });

interface PropertyModalProps {
  mode: PropertyType;
  isOpen: boolean;
  onClose: () => void;
  token: string;
  currentBrand: string;
}

const endpoints = {
  brands: "http://localhost:5091/api/Company",
  categories: "http://localhost:5091/api/Type",
  units: "http://localhost:5091/api/Unit",
};
const titleMap = {
  brands: "Add New Brand",
  categories: "Add New Category",
  units: "Add New Unit",
};
const Modal = ({
  mode,
  isOpen,
  onClose,
  token,
  currentBrand,
}: PropertyModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log("from the mode: ", mode);
  console.log("from the mode: ", endpoints[mode]);
  const form = useForm<z.infer<ReturnType<typeof createValidationSchema>>>({
    resolver: zodResolver(createValidationSchema(mode)),
  });
  const queryClient = useQueryClient();
  // const mutation = useMutation({
  //   mutationFn: async (
  //     data: z.infer<ReturnType<typeof createValidationSchema>>,
  //   ) =>
  //     await axios.post(
  //       endpoints[mode],
  //       // data,
  //       mode === "categories" ? { ...data, companyId: currentBrand } : data,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       },
  //     ),
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: [mode] }),

  // });
  const onSubmit = form.handleSubmit(async (data) => {
    // mutation.mutate(data);
    // onClose();
    // form.reset();
    try {
      setIsLoading(true);
      const res = await axios.post(
        endpoints[mode],
        mode === "categories" ? { ...data, companyId: currentBrand } : data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: [mode] });
      }

      onClose();
      form.reset();
    } catch (error) {
      console.error("Submission failed:", error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.message || "An unexpected error occurred";
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    form.reset();
  }, [mode, form]);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-none bg-form">
        <DialogHeader>
          <DialogTitle>{titleMap[mode]}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4">
          <FormInput
            placeholder={titleMap[mode]}
            error={form.formState.errors.name?.message}
            type="text"
            {...form.register("name")}
          />

          <div className="mt-4 flex justify-end gap-2">
            <button
              disabled={isLoading}
              className={classNames({
                "min-w-16 rounded-md bg-Primary px-3 py-2 text-white shadow-md active:translate-y-[1px] active:scale-[.97] active:bg-buttonPending active:shadow-sm":
                  true,
                "bg-buttonPending": isLoading,
              })}
              type="submit"
            >
              save
            </button>
            <button
              className="min-w-16 rounded-md border px-3 py-2"
              type="button"
              onClick={onClose}
            >
              cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
