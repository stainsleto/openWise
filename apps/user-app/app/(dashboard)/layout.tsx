import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../../components/AppSidebar";
import { Card } from "@/components/ui/card";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    redirect("/signin");
  }
  return (
    <>
      <SidebarProvider>
        <main className="flex w-screen">
          <AppSidebar session={session} />
          <Card className="my-2 w-full p-4 m-2">
          <SidebarTrigger className=" md:hidden" />
            {children}
            </Card>
        </main>
      </SidebarProvider>
    </>
  );
}
