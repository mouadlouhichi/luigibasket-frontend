import * as z from "zod";

export const basketItemSchema = z.object({
  quantity: z.number().int().min(1, {
    message: "Quantity must be at least 1",
  }),
  price: z.number().min(0, {
    message: "Price must be at least 0",
  }),
  totalPrice: z.number().min(0, {
    message: "Total must be at least 0",
  }),
});
export type IBasketForm = z.infer<typeof basketItemSchema>;
