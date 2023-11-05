import { productProcedure } from "../../procedures";
import { router } from "../../trpc";

export const productRouter = router({
  // 1. The query function is used to define a query.
  getAllProducts: productProcedure.query(async ({ ctx }) => {
    // 2. The query function receives a ctx object with a session property containing the session data.
    return ctx.prisma.product.findMany();
  }),
});
