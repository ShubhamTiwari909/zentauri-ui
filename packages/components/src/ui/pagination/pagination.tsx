"use client";

import { forwardRef, useCallback, useId, type KeyboardEvent } from "react";

import { cn, clampPage } from "../../lib/utils";
import { buttonVariants } from "../buttons/variants";

import type { PaginationProps } from "./types";
import { usePagination } from "../../hooks/usePagination";
import { paginationEllipsisVariants, paginationListVariants } from "./variants";

const defaultPrevLabel = "Previous page";
const defaultNextLabel = "Next page";
const defaultEllipsisLabel = "More pages";

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  function Pagination(
    {
      className,
      appearance = "default",
      size = "md",
      pageCount,
      page,
      defaultPage = 1,
      onPageChange,
      siblingCount = 1,
      boundaryCount = 1,
      showPrevNext = true,
      prevLabel = defaultPrevLabel,
      nextLabel = defaultNextLabel,
      ellipsisLabel = defaultEllipsisLabel,
      getPageHref,
      "aria-label": ariaLabel = "Pagination",
      ...rest
    },
    ref,
  ) {
    const id = useId();
    const listId = `${id}-list`;

    const {
      currentPage,
      items,
      setPage,
      goPrev,
      goNext,
      canGoPrev,
      canGoNext,
    } = usePagination({
      pageCount,
      page,
      defaultPage,
      siblingCount,
      boundaryCount,
      onPageChange,
    });

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLElement>) => {
        if (pageCount <= 0) {
          return;
        }
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          if (canGoNext) {
            setPage(currentPage + 1);
          }
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          if (canGoPrev) {
            setPage(currentPage - 1);
          }
        } else if (event.key === "Home") {
          event.preventDefault();
          setPage(1);
        } else if (event.key === "End") {
          event.preventDefault();
          setPage(pageCount);
        }
      },
      [canGoNext, canGoPrev, currentPage, pageCount, setPage],
    );

    if (pageCount <= 0) {
      return null;
    }

    const inactiveTriggerClass = cn(
      buttonVariants({ appearance: "ghost", size }),
      "bg-white/[0.04] text-slate-200 hover:bg-white/10",
    );

    const currentTriggerClass = buttonVariants({ appearance, size });

    const triggerFocusRing =
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

    const renderPageControl = (pageNumber: number) => {
      const isCurrent = pageNumber === currentPage;
      const href = getPageHref?.(pageNumber);
      const shared = cn(
        isCurrent ? currentTriggerClass : inactiveTriggerClass,
        "min-w-[2.25ch] shrink-0",
        triggerFocusRing,
      );

      if (href) {
        return (
          <a
            data-slot="pagination-trigger"
            href={href}
            aria-label={`Page ${pageNumber}`}
            aria-current={isCurrent ? "page" : undefined}
            className={shared}
          >
            {pageNumber}
          </a>
        );
      }

      return (
        <button
          type="button"
          data-slot="pagination-trigger"
          aria-label={`Page ${pageNumber}`}
          aria-current={isCurrent ? "page" : undefined}
          className={shared}
          onClick={() => {
            if (!isCurrent) {
              setPage(pageNumber);
            }
          }}
        >
          {pageNumber}
        </button>
      );
    };

    const prevHref = getPageHref?.(clampPage(currentPage - 1, pageCount));
    const nextHref = getPageHref?.(clampPage(currentPage + 1, pageCount));

    const navTriggerClass = cn(
      buttonVariants({ appearance: "outline", size }),
      "shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
    );

    return (
      <nav
        ref={ref}
        data-slot="pagination"
        aria-label={ariaLabel}
        className={cn("w-full", className)}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <div className="flex flex-wrap items-center gap-2">
          {showPrevNext ? (
            getPageHref && prevHref && canGoPrev ? (
              <a
                data-slot="pagination-prev"
                aria-label={prevLabel}
                href={prevHref}
                className={navTriggerClass}
              >
                Prev
              </a>
            ) : (
              <button
                type="button"
                data-slot="pagination-prev"
                aria-label={prevLabel}
                disabled={!canGoPrev}
                className={navTriggerClass}
                onClick={goPrev}
              >
                Prev
              </button>
            )
          ) : null}

          <ul
            id={listId}
            data-slot="pagination-list"
            className={paginationListVariants({ appearance, size })}
          >
            {items.map((item) => (
              <li
                key={item.type === "page" ? `page-${item.value}` : item.key}
                data-slot="pagination-item"
                className="inline-flex items-center"
              >
                {item.type === "ellipsis" ? (
                  <span
                    data-slot="pagination-ellipsis"
                    aria-hidden="true"
                    title={ellipsisLabel}
                    className={paginationEllipsisVariants({ size })}
                  >
                    …
                  </span>
                ) : (
                  renderPageControl(item.value)
                )}
              </li>
            ))}
          </ul>

          {showPrevNext ? (
            getPageHref && nextHref && canGoNext ? (
              <a
                data-slot="pagination-next"
                aria-label={nextLabel}
                href={nextHref}
                className={navTriggerClass}
              >
                Next
              </a>
            ) : (
              <button
                type="button"
                data-slot="pagination-next"
                aria-label={nextLabel}
                disabled={!canGoNext}
                className={navTriggerClass}
                onClick={goNext}
              >
                Next
              </button>
            )
          ) : null}
        </div>
      </nav>
    );
  },
);

Pagination.displayName = "Pagination";
