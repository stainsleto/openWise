"use client";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { createOnrampTransaction } from "../app/lib/actions/createOnrampTransaction";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [onRampResponse, setOnRampResponse] = useState({
    amount: 0,
    tokenId: "",
    userId: "",
  });

  const handleOnRamp = async () => {
    try {
      const res = await fetch("http://localhost:3003/hdfcWebhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: onRampResponse.tokenId,
          user_identifier: onRampResponse.userId,
          amount: onRampResponse.amount,
        }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      const data = await res.json();
      if (data.message === "Captured") {
        toast.success("Transaction Sucess");
        setIsDialogOpen(false);
      }
    } catch (error) {
      setIsDialogOpen(false);
      console.error("API request failed:", error);
      toast.warning("Server error")
    }
  };

  return (
    <>
      <Card className="p-4">
        <Toaster />
        <CardTitle className="text-xl pb-2">Add Money</CardTitle>
        <hr />
        <div className="flex flex-col items-start">
          <div className="flex flex-col gap-3 pt-3">
            <Label>Amount</Label>
            <Input
              type="number"
              placeholder={"Amount"}
              onChange={(e) => {
                setAmount(Number(e.target.value));
                console.log(amount);
              }}
            />
          </div>
          <div className="flex flex-col gap-3 pt-6 w-full">
            <Label>Bank</Label>
            <Select
              onSelect={(value) => {
                setRedirectUrl(
                  SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl ||
                    ""
                );
              }}
              options={SUPPORTED_BANKS.map((x) => ({
                key: x.name,
                value: x.name,
              }))}
            />
          </div>
          <div className="flex justify-center pt-4">
            <Button
              disabled={loading}
              onClick={async () => {
                if(amount <= 0 ){
                  toast.warning("Please enter a valid amount")
                }
                else{
                  setLoading(true);
                  try {
                    const res = await createOnrampTransaction(
                      redirectUrl ? redirectUrl : "",
                      amount
                    );
                    
                    if (res.message === "Done") {
                      setIsDialogOpen(true);
                      if (res.amount && res.token && res.message) {
                        setOnRampResponse((prev) => {
                          setLoading(false);
                          
                          return ({
                            ...prev,
                            tokenId: res.token,
                            userId: res.userId,
                            amount: res.amount,
                          })
                        });
                      }
                    }
                  } catch (err) {
                    console.log(err);
                    toast.warning("Error Ocured");
                  }
                }
              }}
            >
              Add Money {loading && <Spinner />}
            </Button>
          </div>
        </div>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>Choose the prefered payment status</DialogTitle>
          <Button onClick={handleOnRamp}>Payment Success</Button>
          <Button onClick={() => setIsDialogOpen(false)}>Payment Processing</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
