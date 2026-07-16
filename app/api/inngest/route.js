import { serve } from "inngest/next";
import {
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdate,
  inngest,
} from "@/config/inngest";
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUserCreation, syncUserUpdate, syncUserDeletion],
});
