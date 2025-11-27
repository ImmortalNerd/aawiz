import { getCookie } from "@/utils/cookie";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCookie("user");
  const token = await getCookie("token");

  if (user && token) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
