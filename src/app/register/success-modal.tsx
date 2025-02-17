import { Dialog, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/router";

function SuccessModal() {
  const [isOpen, setOpen] = useState(true);
  const router = useRouter();

  return (
    <Dialog open={isOpen}>
      <div className="max-h-[350px] overflow-y-auto px-2">Success</div>
      <DialogFooter>
        <Button
          onClick={() => {
            setOpen(!isOpen);
            router.replace("/");
          }}
        >
          Okay, Let&apos;s roll out
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default SuccessModal;
