"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@zentauri-ui/zentauri-components/ui/accordion";
import {
  Button,
  type ButtonSharedStatic,
} from "@zentauri-ui/zentauri-components/ui/buttons";
import { ButtonAnimated } from "@zentauri-ui/zentauri-components/ui/buttons/animated";
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

import { MotionReveal } from "./motion-reveal";
import { PreviewCodeTabs } from "./preview-code-tabs";
import { SectionShell } from "./section-shell";

const CODE_BUTTON = `<ButtonAnimated className="" appearance="sky" animation="lift" size="sm">Button sky</ButtonAnimated>

<ButtonAnimated className="" appearance="pink" animation="lift" size="sm">Button pink</ButtonAnimated>

<ButtonAnimated className="" appearance="amber" animation="lift" size="sm">Button amber</ButtonAnimated>

<ButtonAnimated className="" appearance="gradient-purple" animation="lift" size="sm">
  Button gradient-purple
</ButtonAnimated>

<ButtonAnimated className="" appearance="gradient-red" animation="lift" size="sm">Button gradient-red</ButtonAnimated>`;

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
                <p className="text-sm text-slate-300">
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

const CODE_ACCORDION = `<Accordion type="single" defaultValue="a" appearance="sky" size="sm">
  <AccordionItem value="a">
    <AccordionTrigger>API keys</AccordionTrigger>
    <AccordionContent>
      <p className="text-sm text-slate-300">Rotate keys from the security tab.</p>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="b">
    <AccordionTrigger>Webhooks</AccordionTrigger>
    <AccordionContent>
      <p className="text-sm text-slate-300">Retry policy and signing secrets.</p>
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

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
    <article className="space-y-4">
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
      <PreviewCodeTabs preview={preview} code={code} />
    </article>
  );
}

export function HomeComponentShowcase() {
  return (
    <MotionReveal>
      <SectionShell
        eyebrow="Live previews"
        title="Components in context"
        lead="Toggle Preview and Code—snippets mirror real props from the package."
      >
        <div className="space-y-12">
          <ShowcaseRow
            title="Button"
            href="/preview/components/buttons"
            code={CODE_BUTTON}
            preview={
              <div className="flex flex-wrap gap-3">
                <ButtonAnimated
                  className=""
                  appearance="sky"
                  animation="lift"
                  size="sm"
                >
                  Button sky
                </ButtonAnimated>
                <ButtonAnimated
                  className=""
                  appearance="pink"
                  animation="lift"
                  size="sm"
                >
                  Button pink
                </ButtonAnimated>
                <ButtonAnimated
                  className=""
                  appearance="amber"
                  animation="lift"
                  size="sm"
                >
                  Button amber
                </ButtonAnimated>
                <ButtonAnimated
                  className=""
                  appearance="gradient-purple"
                  animation="lift"
                  size="sm"
                >
                  Button gradient-purple
                </ButtonAnimated>
                <ButtonAnimated
                  className=""
                  appearance="gradient-red"
                  animation="lift"
                  size="sm"
                >
                  Button gradient-red
                </ButtonAnimated>
              </div>
            }
          />
          <ShowcaseRow
            title="Modal"
            href="/preview/components/modal"
            code={CODE_MODAL}
            preview={<div className="flex flex-wrap gap-3">
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
                            <p className="text-sm text-slate-300">
                              Modal content here.
                            </p>
                          </ModalBody>
                        </ModalContentAnimated>
                      </Modal>
                    );
                  },
                )
              }
            </div>}
          />
          <ShowcaseRow
            title="Accordion"
            href="/preview/components/accordion"
            code={CODE_ACCORDION}
            preview={
              <Accordion
                className="space-y-4"
                type="single"
                defaultValue="a"
                appearance="sky"
                size="sm"
              >
                <AccordionItem className="" value="a">
                  <AccordionTrigger className="">API keys</AccordionTrigger>
                  <AccordionContent className="">
                    <p className="text-sm text-slate-300">
                      Rotate keys from the security tab.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem className="" value="b">
                  <AccordionTrigger className="">Webhooks</AccordionTrigger>
                  <AccordionContent className="">
                    <p className="text-sm text-slate-300">
                      Retry policy and signing secrets.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
        </div>
      </SectionShell>
    </MotionReveal>
  );
}
