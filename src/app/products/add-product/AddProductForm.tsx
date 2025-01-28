"use client";
import CustomSelect from "@/app/components/CustomSelect";
import FormInput from "@/app/login/login-form/FormInput";
import { SelectItem } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import classNames from "classnames";
// import { useRouter } from "next/navigation";
import Modal, { PropertyType } from "@/app/components/Modal";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { toast } from "sonner";
import {
  AddProductFormProps,
  AddProductFormSchema,
  AddProductFormType,
  categoriesSchema,
  CategoriesType,
} from "./types";

const AddProductForm = ({ brands, units, token }: AddProductFormProps) => {
  const [pending, setPending] = useState(false);
  const [activeModal, setActiveModal] = useState<PropertyType | null>(null);
  const [categories, setCategories] = useState<CategoriesType | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<AddProductFormType>({
    resolver: zodResolver(AddProductFormSchema),
  });
  const currentBrand = watch("companyId");
  // console.log("current brand: ", currentBrand);
  useEffect(() => {
    if (currentBrand) {
      const fetchCategories = async () => {
        // console.log("ran");
        try {
          const categoriesResponse = await axios.get(
            `http://localhost:5091/api/Type/GetByCompanyId?companyId=${currentBrand}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          const parsedData = categoriesSchema.safeParse(
            categoriesResponse.data,
          );
          if (parsedData.success) {
            console.log("parsedData: ", parsedData.data);
            setCategories(parsedData.data);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const errorMessage =
              error.response?.data.errors.Name ||
              "An unexpected error occurred";
            console.error(error);
            toast.error(errorMessage);
          }
        }
      };
      fetchCategories();
    }
  }, [currentBrand]);
  console.log("categories: ", categories);
  // const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    try {
      setPending(true);
      const response = await axios.post(
        "http://localhost:5091/api/Product",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.status === 200) {
        toast.success("Product has been added successfully");
      }
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data.errors.Name || "An unexpected error occurred";
        console.error(error);
        toast.error(errorMessage);
      }
    } finally {
      setPending(false);
    }
  });

  // console.log("test this:", errors.categoryId?.message);
  return (
    <>
      <h2 className="mb-8 text-3xl font-semibold">Add Product</h2>
      <form
        onSubmit={onSubmit}
        className="motion-preset-slide-up-sm flex w-[60vw] flex-col gap-12 rounded-md bg-form p-16 shadow"
      >
        <FormInput
          error={errors.name?.message}
          label
          type="text"
          placeholder="Name"
          {...register("name")}
        />
        <div className="relative flex gap-4">
          <div className="flex w-full gap-1">
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
            <button
              type="button"
              onClick={() => setActiveModal("brand")}
              className="mt-2 h-fit cursor-pointer rounded text-xl text-SecondaryTextColor"
            >
              <MdAdd />
            </button>
          </div>
          <div className="flex w-full gap-1">
            <CustomSelect
              name="categoryId"
              control={control}
              label="Category"
              error={errors.categoryId?.message}
              disabled={!categories}
            >
              {categories?.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.id}
                  className="hover:!bg-highlight hover:!text-PrimaryTextColor"
                >
                  {category.name}
                </SelectItem>
              ))}
            </CustomSelect>
            <button
              type="button"
              onClick={() => setActiveModal("category")}
              className="mt-2 h-fit cursor-pointer rounded text-xl text-SecondaryTextColor"
            >
              <MdAdd />
            </button>
          </div>
        </div>
        <div className="relative flex gap-4">
          <div className="flex w-full gap-1">
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
            <button
              type="button"
              onClick={() => setActiveModal("unit")}
              className="mt-2 h-fit cursor-pointer rounded text-xl text-SecondaryTextColor"
            >
              <MdAdd />
            </button>
          </div>

          <FormInput
            type="number"
            label
            placeholder="Quantity"
            error={errors.quantity?.message}
            {...register("quantity")}
          />
        </div>
        <FormInput
          type="number"
          label
          placeholder="Selling Price"
          error={errors.sellingPrice?.message}
          {...register("sellingPrice")}
        />
        <FormInput
          type="number"
          label
          placeholder="Buying Price"
          error={errors.buyingPrice?.message}
          {...register("buyingPrice")}
        />
        <button
          disabled={pending}
          type="submit"
          className={classNames({
            "w-32 rounded-md bg-Primary px-6 py-2 text-white shadow-md active:translate-y-[1px] active:scale-[.97] active:bg-buttonPending active:shadow-sm":
              true,
            "bg-buttonPending": pending,
          })}
        >
          Add
        </button>
      </form>
      <Modal
        mode={activeModal ?? "brand"}
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        token={token}
      />
    </>
  );
};

export default AddProductForm;
