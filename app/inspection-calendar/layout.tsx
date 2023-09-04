import "../../styles/globals.css";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export const metadata = {
  title: "PRC Inspection and Monitoring System",
  description: "",
};

export default async function InspectionCalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <section className="min-h-[80vh] w-full bg-[#F9FAFE] px-6 lg:px-12 py-6">
      {children}
    </section>
  );
}
