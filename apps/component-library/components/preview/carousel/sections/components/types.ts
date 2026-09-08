import type { CarouselProps } from "@zentauri-ui/zentauri-components/ui/carousel";
import type {
  CarouselAnimation,
  CarouselReveal,
} from "@zentauri-ui/zentauri-components/ui/carousel/animated";

export type CarouselAppearanceOption = NonNullable<CarouselProps["appearance"]>;
export type CarouselSizeOption = NonNullable<CarouselProps["size"]>;
export type CarouselOrientationOption = NonNullable<
  CarouselProps["orientation"]
>;
export type CarouselFrameOption = NonNullable<CarouselProps["frame"]>;

/** The playground models "no arrows" as a third option rather than a boolean. */
export type CarouselArrowsOption = "inside" | "outside" | "off";

export type CarouselDemoProps = {
  appearance: CarouselAppearanceOption;
  size: CarouselSizeOption;
  orientation: CarouselOrientationOption;
  frame: CarouselFrameOption;
  animation: CarouselAnimation;
  reveal: CarouselReveal;
  arrows: CarouselArrowsOption;
  slideCount: number;
  slidesPerView: number;
  loop: boolean;
  draggable: boolean;
  autoPlay: boolean;
  dots: boolean;
  counter: boolean;
  progress: boolean;
  disabled: boolean;
};
