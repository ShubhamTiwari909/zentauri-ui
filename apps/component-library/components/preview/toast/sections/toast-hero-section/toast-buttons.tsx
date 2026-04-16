"use client";
import { Button, useToast } from "@zentauri-ui/zentauri-components/ui";

const ToastButtons = () => {
  const { toast } = useToast();

  return (
    <>
      <Button
        appearance="sky"
        size="sm"
        animation="lift"
        type="button"
        onClick={() =>
          toast({
            title: "Saved",
            description: "Your layout changes are stored.",
            appearance: "success",
          })
        }
      >
        Success toast
      </Button>
      <Button
        appearance="outline"
        size="sm"
        animation="none"
        type="button"
        onClick={() =>
          toast({
            title: "Heads up",
            description: "Maintenance starts at 22:00 UTC.",
            appearance: "warning",
          })
        }
      >
        Warning toast
      </Button>
    </>
  );
};

export default ToastButtons;
