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
import { FaChevronRight } from "react-icons/fa6";

const TreeViewContext = createContext<TreeViewCtx | null>(null);

/**
 * Reads the shared tree-view state from context and fails early when a tree item
 * is rendered outside the TreeView provider. The component name keeps the error
 * message actionable for consumers composing custom tree-view pieces.
 */
function useTreeViewContext(component: string): TreeViewCtx {
  const ctx = useContext(TreeViewContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <TreeView>`);
  }
  return ctx;
}

type FlatNode = { node: TreeNode; level: number; parentId: string | null };

/**
 * Converts the nested tree into a flat list of the nodes that are currently
 * visible. Keyboard navigation works against this list so ArrowUp/ArrowDown can
 * move through the rendered rows in visual order without walking the nested
 * structure on every key press.
 *
 * The same accumulator is passed through recursive calls to avoid creating and
 * merging many intermediate arrays for large trees.
 */
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

/**
 * Default non-animated group wrapper. Animated tree variants can replace this
 * component through GroupComponent while the recursive TreeItemNode rendering
 * remains shared.
 */
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

function TreeItemNode({
  node,
  level,
  chevronIcon,
}: {
  node: TreeNode;
  level: number;
  chevronIcon?: React.ReactNode;
}) {
  const {
    isExpanded,
    selectedId,
    activeId,
    GroupComponent,
    registerItem,
    appearance,
    size,
    toggleExpanded,
    selectNode,
    onItemKeyDown,
    renderNode,
    showGuides,
  } = useTreeViewContext("TreeItem");

  // These derived flags keep the JSX readable and mirror the ARIA state applied
  // to each row below.
  const hasChildren = Boolean(node.children?.length);
  const expanded = hasChildren && isExpanded(node.id);
  const selected = selectedId === node.id;
  const active = activeId === node.id;
  const disabled = Boolean(node.disabled);

  // GroupComponent is intentionally resolved from context so the base tree can
  // be reused by static and animated implementations without duplicating item
  // rendering logic.
  const Group = GroupComponent;

  return (
    <li role="none" data-slot="tree-view-item">
      <div
        role="treeitem"
        // Register the focusable row so keyboard navigation can imperatively
        // focus the next visible item after the active id changes.
        ref={(el) => registerItem(node.id, el)}
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
        // Each level indents by a fixed step. The root still gets a small inset
        // so chevrons and labels align with surrounding UI.
        style={{ paddingLeft: `${(level - 1) * 1.25 + 0.5}rem` }}
        className={treeViewItemVariants({
          appearance: appearance,
          size: size,
        })}
        onClick={() => {
          // Disabled rows are rendered for context but should not toggle,
          // select, or receive active focus from pointer interaction.
          if (disabled) {
            return;
          }

          // Clicking a parent both toggles disclosure and selects the row,
          // matching the same selection behavior as leaf nodes.
          if (hasChildren) {
            toggleExpanded(node.id);
          }
          selectNode(node);
        }}
        onKeyDown={onItemKeyDown}
      >
        {hasChildren ? (
          <span
            data-slot="tree-view-chevron"
            data-expanded={expanded}
            className={zuiTreeViewChevron}
          >
            {chevronIcon || <FaChevronRight />}
          </span>
        ) : (
          // Leaf nodes reserve chevron space to keep labels vertically aligned
          // with sibling branches that do have disclosure icons.
          <span aria-hidden className="inline-flex h-5 w-5 shrink-0" />
        )}
        {node.icon ? (
          <span data-slot="tree-view-icon" className={zuiTreeViewIcon}>
            {node.icon}
          </span>
        ) : null}
        <span data-slot="tree-view-label" className="truncate">
          {renderNode
            ? renderNode({
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
            className={cn(showGuides && zuiTreeViewGuide, showGuides && "ml-5")}
          >
            {node.children?.map((child) => (
              // Recursion preserves each child's depth so ARIA levels,
              // indentation, and guide spacing all stay in sync.
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
  // Mirror common React controlled/uncontrolled patterns. When a controlled prop
  // is provided, internal state is treated as read-only fallback state and every
  // change is reported through the matching callback.
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

  // A Set gives O(1) lookup for expansion checks. This is used in render, the
  // flattening utility, and keyboard navigation, so memoizing it prevents
  // rebuilding the lookup unless the expanded ids actually change.
  const expandedSet = useMemo(() => new Set(expandedIds), [expandedIds]);

  const isExpanded = useCallback(
    (id: string) => expandedSet.has(id),
    [expandedSet],
  );

  // Centralizes the "commit" step so controlled and uncontrolled expansion
  // updates always notify consumers consistently.
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

      // Avoid sending duplicate updates when the requested state already
      // matches the current expansion state.
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

  // Stores mounted treeitem rows by node id. The Map is held in a ref because
  // focus targets change over time without needing to trigger React renders.
  const itemRefs = useRef(new Map<string, HTMLDivElement>());
  const registerItem = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) {
      itemRefs.current.set(id, el);
    } else {
      itemRefs.current.delete(id);
    }
  }, []);

  // Only expanded branches are included. This becomes the single source of truth
  // for roving focus and Home/End/Arrow navigation.
  const visible = useMemo(
    () => flattenVisible(data, isExpanded),
    [data, isExpanded],
  );

  // Used as a safe fallback for tab focus when nothing has been selected or when
  // the selected/active item is hidden by a collapsed parent.
  const firstEnabledId = useMemo(
    () => visible.find((entry) => !entry.node.disabled)?.node.id,
    [visible],
  );

  const [activeIdState, setActiveIdState] = useState<string | undefined>(
    undefined,
  );

  // A selected item can become hidden when an ancestor is collapsed. In that
  // case it should not keep the roving tab stop; focus falls back below.
  const isSelectedVisible =
    selectedId !== undefined &&
    visible.some((entry) => entry.node.id === selectedId);

  // Roving tabindex chooses a single keyboard tab stop: prefer the last active
  // visible item, then the selected visible item, then the first enabled row.
  const activeId =
    activeIdState && visible.some((entry) => entry.node.id === activeIdState)
      ? activeIdState
      : isSelectedVisible
        ? selectedId
        : firstEnabledId;

  // Updates logical focus state and then focuses the mounted row when available.
  // Optional chaining handles cases where React has not mounted the row yet.
  const focusItem = useCallback((id: string) => {
    setActiveIdState(id);
    itemRefs.current.get(id)?.focus();
  }, []);

  const selectNode = useCallback(
    (node: TreeNode) => {
      // Selection ignores disabled nodes from both pointer and keyboard paths.
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
      // Prefer the DOM row id because the event always originates from a
      // treeitem. activeId is a fallback for unusual composed event paths.
      const currentId = (event.currentTarget.dataset.nodeId ??
        activeId) as string;
      const index = visible.findIndex((entry) => entry.node.id === currentId);
      const current = visible[index];
      if (index === -1 || !current) {
        return;
      }

      const moveTo = (target: number) => {
        // Clamp so repeated ArrowUp/ArrowDown at the edges keeps focus on the
        // first or last visible item instead of producing an invalid index.
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

          // Right arrow first opens a closed branch. If it is already open,
          // focus moves to the next visible row, which is the first child.
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

          // Left arrow closes an open branch. From a leaf or already-closed
          // branch, it moves focus back to the parent row when there is one.
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
          // Enter and Space select the current row. Parent expansion remains on
          // the arrow keys so keyboard users have predictable disclosure control.
          selectNode(current.node);
          break;
        default:
          break;
      }
    },
    [activeId, focusItem, isExpanded, selectNode, setExpanded, visible],
  );

  // Memoize the context payload so recursive items only re-render when the tree
  // state or rendering options they consume actually change.
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
