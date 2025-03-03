import Register from "@/components/Register";
import HomeLayout from "../layouts/HomeLayout";

export const metadata = {
  title: "Sign Up"
}
export default function page() {
  return (
    <HomeLayout>
      <Register />
    </HomeLayout>
  );
}
