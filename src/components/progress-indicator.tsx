import clsx from "clsx";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Icon from "./icon";
import { cn } from "@/lib/utils";

export function ProgressIndicator({
  currentIndex,
  className,
}: {
  currentIndex: number;
  className: string;
}) {
  return (
    <div className={clsx("flex justify-between relative", className)}>
      <ProgressIndicatorBadge
        description="Personal Information"
        index="1"
        isDone={currentIndex > 1}
      />
      <ProgressIndicatorLine className="left-10" isDone={currentIndex >= 2} />
      <ProgressIndicatorBadge
        index="2"
        description="Barangay Information"
        isDone={currentIndex > 2}
      />
      <ProgressIndicatorLine className="right-10" isDone={currentIndex >= 3} />
      <ProgressIndicatorBadge
        index="3"
        description="Document Upload"
        isDone={currentIndex > 3}
      />
    </div>
  );
}

export function ProgressIndicatorBadge({
  index,
  description,
  isDone = false,
}: {
  index: string;
  description: string;
  isDone: boolean;
}) {
  return (
    <div className="flex flex-col justify-center items-center w-20 text-center">
      <span
        className={clsx(
          "flex justify-center items-center z-10 rounded-full w-10 h-10 mb-2",
          isDone ? "bg-green-300 text-gray-200" : "bg-gray-200 text-gray-700/50"
        )}
      >
        {isDone ? (
          <Icon
            name={IoIosCheckmarkCircle}
            className="fill-green-500 h-24 w-24"
          />
        ) : (
          index
        )}
      </span>
      <p
        className={cn(
          isDone ? "text-gray-700" : "text-gray-700/50",
          "text-xs sm:text-sm font-semibold sm:font-normal"
        )}
      >
        {description}
      </p>
    </div>
  );
}

export function ProgressIndicatorLine({
  className,
  isDone = false,
}: {
  className?: string;
  isDone: boolean;
}) {
  return (
    <div
      className={`absolute top-1/4 -translate-y-full h-1 w-1/3 md:w-56 flex justify-center items-center ${className}  ${isDone ? "bg-green-500" : "bg-gray-400/50"}`}
    />
  );
}
