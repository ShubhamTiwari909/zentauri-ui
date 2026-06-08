"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import {
  Button,
  type ButtonSharedStatic,
} from "@zentauri-ui/zentauri-components/ui/buttons";
import { AnimatedNumberDemo } from "@/components/preview/animated-number/sections/components/demo";
import { animatedNumberSnippet } from "@/components/preview/animated-number/sections/components/snippets";
import { MarqueeDemo } from "@/components/preview/marquee/sections/components/demo";
import { marqueeSnippet } from "@/components/preview/marquee/sections/components/snippets";
import { RatingDemo } from "@/components/preview/rating/sections/components/demo";
import { ratingSnippet } from "@/components/preview/rating/sections/components/snippets";
import { TreeViewDemo } from "@/components/preview/tree-view/sections/components/demo";
import { treeViewSnippet } from "@/components/preview/tree-view/sections/components/snippets";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@zentauri-ui/zentauri-components/ui/modal";
import { ModalContentAnimated } from "@zentauri-ui/zentauri-components/ui/modal/animated";
import {
  RangeSlider,
  Slider,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "@zentauri-ui/zentauri-components/ui/slider";
import {
  useToast,
  type ToastRootVariantProps,
} from "@zentauri-ui/zentauri-components/ui/toast";
import { FiExternalLink } from "react-icons/fi";

import { PreviewCodeTabs } from "./preview-code-tabs";
import { SectionShell } from "./section-shell";
import { cn } from "@/lib/utils";

const CODE_MODAL = `<div className="flex flex-wrap gap-3">
  {
    ["sky",'rose', 'emerald', "gradient-teal", "gradient-indigo"].map(
      (appearance) => {
        return (
          <Modal key={appearance}>
            <ModalTrigger appearance={appearance} className="px-5 py-3">
              Open dialog
            </ModalTrigger>
            <ModalContentAnimated
              className=""
              size="sm"
              animation="scale"
              position="center"
              appearance={appearance}
            >
              <ModalClose className="">×</ModalClose>
              <ModalHeader className="">
                <ModalTitle className="">Edit field</ModalTitle>
                <ModalDescription className="">
                  Save changes to this row.
                </ModalDescription>
              </ModalHeader>
              <ModalBody className="">
                <p className="text-sm text-slate-900 dark:text-slate-300">
                  Modal content here.
                </p>
              </ModalBody>
            </ModalContentAnimated>
          </Modal>
        );
      },
    )
  }
</div>`;

const CODE_TOAST = `const { toast } = useToast();

<Button
  size="sm"
  appearance="emerald"
  type="button"
  onClick={() =>
    toast({
      title: "Saved",
      description: "Layout stored for this workspace.",
      appearance: "success",
    })
  }
>
  Show toast
</Button>
<Button
  size="sm"
  appearance="sky"
  type="button"
  onClick={() =>
    toast({
      title: "Saved",
      description: "Layout stored for this workspace.",
      appearance: "info",
    })
  }
>
  Show toast
</Button>
<Button
  size="sm"
  appearance="amber"
  type="button"
  onClick={() =>
    toast({
      title: "Saved",
      description: "Layout stored for this workspace.",
      appearance: "warning",
    })
  }
>
  Show toast
</Button>
<Button
  size="sm"
  appearance="gradient-purple"
  type="button"
  onClick={() =>
    toast({
      title: "Saved",
      description: "Layout stored for this workspace.",
      appearance: "purple",
    })
  }
>
  Show toast
</Button>
`;

const CODE_SLIDER = `const [value, setValue] = useState(42)
const [rangeValue, setRangeValue] = useState<[number, number]>([25, 75]);
const sliderRef = useRef<HTMLDivElement | null>(null);;

<Slider
  ref={sliderRef}
  className="w-full"
  value={value}
  defaultValue={42}
  onValueChange={setValue}
  max={100}
  aria-label="Demo slider"
  aria-labelledby="home-slider-demo-label"
>
  <SliderTrack className="" >
    <SliderRange className=""  />
    <SliderThumb className=""  />
  </SliderTrack>
</Slider>
<p className="text-xs text-slate-400">Value: {value}</p>

<RangeSlider 
  value={rangeValue} 
  onValueChange={setRangeValue} 
  defaultValue={[25, 75]} 
  aria-label="Example range" 
  appearance="gradient-pink" 
/>
<p className="text-xs text-slate-400">Range Value: {rangeValue[0]} - {rangeValue[1]}</p>`;

function ToastDemoPreview({
  btnAppearance,
  toastAppearance,
}: {
  btnAppearance: ButtonSharedStatic["appearance"];
  toastAppearance: ToastRootVariantProps["appearance"];
}) {
  const { toast } = useToast();
  return (
    <Button
      className=""
      size="sm"
      appearance={btnAppearance}
      type="button"
      onClick={() =>
        toast({
          title: "Saved",
          description: "Layout stored for this workspace.",
          appearance: toastAppearance,
        })
      }
    >
      Show toast
    </Button>
  );
}

function SliderDemoPreview() {
  const [value, setValue] = useState(42);
  const [rangeValue, setRangeValue] = useState<[number, number]>([25, 75]);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="space-y-2">
      <span id="home-slider-demo-label" className="sr-only">
        Demo slider
      </span>
      <Slider
        ref={sliderRef}
        className="w-full"
        value={value}
        defaultValue={42}
        onValueChange={setValue}
        max={100}
        aria-label="Demo slider"
        aria-labelledby="home-slider-demo-label"
      >
        <SliderTrack className="">
          <SliderRange className="" />
          <SliderThumb className="" />
        </SliderTrack>
      </Slider>
      <p className="text-xs text-slate-400">Value: {value}</p>
      <RangeSlider
        value={rangeValue}
        onValueChange={setRangeValue}
        defaultValue={[25, 75]}
        aria-label="Example range"
        appearance="gradient-pink"
      />
      <p className="text-xs text-slate-400">
        Range Value: {rangeValue[0]} - {rangeValue[1]}
      </p>
    </div>
  );
}

