import { api } from "@/lib/api-client";
import { cookies } from "next/headers";
import { User } from "@/types";

export const userService = {
  async getMe(): Promise<User | null> {
    try {
      const response = await api.get<User>(
        "/users/me",
        await this.getAuthHeaders(),
      );
      return response.data;
    } catch (error) {
      console.error("Fetch profile failed:", error);
      return null;
    }
  },

  async getAuthHeaders() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  },
};
