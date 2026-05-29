import { Command as CommandBase } from "./command-base";
import type { CommandProps } from "./types";

export const Command = (props: CommandProps) => {
  return <CommandBase {...props} />;
};

Command.displayName = "Command";
