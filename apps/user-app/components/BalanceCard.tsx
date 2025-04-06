import { Card, CardTitle } from "@/components/ui/card";

export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: bigint;
  locked: number;
}) => {
  const balance = amount / BigInt(100);
  const totalBalance = (amount + BigInt(locked)) / BigInt(100);
  return (
    <Card className="p-4">
      <CardTitle className="text-xl pb-2">Balance</CardTitle>
      <hr />
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Unlocked balance</div>
        <div>{balance.toString()} USD</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Total Locked Balance</div>
        <div>{locked / 100} USD</div>
      </div>
      <div className="flex justify-between  py-2">
        <div>Total Balance</div>
        <div>{totalBalance.toString()} USD</div>
      </div>
    </Card>
  );
};
