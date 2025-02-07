import HomeNav from "@/components/HomeNav";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <HomeNav />
      {children}
    </div>
  );
}
