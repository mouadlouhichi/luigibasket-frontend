import { router } from "../trpc";
import { adminRouter } from "./subRouters/admin.router";
import { authRouter } from "./subRouters/auth.router";
import { surveyRouter } from "./subRouters/survey.router";
import { userRouter } from "./subRouters/user.router";

export const appRouter = router({
  user: userRouter,
  admin: adminRouter,
  survey: surveyRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
