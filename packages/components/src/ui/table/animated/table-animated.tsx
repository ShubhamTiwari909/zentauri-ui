"use client";
import { tableAnimationPresets } from "./animations";
import type { TableSectionProps } from "../types";
import { motion } from "framer-motion";
import { TableRow } from "../table-base";

export const TableRowAnimated = (
  props: TableSectionProps & { ref?: React.Ref<HTMLTableRowElement> },
) => {
  const { rowAnimation = "hover" } = props;
  const motionProps = tableAnimationPresets[rowAnimation];
  return (
    <TableRow {...props} as={motion.tr} initial={false} {...motionProps} />
  );
};
