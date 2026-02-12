import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./utils";
import "./button.css";

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // Map variants to CSS classes
    const variantClass = {
      default: "btn-primary",
      destructive: "btn-destructive",
      outline: "btn-outline",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      link: "btn-link",
    }[variant] || "btn-primary";

    const sizeClass = {
      default: "btn-md",
      sm: "btn-sm",
      lg: "btn-lg",
      icon: "btn-icon",
    }[size] || "btn-md";

    return (
      <Comp
        className={cn("btn", variantClass, sizeClass, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };