import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./utils";
import "./badge.css";

function Badge({ className, variant = "default", asChild = false, ...props }) {
  const Comp = asChild ? Slot : "span";

  const variantClass = {
    default: "badge-default",
    secondary: "badge-secondary",
    destructive: "badge-destructive",
    outline: "badge-outline",
  }[variant] || "badge-default";

  return (
    <Comp
      data-slot="badge"
      className={cn("badge", variantClass, className)}
      {...props}
    />
  );
}

export { Badge };
