import { z } from "zod";
export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  sellingPrice: z.number(),
  buyingPrice: z.number(),
  quantity: z.number(),
  // notes: z.null(),
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
export type InvoiceContextType = {
  invoiceData: InvoiceData;
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData>>;
};
export type SelectedProductContextType = {
  selectedProducts: Product[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};
