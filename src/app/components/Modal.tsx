import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import classNames from "classnames";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { categorySchema } from "../products/add-product/types";
import FormInput from "./FormInput";

export type PropertyType = "brand" | "category" | "unit";
const createValidationSchema = (type: PropertyType) =>
  z.object({
    name: z
      .string()
      .min(
        2,
        `${type === "brand" ? "Brand" : type === "category" ? "Category" : "Unit"} name must be at least 2 characters`,
      )
      .max(50),
    // companyId: z.string().optional(),
  });
interface PropertyModalProps {
  mode: PropertyType;
  isOpen: boolean;
  onClose: () => void;
  token: string;
  currentBrand: string;
  // setCategories: Dispatch<
  //   SetStateAction<
  //     | {
  //         name: string;
  //         id: string;
  //       }[]
  //     | null
  //   >
  // >;
}

const getEndpoint = (mode: PropertyType) => {
  const endpoints = {
    brand: "http://localhost:5091/api/Company",
    category: "http://localhost:5091/api/Type",
    unit: "http://localhost:5091/api/Unit",
  };
  return endpoints[mode];
};
const titleMap = {
  brand: "Add New Brand",
  category: "Add New Category",
  unit: "Add New Unit",
};
const Modal = ({
  mode,
  isOpen,
  onClose,
  token,
  currentBrand,
  // setCategories,
}: PropertyModalProps) => {
  // console.log("token: ", token);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<ReturnType<typeof createValidationSchema>>>({
    resolver: zodResolver(createValidationSchema(mode)),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      const endpoint = getEndpoint(mode);
      const res = await axios.post(
        endpoint,
        mode === "category" ? { ...data, companyId: currentBrand } : data,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (mode === "category") {
        const { data } = categorySchema.safeParse(res.data);
        console.log(res);
        // if (data) {
        //   setCategories((prev) => [
        //     ...(prev || []),
        //     { name: data.name, id: data.id },
        //   ]);
        // }
      }
      console.log(data);
      onClose();
      form.reset();
    } catch (error) {
      console.error("Submission failed:", error);
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
            placeholder={mode}
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
