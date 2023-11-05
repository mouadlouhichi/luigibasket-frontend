import { router } from "../trpc";
import { adminRouter } from "./subRouters/admin.router";
import { authRouter } from "./subRouters/auth.router";
import { productRouter } from "./subRouters/product.router";
import { userRouter } from "./subRouters/user.router";

export const appRouter = router({
  user: userRouter,
  admin: adminRouter,
  auth: authRouter,
  product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
