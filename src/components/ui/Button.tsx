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
  primary: `
    text-white
    border border-[rgba(164,192,255,0.26)]
    bg-[linear-gradient(135deg,rgba(82,116,255,0.96),rgba(43,92,255,0.90))]
    shadow-[0_10px_40px_rgba(60,100,255,0.35),inset_0_1px_0_rgba(255,255,255,0.20)]
    hover:shadow-[0_18px_70px_rgba(60,100,255,0.55),inset_0_1px_0_rgba(255,255,255,0.26)]
    hover:border-[rgba(184,204,255,0.34)]
  `,
  secondary: `
    text-white
    border border-white/15
    bg-white/6
    backdrop-blur-xl
    shadow-[0_10px_34px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.05)]
    hover:bg-white/10
    hover:border-white/20
    hover:shadow-[0_16px_40px_rgba(0,0,0,0.28),0_0_50px_rgba(78,117,255,0.10)]
  `,
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
    "button-shimmer lift-hover inline-flex items-center justify-center font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 active:scale-[0.985]",
    variants[variant],
    sizes[size],
    className
  );

  if ("href" in props) {
    const { href, ...linkProps } = props as ButtonAsLinkProps;
    return (
      <Link href={href} className={classes} {...linkProps}>
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      <span>{children}</span>
    </button>
  );
}
