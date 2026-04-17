import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { AvatarDemo } from "./components/avatar-code-examples-demo";
import {
  AVATAR_ANIMATIONS,
  AVATAR_APPEARANCES,
  AVATAR_CODE_EXAMPLES_SECTION_CLASS,
  AVATAR_DEMO_ANIMATION_FOR_SIZE,
  AVATAR_DEMO_SIZE_FOR_ANIMATION,
  AVATAR_SIZES,
} from "./components/avatar-code-examples.data";
import {
  avatarSnippetForAnimation,
  avatarSnippetForAppearance,
  avatarSnippetForSize,
} from "./components/avatar-code-examples.snippets";

export function AvatarCodeExamplesSection() {
  return (
    <section className={AVATAR_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Avatar code examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Use Show output / Show code on each row. Snippets start with a Variant
        line naming size or animation.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {AVATAR_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={avatarSnippetForSize(size)}
          >
            <p className="mb-5 text-xs font-semibold text-white md:text-sm">
              Size: <span className="font-bold">{size.toUpperCase()}</span>
            </p>
            <AvatarDemo size={size} animation={AVATAR_DEMO_ANIMATION_FOR_SIZE} />
          </PreviewCodeShowcase>
        ))}
        {AVATAR_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`appearance-${appearance}`}
            code={avatarSnippetForAppearance(appearance)}
          >
            <p className="mb-5 text-xs font-semibold text-white md:text-sm">
              Appearance: <span className="font-bold">{appearance.toUpperCase()}</span>
            </p>
            <AvatarDemo size="sm" appearance={appearance} animation="none" />
          </PreviewCodeShowcase>
        ))}
        {AVATAR_ANIMATIONS.map((animation) => (
          <PreviewCodeShowcase
            key={`anim-${animation}`}
            code={avatarSnippetForAnimation(animation)}
          >
            <p className="mb-5 text-xs font-semibold text-white md:text-sm">
              Animation:{" "}
              <span className="font-bold">{animation.toUpperCase()}</span>
            </p>
            <AvatarDemo
              size={AVATAR_DEMO_SIZE_FOR_ANIMATION}
              animation={animation}
            />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