type ShowcaseRowProps = {
  title: string;
  href: string;
  preview: ReactNode;
  code: string;
};

function ShowcaseRow({ title, href, preview, code }: ShowcaseRowProps) {
  return (
    <article
      className={cn(
        "border-t border-white/10 pt-5 first:border-t-0 first:pt-0",
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-white">
          <Link
            href={href}
            className="inline-flex items-center gap-2 transition hover:text-cyan-100"
          >
            {title}
            <FiExternalLink className="h-4 w-4 text-slate-500" aria-hidden />
          </Link>
        </h3>
      </div>
      <div className="mt-4">
        <PreviewCodeTabs preview={preview} code={code} />
      </div>
    </article>
  );
}

export function HomeComponentShowcase() {
  return (
    <SectionShell
      eyebrow="Live previews"
      title="Components in context"
      lead="Toggle Preview and Code—snippets mirror real props from the package."
    >
      <div className="space-y-5">
        <ShowcaseRow
          title="Modal"
          href="/preview/components/modal"
          code={CODE_MODAL}
          preview={
            <div className="flex flex-wrap gap-3">
              {(
                [
                  "sky",
                  "rose",
                  "emerald",
                  "gradient-teal",
                  "gradient-indigo",
                ] as const
              ).map((appearance) => {
                return (
                  <Modal key={appearance}>
                    <ModalTrigger appearance={appearance} className="px-5 py-3">
                      Open dialog
                    </ModalTrigger>
                    <ModalContentAnimated
                      className=""
                      size="sm"
                      animation="scale"
                      position="center"
                      appearance={appearance}
                    >
                      <ModalClose className="">×</ModalClose>
                      <ModalHeader className="">
                        <ModalTitle className="">Edit field</ModalTitle>
                        <ModalDescription className="">
                          Save changes to this row.
                        </ModalDescription>
                      </ModalHeader>
                      <ModalBody className="">
                        <p className="text-sm text-slate-900 dark:text-slate-300">
                          Modal content here.
                        </p>
                      </ModalBody>
                    </ModalContentAnimated>
                  </Modal>
                );
              })}
            </div>
          }
        />
        <ShowcaseRow
          title="Toast"
          href="/preview/components/toast"
          code={CODE_TOAST}
          preview={
            <div className="flex flex-wrap gap-3">
              <ToastDemoPreview
                btnAppearance="emerald"
                toastAppearance="success"
              />
              <ToastDemoPreview btnAppearance="sky" toastAppearance="info" />
              <ToastDemoPreview
                btnAppearance="amber"
                toastAppearance="warning"
              />
              <ToastDemoPreview
                btnAppearance="gradient-purple"
                toastAppearance="purple"
              />
            </div>
          }
        />
        <ShowcaseRow
          title="Slider"
          href="/preview/components/slider"
          code={CODE_SLIDER}
          preview={<SliderDemoPreview />}
        />
        <ShowcaseRow
          title="Animated Number"
          href="/preview/components/animated-number"
          code={animatedNumberSnippet({
            appearance: "gradient-teal",
            size: "lg",
            type: "scaleUp",
          })}
          preview={
            <div className="flex flex-wrap gap-4 items-center justify-center py-6">
              <AnimatedNumberDemo
                appearance="gradient-teal"
                size="lg"
                type="scaleUp"
              />
              <AnimatedNumberDemo
                appearance="gradient-blue"
                size="lg"
                type="scaleDown"
              />
              <AnimatedNumberDemo
                appearance="gradient-purple"
                size="lg"
                type="fade"
              />
            </div>
          }
        />
        <ShowcaseRow
          title="Marquee"
          href="/preview/components/marquee"
          code={marqueeSnippet({
            appearance: "gradient-blue",
            pauseOnHover: true,
            size: "md",
            speed: 28,
          })}
          preview={
            <MarqueeDemo
              appearance="gradient-blue"
              pauseOnHover
              size="md"
              speed={28}
            />
          }
        />
        <ShowcaseRow
          title="Rating"
          href="/preview/components/rating"
          code={ratingSnippet({
            allowClear: true,
            allowHalf: true,
            appearance: "gradient-yellow",
            size: "md",
          })}
          preview={
            <RatingDemo
              allowClear
              allowHalf
              appearance="gradient-yellow"
              size="md"
            />
          }
        />
        <ShowcaseRow
          title="Tree view"
          href="/preview/components/tree-view"
          code={treeViewSnippet({
            animated: true,
            appearance: "card",
            showGuides: true,
            size: "sm",
            transition: "smooth",
          })}
          preview={
            <div className="flex flex-wrap gap-4 min-w-full">
              <TreeViewDemo
                animated
                appearance="card"
                showGuides
                size="sm"
                transition="smooth"
              />
              <TreeViewDemo
                animated
                appearance="sky"
                showGuides
                size="sm"
                transition="smooth"
              />
            </div>
          }
        />
      </div>
    </SectionShell>
  );
}
