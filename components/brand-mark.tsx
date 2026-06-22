export function BrandMark({ compact = false }: { compact?: boolean }) {
  const size = compact ? 24 : 40;

  return (
    <div className="flex items-center gap-3">
      <img
        alt=""
        aria-hidden="true"
        className="shrink-0 object-contain"
        height={size}
        src="/brand/daisy-64.png"
        width={size}
      />
      <span
        className={
          compact
            ? "text-sm font-semibold"
            : "text-xl font-semibold tracking-[-0.03em]"
        }
      >
        AI Price Guide
      </span>
    </div>
  );
}
