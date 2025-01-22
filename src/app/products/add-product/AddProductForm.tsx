"use client";
import React from "react";
import { brandsType, categoriesType, unitsType } from "./page";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/app/login/login-form/FormInput";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useRouter } from "next/navigation";
type AddProductFormProps = {
  categories: categoriesType;
  brands: brandsType;
  units: unitsType;
  token: string;
};
const AddProductFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  buyingPrice: z.coerce.number(),
  sellingPrice: z.coerce.number(),
  quantity: z.coerce.number(),
  categoryId: z.string(),
  companyId: z.string(),
  unitId: z.string(),
});
type AddProductFormType = z.infer<typeof AddProductFormSchema>;
const AddProductForm = ({
  categories,
  brands,
  units,
  token,
}: AddProductFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
  } = useForm<AddProductFormType>({
    resolver: zodResolver(AddProductFormSchema),
  });
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    await axios.post("http://localhost:5091/api/Product", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    router.push("/products");
    router.refresh();
  });
  return (
    <form onSubmit={onSubmit} className="flex max-w-xl flex-col gap-8 p-8">
      <FormInput type="text" placeholder="Name" {...register("name")} />
      <div className="relative flex gap-4">
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="relative border-0 bg-Fg text-SecondaryTextColor focus:ring-0">
                <span className="absolute -top-6 left-0 text-PrimaryTextColor">
                  Category
                </span>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-Fg text-SecondaryTextColor">
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                      className="hover:!bg-highlight hover:!text-PrimaryTextColor"
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        <Controller
          name="companyId"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="relative border-0 bg-Fg text-SecondaryTextColor focus:ring-0">
                <SelectValue placeholder="Brand" />
                <span className="absolute -top-6 left-0 text-PrimaryTextColor">
                  Brand
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Brands</SelectLabel>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="relative flex gap-4">
        <Controller
          name="unitId"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="relative border-0 bg-Fg text-SecondaryTextColor focus:ring-0">
                <SelectValue placeholder="Unit" />
                <span className="absolute -top-6 left-0 text-PrimaryTextColor">
                  Unit
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Units</SelectLabel>
                  {units.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        <FormInput
          type="number"
          placeholder="Quantity"
          {...register("quantity")}
          error={errors.quantity?.message}
        />
      </div>
      <FormInput
        type="number"
        placeholder="Selling Price"
        {...register("sellingPrice")}
      />
      <FormInput
        type="number"
        placeholder="Buying Price"
        {...register("buyingPrice")}
      />
      <button type="submit" className="rounded-md bg-Primary px-6 py-2">
        Add
      </button>
    </form>
  );
};

export default AddProductForm;
