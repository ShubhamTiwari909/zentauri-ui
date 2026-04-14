import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "./avatar";

describe("Avatar", () => {
  it("should set displayName on compound parts", () => {
    expect(Avatar.displayName).toBe("Avatar");
    expect(AvatarImage.displayName).toBe("AvatarImage");
    expect(AvatarFallback.displayName).toBe("AvatarFallback");
    expect(AvatarGroup.displayName).toBe("AvatarGroup");
  });

  it("should stamp data-slot on avatar root", () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    );
    expect(document.querySelector('[data-slot="avatar"]')).toBeTruthy();
  });

  it("should forward ref on Avatar", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Avatar ref={ref}>
        <AvatarFallback>Z</AvatarFallback>
      </Avatar>,
    );
    expect(ref.current?.getAttribute("data-slot")).toBe("avatar");
  });

  it("should render AvatarGroup with aria-label", () => {
    render(
      <AvatarGroup aria-label="Team">
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    );
    expect(screen.getByRole("group", { name: "Team" })).toBeInTheDocument();
  });
});
