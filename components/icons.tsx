import type { SVGProps } from "react";

type IconName =
  | "search"
  | "chart"
  | "shield"
  | "trend"
  | "message"
  | "scale"
  | "article"
  | "arrow";

export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  const common: SVGProps<SVGSVGElement> = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (name === "search") {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </svg>
    );
  }

  if (name === "chart") {
    return (
      <svg {...common}>
        <path d="M5 20V11" />
        <path d="M12 20V4" />
        <path d="M19 20v-7" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg {...common}>
        <path d="M12 3 5.5 5.7v5.6c0 4.3 2.7 7.8 6.5 9.7 3.8-1.9 6.5-5.4 6.5-9.7V5.7L12 3Z" />
      </svg>
    );
  }

  if (name === "trend") {
    return (
      <svg {...common}>
        <path d="m3 17 5-5 4 2 8-8" />
        <path d="M16 6h4v4" />
      </svg>
    );
  }

  if (name === "message") {
    return (
      <svg {...common}>
        <path d="M20 11.5a8 8 0 0 1-8 8 9 9 0 0 1-3.8-.9L4 20l1.4-4A8 8 0 1 1 20 11.5Z" />
        <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
      </svg>
    );
  }

  if (name === "scale") {
    return (
      <svg {...common}>
        <path d="M12 3v18M5 6h14M7 6l-4 7h8L7 6ZM17 6l-4 7h8l-4-7ZM7 21h10" />
      </svg>
    );
  }

  if (name === "article") {
    return (
      <svg {...common}>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`grid shrink-0 place-items-center rounded-full border-[1.5px] border-[#111] ${
          compact ? "h-7 w-7" : "h-9 w-9"
        }`}
      >
        <span className="text-[13px] leading-none">✦</span>
      </span>
      <span className={compact ? "text-sm font-semibold" : "text-xl font-semibold tracking-[-0.03em]"}>
        AI Price Guide
      </span>
    </div>
  );
}
