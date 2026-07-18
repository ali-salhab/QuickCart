import { serve } from "inngest/next";
import {
  inngest,
  syncUserCreation,
  syncUserUpdate,
  syncUserDeletion,
  syncUserCreationDebug,
} from "@/config/inngest";
export const dynamic = "force-dynamic";
console.log("route file --------------->");
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdate,
    syncUserDeletion,
    syncUserCreationDebug,
  ],
});
