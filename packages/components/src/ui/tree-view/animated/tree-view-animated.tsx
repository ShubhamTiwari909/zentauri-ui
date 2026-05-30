"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { TreeViewBase } from "../tree-view-base";
import type { TreeGroupProps } from "../types";

import { treeViewTransitionPresets } from "./animations";
import type { TreeViewAnimatedProps } from "./types";
import type { TreeViewTransition } from "./animations";

function createAnimatedGroup(transitionVariant: TreeViewTransition) {
  const transition = treeViewTransitionPresets[transitionVariant];
  const motionless = transitionVariant === "none";

  function AnimatedTreeGroup({ open, children }: TreeGroupProps) {
    return (
      <AnimatePresence initial={false}>
        {open ? (
          <motion.ul
            role="group"
            data-slot="tree-view-group"
            className="m-0 list-none overflow-hidden p-0"
            initial={motionless ? false : { height: 0, opacity: 0 }}
            animate={motionless ? undefined : { height: "auto", opacity: 1 }}
            exit={motionless ? undefined : { height: 0, opacity: 0 }}
            transition={transition}
          >
            {children}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    );
  }

  AnimatedTreeGroup.displayName = "AnimatedTreeGroup";
  return AnimatedTreeGroup;
}

export function TreeViewAnimated({
  transitionVariant = "default",
  ...props
}: TreeViewAnimatedProps) {
  const GroupComponent = useMemo(
    () => createAnimatedGroup(transitionVariant),
    [transitionVariant],
  );
  return <TreeViewBase {...props} GroupComponent={GroupComponent} />;
}

TreeViewAnimated.displayName = "TreeViewAnimated";
