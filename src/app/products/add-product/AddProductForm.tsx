"use client";
import CustomSelect from "@/app/components/CustomSelect";
import FormInput from "@/app/login/login-form/FormInput";
import { SelectItem } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AddProductFormProps,
  AddProductFormSchema,
  AddProductFormType,
} from "./types";

const AddProductForm = ({
  categories,
  brands,
  units,
  token,
}: AddProductFormProps) => {
  const [pending, setPending] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm<AddProductFormType>({
    resolver: zodResolver(AddProductFormSchema),
  });
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    try {
      setPending(true);
      await axios.post("http://localhost:5091/api/Product", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  });

  console.log("test this:", errors.categoryId?.message);
  return (
    <form
      onSubmit={onSubmit}
      className="flex max-h-screen w-[60vw] flex-col gap-8 rounded-md border border-navBorder p-16 shadow-lg"
    >
      <h2 className="mb-8 text-2xl">Add Product</h2>

      <FormInput
        error={errors.name?.message}
        type="text"
        placeholder="Name"
        {...register("name")}
      />
      <div className="relative flex gap-4">
        <CustomSelect
          name="categoryId"
          control={control}
          label="Category"
          error={errors.categoryId?.message}
        >
          {categories.map((category) => (
            <SelectItem
              key={category.id}
              value={category.id}
              className="hover:!bg-highlight hover:!text-PrimaryTextColor"
            >
              {category.name}
            </SelectItem>
          ))}
        </CustomSelect>

        <CustomSelect
          name="companyId"
          control={control}
          label="Brand"
          error={errors.companyId?.message}
        >
          {brands.map((brand) => (
            <SelectItem
              key={brand.id}
              value={brand.id}
              className="hover:!bg-highlight hover:!text-PrimaryTextColor"
            >
              {brand.name}
            </SelectItem>
          ))}
        </CustomSelect>
      </div>
      <div className="relative flex gap-4">
        <CustomSelect
          name="unitId"
          control={control}
          label="Unit"
          error={errors.unitId?.message}
        >
          {units.map((unit) => (
            <SelectItem
              key={unit.id}
              value={unit.id}
              className="hover:!bg-highlight hover:!text-PrimaryTextColor"
            >
              {unit.name}
            </SelectItem>
          ))}
        </CustomSelect>

        <FormInput
          type="number"
          placeholder="Quantity"
          error={errors.quantity?.message}
          {...register("quantity")}
        />
      </div>
      <FormInput
        type="number"
        placeholder="Selling Price"
        error={errors.sellingPrice?.message}
        {...register("sellingPrice")}
      />
      <FormInput
        type="number"
        placeholder="Buying Price"
        error={errors.buyingPrice?.message}
        {...register("buyingPrice")}
      />
      <button
        disabled={pending}
        type="submit"
        className={classNames({
          "w-32 rounded-md bg-Primary px-6 py-2 text-white": true,
          "bg-buttonPending": pending,
        })}
      >
        Add
      </button>
    </form>
  );
};

export default AddProductForm;
