import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import Icon from "@/components/icon";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useRouter } from "next/navigation";

function SuccessModal({ onReset }: { onReset: () => void }) {
  const router = useRouter();
  const [isOpen, setOpen] = useState(true);

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogTitle />
        <div className="flex flex-col justify-center items-center text-center">
          <span
            className={
              "flex justify-center items-center z-10 rounded-full w-20 h-20 mb-2 bg-green-300 text-gray-200"
            }
          >
            <Icon
              name={IoIosCheckmarkCircle}
              className="fill-green-500 h-full w-full"
            />
          </span>

          <div className="mb-4">
            <h2 className="max-h-[350px] overflow-y-auto px-2 font-semibold text-xl">
              Success
            </h2>
            <p>You are now registered </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(!isOpen);
                onReset();
              }}
            >
              Register Again
            </Button>
            <Button
              onClick={() => {
                setOpen(!isOpen);
                router.replace("/");
              }}
            >
              Okay!
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessModal;
