import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-violet-500 text-gris-50 hover:bg-violet-400 hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/25",
  secondary:
    "bg-cyan-500 text-noir-800 hover:bg-cyan-400 hover:scale-[1.02]",
  outline:
    "border-2 border-violet-500 text-violet-400 hover:bg-violet-500/10",
  ghost:
    "text-violet-400 hover:bg-violet-500/10",
};

interface BaseProps {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type Props = ButtonProps | LinkProps;

/**
 * Button - Polymorphic button/link component with dark theme variant and size support.
 * Collectif Nova palette: violet-500 (#7B61FF) primary, cyan-500 (#00E5CC) secondary.
 *
 * @component
 * @example
 * ```tsx
 * <Button variant="primary" size="md">Click me</Button>
 * <Button href="/about" variant="outline">Learn more</Button>
 * ```
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: Props) {
  const classes = clsx(
    "inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-noir-800",
    variants[variant],
    {
      "px-4 py-2 text-sm": size === "sm",
      "px-6 py-3 text-base": size === "md",
      "px-8 py-4 text-lg": size === "lg",
    },
    className
  );

  if ("href" in props && props.href) {
    return <a className={classes} {...(props as LinkProps)} />;
  }

  return <button className={classes} {...(props as ButtonProps)} />;
}
