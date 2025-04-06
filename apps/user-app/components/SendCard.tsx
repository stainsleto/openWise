"use client";
import { useRef, useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import AsyncSelect from "react-select/async";
import { getFindUser } from "app/lib/actions/findUser";
import { useSession } from "next-auth/react";

interface Option {
  label: string;
  value: string;
}

export function SendCard() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const filterUsers = async (inputValue: string) => {
    const userList = await getFindUser(inputValue);

    if (userList.users) {
      const filteredUsers = userList.users.filter(
        (val: { id: string; email: string }) =>
          val.email !== session?.user?.email
      );

      return filteredUsers || [];
    }
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: { label: string; value: string }[]) => void
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      const userList = await filterUsers(inputValue);
      if (userList)
        callback(
          userList.map((user) => ({
            label: user.email,
            value: user.id,
          }))
        );
    }, 1000);
  };
  const noOptionMessage = () => {
    return "No users found";
  };
  return (
    <div className="flex justify-center items-center h-5/6">
      <Toaster />
      <Card className="p-4 w-4/12">
        <CardTitle className="text-2xl pb-7 text-center">Send Money</CardTitle>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Receiver Email</Label>
            <AsyncSelect
              styles={{
                control: (provided) => ({
                  ...provided,
                  fontSize: "14px",
                  borderRadius: "7px",
                  borderColor: "#e4e4e7",
                  borderWidth: "1px",
                  height: "2.4rem",
                }),
              }}
              placeholder="m@example.com"
              cacheOptions
              onChange={(option: Option | null) => {
                if (option) {
                  setEmail(option.label);
                }
              }}
              loadOptions={loadOptions}
              isMulti={false}
              noOptionsMessage={noOptionMessage}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Amount</Label>

            <Input
              type="number"
              placeholder={"$200"}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              value={amount}
            />
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <Button
            className="flex gap-2 items-center hover:scale-105"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              try {
                const res = await p2pTransfer(email, Number(amount) * 100);
                if (res) {
                  setLoading(false);
                  setIsDialogOpen(true);
                  setAmount("");
                  setEmail("");
                  toast.success(res.message);
                }
              } catch (err) {
                toast.error("Transaction Failed");
                console.log(err);
              } finally {
                setLoading(false);
              }
            }}
          >
            Send <Send /> {loading && <Spinner />}
          </Button>
        </div>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          {/* minor animations with tick mark can be added here for the payment done status */}
          <DialogTitle>Transfer Success</DialogTitle>
        </DialogContent>
      </Dialog>
    </div>
  );
}
