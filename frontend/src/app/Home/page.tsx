import HomeLayout from "../layouts/HomeLayout";
import HomeComponent from "@/components/HomeComponent";

export const metadata = {
  title: "Home"
}
export default function Home() {
  // app.tsx
  return (
    <HomeLayout>
      <HomeComponent />
    </HomeLayout>
  );
}
