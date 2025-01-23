"use client";
import CustomSelect from "@/app/components/CustomSelect";
import FormInput from "@/app/login/login-form/FormInput";
import { SelectItem } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { brandsType, categoriesType, unitsType } from "./page";
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
        <CustomSelect name="categoryId" control={control} label="Category">
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

        <CustomSelect name="companyId" control={control} label="Brand">
          {brands.map((brand) => (
            <SelectItem key={brand.id} value={brand.id}>
              {brand.name}
            </SelectItem>
          ))}
        </CustomSelect>
      </div>
      <div className="relative flex gap-4">
        <CustomSelect name="unitId" control={control} label="Unit">
          {units.map((unit) => (
            <SelectItem key={unit.id} value={unit.id}>
              {unit.name}
            </SelectItem>
          ))}
        </CustomSelect>

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
