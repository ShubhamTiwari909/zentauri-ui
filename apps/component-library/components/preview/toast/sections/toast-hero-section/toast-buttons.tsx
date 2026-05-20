"use client";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import { ButtonAnimated } from "@zentauri-ui/zentauri-components/ui/buttons/animated";
import { useToast } from "@zentauri-ui/zentauri-components/ui/toast";

const ToastButtons = () => {
  const { toast } = useToast();

  return (
    <>
      <ButtonAnimated
        appearance="teal"
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
      </ButtonAnimated>
      <Button
        appearance="amber"
        size="sm"
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
