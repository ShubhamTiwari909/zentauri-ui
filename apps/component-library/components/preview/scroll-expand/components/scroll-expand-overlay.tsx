export function ScrollExpandOverlay({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) {
  return (
    <>
      <h3 className="text-2xl font-semibold tracking-tight sm:text-4xl">
        {heading}
      </h3>
      <p className="max-w-md text-sm leading-6 opacity-85 sm:text-base">
        {body}
      </p>
    </>
  );
}
