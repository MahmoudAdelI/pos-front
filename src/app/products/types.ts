import { z } from "zod";
export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  sellingPrice: z.number(),
  buyingPrice: z.number(),
  quantity: z.number(),
  categoryName: z.string(),
  companyName: z.string(),
  unitName: z.string(),
});
export const productsSchema = z.array(productSchema);

export type Product = z.infer<typeof productSchema>;
export type InvoiceData = {
  date: Date;
  billDate?: Date;
  paidUp?: number;
  totalDiscount?: number;
  totalAmount?: number;
  invoiceItems: {
    itemId: string;
    quantity: number;
    unitId?: string;
    sellingPrice?: number;
  }[];
  clientId?: string;
  employeeId?: string;
};
export type SelectedProduct = Product & { selectedCount: number };
export type SelectedProductContextType = {
  selectedProducts: SelectedProduct[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<SelectedProduct[]>>;
};
