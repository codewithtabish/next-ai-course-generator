import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const SelectPayment = () => {
  return (
    <div>
      <Label htmlFor="payment">Payment</Label>
      <Input type="number" id="payment" />
    </div>
  );
};

export default SelectPayment;
