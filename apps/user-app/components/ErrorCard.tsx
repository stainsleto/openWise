import { Card } from "@/components/ui/card";
import { TriangleAlert } from "lucide-react";

const ErrorCard = ({ className }: { className?: string }) => {
  return (
    <Card className={` ${className} items-center flex justify-center gap-2  `}>
      <TriangleAlert /> <p>Error Occured</p>
    </Card>
  );
};

export default ErrorCard;
