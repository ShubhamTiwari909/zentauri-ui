import { cn } from "../../lib/utils";

import type { ListProps, ListItemProps } from "./types";
import {
  orderedListVariants,
  typographyToneVariants,
  unorderedListMarkerVariants,
} from "./variants";

export function ListBase(props: ListProps) {
  if ("ordered" in props && props.ordered === true) {
    const {
      tone,
      className,
      children,
      ref,
      ordered,
      marker,
      ...rest
    } = props;

    void ordered;
    void marker;

    return (
      <ol
        ref={ref}
        data-slot="typography-list"
        data-list-type="ordered"
        className={cn(
          typographyToneVariants({ tone }),
          orderedListVariants(),
          className,
        )}
        {...rest}
      >
        {children}
      </ol>
    );
  }

  const {
    marker = "disc",
    tone,
    className,
    children,
    ref,
    ordered,
    ...rest
  } = props;

  void ordered;

  return (
    <ul
      ref={ref}
      data-slot="typography-list"
      data-list-type="unordered"
      className={cn(
        typographyToneVariants({ tone }),
        unorderedListMarkerVariants({ marker }),
        className,
      )}
      {...rest}
    >
      {children}
    </ul>
  );
}

ListBase.displayName = "List";

export function ListItemBase(props: ListItemProps) {
  const { className, children, ref, ...rest } = props;

  return (
    <li
      ref={ref}
      data-slot="typography-list-item"
      className={cn("leading-relaxed", className)}
      {...rest}
    >
      {children}
    </li>
  );
}

ListItemBase.displayName = "ListItem";
