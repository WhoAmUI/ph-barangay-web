import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

const Icon = ({ name, className }: { name: IconType; className?: string }) => {
  const Element = name;
  return <Element className={cn("stroke-1", className)} />;
};

export default Icon;
