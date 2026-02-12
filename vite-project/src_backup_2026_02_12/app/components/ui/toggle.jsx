"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva } from "class-variance-authority";
import "./toggle.css";

import { cn } from "./utils";

const toggleVariants = cva("toggle-root", {
  variants: {
    variant: {
      default: "toggle-variant-default",
      outline: "toggle-variant-outline",
    },
    size: {
      default: "toggle-size-default",
      sm: "toggle-size-sm",
      lg: "toggle-size-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Toggle({
  className,
  variant,
  size,
  ...props
}) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
