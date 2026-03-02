import { api } from "@/lib/api-client";
import { cookies } from "next/headers";
import { User } from "@/types";

export async function getMe(): Promise<User | null> {
  try {
    const response = await api.get<User>("/users/me", await getAuthHeaders());
    return response.data;
  } catch (error) {
    console.log("Fetch profile failed:", error);
    return null;
  }
}

export async function getAuthHeaders() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
}
