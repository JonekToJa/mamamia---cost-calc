import { redirect } from "next/navigation";

// Lejek zaczyna się na /cennik.
export default function Home() {
  redirect("/cennik");
}
