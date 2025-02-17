import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function ErrorModal() {
  const [isOpen, setOpen] = useState(true);

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogTitle />
        <div className="max-h-[350px] overflow-y-auto px-2">Error</div>
        <DialogFooter>
          <Button onClick={() => setOpen(!isOpen)}>
            Okay, Let&apos;s roll out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ErrorModal;
