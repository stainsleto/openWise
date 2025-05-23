import { Card, CardTitle } from "@/components/ui/card";
import getDashboardData from "app/lib/actions/dashboard";
import { SpendChart } from "components/SpendChart";
import { TransactionHistory } from "components/TransactionHistory";
import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/auth";
import ErrorCard from "components/ErrorCard";
import Link from "next/link";

export default async function () {
  const dashboard = await getDashboardData("dashboard");
  const session = await getServerSession(authOptions);
  const userMail = session.user.email;

  const formattedBalance = (value: BigInt | number | undefined) => {
    const formated = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(value || 0) / 100);
    return formated;
  };
  return (
    <>
      <CardTitle className="text-2xl pb-5">Dashboard</CardTitle>
      <div className="grid grid-cols-3 gap-3">
        {dashboard.spendSevenDaysTransactions ? (
          <SpendChart
            title={"Spend this week"}
            description={"Showing total spend for the last seven days"}
            lastSevenTransactions={dashboard.spendSevenDaysTransactions}
            className="col-span-1 "
          />
        ) : (
          <ErrorCard className="col-span-1" />
        )}

        {dashboard.receivedSevenDaysTransaction ? (
          <SpendChart
            title={"Received this week"}
            description={"Showing total received in the last seven days"}
            lastSevenTransactions={dashboard.receivedSevenDaysTransaction}
            className="col-span-1 "
          />
        ) : (
          <ErrorCard className="col-span-1" />
        )}

        <Card className=" bg-gradient-to-tr from-primary via-primary/90 to-primary/90 text-white flex flex-col justify-between p-5">
          <div className="flex items-center justify-between">
            <CardTitle>{session.user.name.toUpperCase()}</CardTitle>
            <p className="font-semibold text-lg text-right">
              {formattedBalance(dashboard.balance)}
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="408.04999"
                height="109.966"
                viewBox="0 0 408.04999 109.966"
                className="h-20 w-48 "
              >
                <g>
                  <rect width="408.04999" height="109.966" fill="none" />
                  <g>
                    <path
                      d="M566.14809,315.9167a1.52658,1.52658,0,0,1,.6016.1191,1.56675,1.56675,0,0,1,.4917.3258,1.5323,1.5323,0,0,1,.3311.4843,1.49325,1.49325,0,0,1,0,1.1786,1.54129,1.54129,0,0,1-.3311.4822,1.59609,1.59609,0,0,1-.4917.3276,1.502,1.502,0,0,1-.6016.1212,1.548,1.548,0,0,1-1.4356-.931,1.49665,1.49665,0,0,1,0-1.1786,1.5207,1.5207,0,0,1,.8231-.8101A1.57212,1.57212,0,0,1,566.14809,315.9167Zm0,2.7036a1.133,1.133,0,0,0,.4583-.093,1.209,1.209,0,0,0,.3721-.2534,1.19142,1.19142,0,0,0,0-1.676,1.18032,1.18032,0,0,0-.3721-.2511,1.14552,1.14552,0,0,0-.4583-.0913,1.19462,1.19462,0,0,0-.4674.0913,1.18656,1.18656,0,0,0-.3779,1.9271,1.19349,1.19349,0,0,0,.3779.2534A1.1815,1.1815,0,0,0,566.14809,318.6203Zm.0894-1.8956a.643.643,0,0,1,.4192.1212.404.404,0,0,1,.147.3294.38391.38391,0,0,1-.1173.2885.56088.56088,0,0,1-.33339.1397l.46179.5325h-.3612l-.4282-.5289h-.138v.5289h-.3015v-1.4113Zm-.3501.2645v.3761h.3465a.34.34,0,0,0,.19-.0467.15954.15954,0,0,0,.0706-.1433.1565.1565,0,0,0-.0706-.1397.34339.34339,0,0,0-.19-.0464Zm-157.5413,1.1424V303.1054c0-5.6598-3.6062-9.4663-9.4162-9.5165a9.2729,9.2729,0,0,0-8.4146,4.2575,8.79347,8.79347,0,0,0-7.9138-4.2575,7.91744,7.91744,0,0,0-7.0119,3.5563V294.19h-5.2093v23.9416h5.2591V304.8583c0-4.1571,2.3042-6.3605,5.8602-6.3605,3.4559,0,5.2092,2.2536,5.2092,6.3107v13.3231h5.2591V304.8583c0-4.1571,2.4042-6.3605,5.86011-6.3605,3.556,0,5.259,2.2536,5.259,6.3107v13.3231Zm29.3512-11.971V294.19H432.488v2.905a9.08322,9.08322,0,0,0-7.56331-3.5061c-6.7115,0-11.9705,5.2595-11.9705,12.5717,0,7.3127,5.259,12.5722,11.9705,12.5722a9.08329,9.08329,0,0,0,7.56331-3.5062v2.905h5.20929Zm-19.3837,0c0-4.2073,2.7548-7.6628,7.2625-7.6628,4.3073,0,7.2123,3.3053,7.2123,7.6628s-2.905,7.6632-7.2123,7.6632C421.06839,313.8238,418.31359,310.3679,418.31359,306.1606ZM549.158,293.5608a13.49224,13.49224,0,0,1,5.13769.9629,12.52681,12.52681,0,0,1,4.0869,2.6499,12.12781,12.12781,0,0,1,2.7002,3.9873,13.29915,13.29915,0,0,1,0,9.9995,12.12169,12.12169,0,0,1-2.7002,3.9883,12.52557,12.52557,0,0,1-4.0869,2.6494,14.18794,14.18794,0,0,1-10.2754,0,12.39188,12.39188,0,0,1-4.0752-2.6494,12.24012,12.24012,0,0,1-2.6875-3.9883,13.31192,13.31192,0,0,1,0-9.9995,12.24638,12.24638,0,0,1,2.6875-3.9873,12.3931,12.3931,0,0,1,4.0752-2.6499A13.49227,13.49227,0,0,1,549.158,293.5608Zm0,4.9253a7.77778,7.77778,0,0,0-2.97461.5625,7.03794,7.03794,0,0,0-2.375,1.5747,7.34321,7.34321,0,0,0-1.5752,2.4253,8.70913,8.70913,0,0,0,0,6.2251,7.33585,7.33585,0,0,0,1.5752,2.4248,7.03918,7.03918,0,0,0,2.375,1.5752,8.14636,8.14636,0,0,0,5.9492,0,7.181,7.181,0,0,0,2.3877-1.5752,7.26075,7.26075,0,0,0,1.5879-2.4248,8.709,8.709,0,0,0,0-6.2251,7.268,7.268,0,0,0-1.5879-2.4253,7.17974,7.17974,0,0,0-2.3877-1.5747A7.77775,7.77775,0,0,0,549.158,298.4861Zm-83.11641,7.6745c-.0498-7.4629-4.6579-12.5717-11.3694-12.5717-7.0123,0-11.9208,5.1088-11.9208,12.5717,0,7.6135,5.1088,12.5722,12.2714,12.5722a14.55332,14.55332,0,0,0,9.8169-3.3559l-2.5545-3.8569a11.40607,11.40607,0,0,1-6.9621,2.5043c-3.356,0-6.41109-1.5525-7.1625-5.8603h17.781C465.99179,307.5131,466.04159,306.8622,466.04159,306.1606Zm-17.8308-2.1034c.551-3.456,2.6544-5.81,6.361-5.81,3.356,0,5.5096,2.1034,6.0606,5.81Zm42.0221-7.9637a17.90325,17.90325,0,0,0-9.7671-2.5046c-6.0606,0-9.9671,2.905-9.9671,7.6632,0,3.907,2.905,6.3112,8.2639,7.0626l2.4545.3505c2.8548.4004,4.2073,1.1517,4.2073,2.5043,0,1.8532-1.9035,2.905-5.45939,2.905a12.75575,12.75575,0,0,1-7.96411-2.5043l-2.454,4.0567a17.27264,17.27264,0,0,0,10.3679,3.1059c6.9119,0,10.9188-3.2561,10.9188-7.8139,0-4.2074-3.1552-6.4112-8.3644-7.1625l-2.454-.3506c-2.2541-.3004-4.0571-.7509-4.0571-2.3536,0-1.7533,1.7026-2.805,4.55791-2.805a15.43171,15.43171,0,0,1,7.46279,2.0536Zm22.7756-1.9035h-8.5146l-.0015-7.2624h-5.2591l.0016,7.2624h-4.8587v4.7583h4.8587v10.9188c0,5.5599,2.1536,8.8657,8.3142,8.8657a12.23692,12.23692,0,0,0,6.5111-1.8533l-1.50219-4.4579a9.61685,9.61685,0,0,1-4.60821,1.3525c-2.6046,0-3.4559-1.6031-3.4559-4.0069V298.9483h8.5146Zm18.0272-.6011a7.06115,7.06115,0,0,0-6.31069,3.5061V294.19h-5.15911v23.9416h5.2088V304.7081c0-3.9567,1.7031-6.1606,5.10931-6.1606a8.48478,8.48478,0,0,1,3.25559.6012l1.6027-4.9085a11.13038,11.13038,0,0,0-3.7066-.6513Z"
                      transform="translate(-191.9746 -251.017)"
                      fill="#fff"
                    />
                    <g>
                      <rect
                        x="80.4605"
                        y="26.6798"
                        width="31.5"
                        height="56.6064"
                        fill="#7375cf"
                      />
                      <path
                        d="M274.43529,306a35.93765,35.93765,0,0,1,13.7499-28.3032,36,36,0,1,0,0,56.6064A35.9378,35.9378,0,0,1,274.43529,306Z"
                        transform="translate(-191.9746 -251.017)"
                        fill="#eb001b"
                      />
                      <path
                        d="M342.99579,328.3078v-1.1589h.4673v-.2361H342.273v.2361h.46749v1.1589Zm2.3105,0v-1.3973h-.3648l-.4196.9611-.4197-.9611h-.365v1.3973h.2576v-1.054l.3935.9087h.2671l.3935-.911v1.0563Z"
                        transform="translate(-191.9746 -251.017)"
                        fill="#00a2e5"
                      />
                      <path
                        d="M346.43039,306a35.99867,35.99867,0,0,1-58.2452,28.3032,36.00517,36.00517,0,0,0,0-56.6064A35.99867,35.99867,0,0,1,346.43039,306Z"
                        transform="translate(-191.9746 -251.017)"
                        fill="#00a2e5"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </div>

            <div className="flex w-full text-center justify-end gap-4">
              <Link
                href={"/wallet"}
                className="rounded-lg px-4 flex gap-2 items-center py-2 bg-secondary text-secondary-foreground font-semibold shadow hover:bg-secondary/90"
              >
                {" "}
                Add Balance
                <p>💵</p>
              </Link>
              <Link
                href={"/peertopeer"}
                className="rounded-lg px-4 flex gap-2 items-center py-2 bg-secondary text-secondary-foreground font-semibold shadow hover:bg-secondary/90"
              >
                {" "}
                Send Money
                <p>💸</p>
              </Link>
            </div>
          </div>
        </Card>

        {dashboard.transactions ? (
          <TransactionHistory
            transactions={dashboard.transactions}
            userMail={userMail}
            className="col-span-3"
          />
        ) : (
          <ErrorCard className="col-span-3 py-20" />
        )}
      </div>
    </>
  );
}
