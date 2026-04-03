import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
};

type ButtonAsButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLinkProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variants = {
  primary:
    "border border-white/12 bg-white text-[#07101e] shadow-[0_12px_34px_rgba(255,255,255,0.12)] hover:bg-[#eef3ff]",
  secondary:
    "border border-white/12 bg-white/6 text-white hover:bg-white/10 backdrop-blur-xl",
};

const sizes = {
  md: "h-11 px-5 rounded-2xl text-sm",
  lg: "h-12 px-6 rounded-2xl text-[15px]",
};

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = "primary",
    size = "md",
    ...rest
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-white/20",
    variants[variant],
    sizes[size],
    className
  );

  if ("href" in props) {
    const { href, ...linkProps } = props as ButtonAsLinkProps;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
