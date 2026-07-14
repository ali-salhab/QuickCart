import { server } from "inngest/next";
import { syncUserCreation, syncUserUpdate } from "@/config/inngest";
import { inngest } from "@/config/inngest";
export const { GET, POST } = server({
  client: inngest,
  functions: [
    syncUserCreation, // يجب أن تكون هنا!
    syncUserUpdate,
  ],
});
