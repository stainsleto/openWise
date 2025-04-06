import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Card, CardTitle } from "@/components/ui/card";
import getDashboardData from "app/lib/actions/dashboard";
import { TransactionHistory } from "components/TransactionHistory";
import { TriangleAlert } from "lucide-react";

export default async function () {
  const dashboard = await getDashboardData("transaction");
  const session = await getServerSession(authOptions);
  const userMail = session.user.email;

  return (
    <>
      <CardTitle className="text-2xl pb-5">Transactions</CardTitle>
      {dashboard.transactions ? (
        <TransactionHistory
          transactions={dashboard.transactions}
          userMail={userMail}
          className="col-span-3"
        />
      ) : (
        <Card className="items-center flex justify-center gap-2 col-span-3 row-span-1">
          <TriangleAlert /> <p>Error Occured</p>
        </Card>
      )}
    </>
  );
}
