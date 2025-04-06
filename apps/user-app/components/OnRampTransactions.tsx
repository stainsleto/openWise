import { Card, CardTitle } from "@/components/ui/card";

type Status = "Processing" | "Success" | "Failure";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: Status;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card className="p-4">
        <CardTitle className="text-xl pb-2">Recent transactions</CardTitle>
        <hr />
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card className="p-4">
      <CardTitle className="text-xl pb-2">Recent Transactions</CardTitle>
      <hr />
      <div className="pt-2">
        {transactions.map((t, index) => (
          <div key={index} className="flex justify-between">
            <div>
              <div className="text-sm">Funded USD</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">{t.status}</div>
            <div className="flex flex-col justify-center">
              + {t.amount / 100} USD
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
