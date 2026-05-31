"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "../../lib/utils";
import {
  zuiTreeViewChevron,
  zuiTreeViewGuide,
  zuiTreeViewIcon,
} from "../../design-system/tree-view";

import type {
  TreeGroupProps,
  TreeNode,
  TreeViewBaseProps,
  TreeViewCtx,
} from "./types";
import { treeViewItemVariants, treeViewVariants } from "./variants";

const TreeViewContext = createContext<TreeViewCtx | null>(null);

function useTreeViewContext(component: string): TreeViewCtx {
  const ctx = useContext(TreeViewContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <TreeView>`);
  }
  return ctx;
}

type FlatNode = { node: TreeNode; level: number; parentId: string | null };

function flattenVisible(
  nodes: TreeNode[],
  isExpanded: (id: string) => boolean,
  level = 1,
  parentId: string | null = null,
  acc: FlatNode[] = [],
): FlatNode[] {
  for (const node of nodes) {
    acc.push({ node, level, parentId });
    if (node.children?.length && isExpanded(node.id)) {
      flattenVisible(node.children, isExpanded, level + 1, node.id, acc);
    }
  }
  return acc;
}

function StaticTreeGroup({ open, children }: TreeGroupProps) {
  if (!open) {
    return null;
  }
  return (
    <ul role="group" data-slot="tree-view-group" className="m-0 list-none p-0">
      {children}
    </ul>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="h-3.5 w-3.5"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 5l6 5-6 5" />
    </svg>
  );
}

function TreeItemNode({ node, level }: { node: TreeNode; level: number }) {
  const ctx = useTreeViewContext("TreeItem");
  const hasChildren = Boolean(node.children?.length);
  const expanded = hasChildren && ctx.isExpanded(node.id);
  const selected = ctx.selectedId === node.id;
  const active = ctx.activeId === node.id;
  const disabled = Boolean(node.disabled);
  const Group = ctx.GroupComponent;

  return (
    <li role="none" data-slot="tree-view-item">
      <div
        role="treeitem"
        ref={(el) => ctx.registerItem(node.id, el)}
        aria-expanded={hasChildren ? expanded : undefined}
        aria-selected={selected}
        aria-level={level}
        aria-disabled={disabled || undefined}
        data-slot="tree-view-item-row"
        data-node-id={node.id}
        data-selected={selected}
        data-active={active}
        data-disabled={disabled}
        tabIndex={active ? 0 : -1}
        style={{ paddingLeft: `${(level - 1) * 1.25 + 0.5}rem` }}
        className={treeViewItemVariants({
          appearance: ctx.appearance,
          size: ctx.size,
        })}
        onClick={() => {
          if (disabled) {
            return;
          }
          if (hasChildren) {
            ctx.toggleExpanded(node.id);
          }
          ctx.selectNode(node);
        }}
        onKeyDown={ctx.onItemKeyDown}
      >
        {hasChildren ? (
          <span
            data-slot="tree-view-chevron"
            data-expanded={expanded}
            className={zuiTreeViewChevron}
          >
            <ChevronIcon />
          </span>
        ) : (
          <span aria-hidden className="inline-flex h-5 w-5 shrink-0" />
        )}
        {node.icon ? (
          <span data-slot="tree-view-icon" className={zuiTreeViewIcon}>
            {node.icon}
          </span>
        ) : null}
        <span data-slot="tree-view-label" className="truncate">
          {ctx.renderNode
            ? ctx.renderNode({
                node,
                depth: level,
                isExpanded: expanded,
                isSelected: selected,
              })
            : node.label}
        </span>
      </div>
      {hasChildren ? (
        <Group open={expanded} level={level}>
          <ol
            className={cn(
              ctx.showGuides && zuiTreeViewGuide,
              ctx.showGuides && "ml-5",
            )}
          >
            {node.children?.map((child) => (
              <TreeItemNode key={child.id} node={child} level={level + 1} />
            ))}
          </ol>
        </Group>
      ) : null}
    </li>
  );
}

export function TreeViewBase({
  data = [],
  defaultExpanded,
  expanded,
  onExpandedChange,
  defaultSelected,
  selected,
  onSelect,
  renderNode,
  showGuides = false,
  appearance = "default",
  size = "md",
  className,
  GroupComponent = StaticTreeGroup,
  ...rest
}: TreeViewBaseProps & {
  GroupComponent?: TreeViewCtx["GroupComponent"];
}) {
  const isExpandedControlled = expanded !== undefined;
  const isSelectedControlled = selected !== undefined;

  const [expandedUncontrolled, setExpandedUncontrolled] = useState<string[]>(
    defaultExpanded ?? [],
  );
  const [selectedUncontrolled, setSelectedUncontrolled] = useState<
    string | undefined
  >(defaultSelected);

  const expandedIds = isExpandedControlled
    ? (expanded ?? [])
    : expandedUncontrolled;
  const selectedId = isSelectedControlled ? selected : selectedUncontrolled;

  const expandedSet = useMemo(() => new Set(expandedIds), [expandedIds]);

  const isExpanded = useCallback(
    (id: string) => expandedSet.has(id),
    [expandedSet],
  );

  const commitExpanded = useCallback(
    (next: string[]) => {
      if (!isExpandedControlled) {
        setExpandedUncontrolled(next);
      }
      onExpandedChange?.(next);
    },
    [isExpandedControlled, onExpandedChange],
  );

  const setExpanded = useCallback(
    (id: string, open: boolean) => {
      const has = expandedSet.has(id);
      if (open === has) {
        return;
      }
      const next = open
        ? [...expandedIds, id]
        : expandedIds.filter((entry) => entry !== id);
      commitExpanded(next);
    },
    [commitExpanded, expandedIds, expandedSet],
  );

  const toggleExpanded = useCallback(
    (id: string) => {
      setExpanded(id, !expandedSet.has(id));
    },
    [expandedSet, setExpanded],
  );

  const itemRefs = useRef(new Map<string, HTMLDivElement>());
  const registerItem = useCallback(
    (id: string, el: HTMLDivElement | null) => {
      if (el) {
        itemRefs.current.set(id, el);
      } else {
        itemRefs.current.delete(id);
      }
    },
    [],
  );

  const visible = useMemo(
    () => flattenVisible(data, isExpanded),
    [data, isExpanded],
  );

  const firstEnabledId = useMemo(
    () => visible.find((entry) => !entry.node.disabled)?.node.id,
    [visible],
  );

  const [activeIdState, setActiveIdState] = useState<string | undefined>(
    undefined,
  );
  const isSelectedVisible = selectedId !== undefined && visible.some((entry) => entry.node.id === selectedId);
  const activeId =
    activeIdState && visible.some((entry) => entry.node.id === activeIdState)
      ? activeIdState
      : (isSelectedVisible ? selectedId : firstEnabledId);

  const focusItem = useCallback((id: string) => {
    setActiveIdState(id);
    itemRefs.current.get(id)?.focus();
  }, []);

  const selectNode = useCallback(
    (node: TreeNode) => {
      if (node.disabled) {
        return;
      }
      setActiveIdState(node.id);
      if (!isSelectedControlled) {
        setSelectedUncontrolled(node.id);
      }
      onSelect?.(node);
    },
    [isSelectedControlled, onSelect],
  );

  const onItemKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const currentId = (event.currentTarget.dataset.nodeId ??
        activeId) as string;
      const index = visible.findIndex((entry) => entry.node.id === currentId);
      const current = visible[index];
      if (index === -1 || !current) {
        return;
      }

      const moveTo = (target: number) => {
        const clamped = Math.max(0, Math.min(visible.length - 1, target));
        const next = visible[clamped];
        if (next) {
          focusItem(next.node.id);
        }
      };

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          moveTo(index + 1);
          break;
        case "ArrowUp":
          event.preventDefault();
          moveTo(index - 1);
          break;
        case "Home":
          event.preventDefault();
          moveTo(0);
          break;
        case "End":
          event.preventDefault();
          moveTo(visible.length - 1);
          break;
        case "ArrowRight": {
          event.preventDefault();
          const hasChildren = Boolean(current.node.children?.length);
          if (hasChildren && !isExpanded(current.node.id)) {
            setExpanded(current.node.id, true);
          } else if (hasChildren) {
            moveTo(index + 1);
          }
          break;
        }
        case "ArrowLeft": {
          event.preventDefault();
          const hasChildren = Boolean(current.node.children?.length);
          if (hasChildren && isExpanded(current.node.id)) {
            setExpanded(current.node.id, false);
          } else if (current.parentId) {
            focusItem(current.parentId);
          }
          break;
        }
        case "Enter":
        case " ":
          event.preventDefault();
          selectNode(current.node);
          break;
        default:
          break;
      }
    },
    [activeId, focusItem, isExpanded, selectNode, setExpanded, visible],
  );

  const ctx = useMemo<TreeViewCtx>(
    () => ({
      appearance: appearance ?? "default",
      size: size ?? "md",
      showGuides,
      GroupComponent,
      isExpanded,
      toggleExpanded,
      setExpanded,
      selectedId,
      activeId,
      selectNode,
      registerItem,
      onItemKeyDown,
      renderNode,
    }),
    [
      activeId,
      appearance,
      GroupComponent,
      isExpanded,
      onItemKeyDown,
      registerItem,
      renderNode,
      selectNode,
      selectedId,
      setExpanded,
      showGuides,
      size,
      toggleExpanded,
    ],
  );

  return (
    <TreeViewContext.Provider value={ctx}>
      <ul
        role="tree"
        data-slot="tree-view"
        aria-label={rest["aria-label"]}
        aria-labelledby={rest["aria-labelledby"]}
        className={cn(
          treeViewVariants({ appearance, size }),
          "list-none",
          className,
        )}
      >
        {data.map((node) => (
          <TreeItemNode key={node.id} node={node} level={1} />
        ))}
      </ul>
    </TreeViewContext.Provider>
  );
}

TreeViewBase.displayName = "TreeView";

export { useTreeViewContext };
