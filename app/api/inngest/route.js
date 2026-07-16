import { serve } from "inngest/next";
import {
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdate,
} from "@/config/inngest";
import { inngest } from "@/config/inngest";
export const { GET, POST } = serve({
  client: inngest,
  functions: [syncUserCreation, syncUserUpdate, syncUserDeletion],
});
