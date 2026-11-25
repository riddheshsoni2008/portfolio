// Stand-in for a screenshot: the real system holds a shop's private sales data,
// so this shows the same kind of screen with made-up numbers.
const tiles = [
  { label: "Today's sales", value: "₹12,480" },
  { label: "Stock weight", value: "1,240 g" },
  { label: "Low stock", value: "6 items" },
];

const bills = [
  { id: "INV-0012", mode: "UPI", amount: "₹2,150" },
  { id: "INV-0011", mode: "Cash", amount: "₹6,900" },
  { id: "INV-0010", mode: "Cash", amount: "₹3,430" },
];

export default function JewelTagPreview() {
  return (
    <div className="flex h-full w-full flex-col gap-2.5 bg-[#0b1220] p-4" aria-hidden="true">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-[var(--color-muted)]">Overview</span>
        <span className="rounded-md bg-[var(--color-mint)] px-2 py-0.5 text-[10px] font-semibold text-[#04221d]">+ New bill</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {tiles.map((tile) => (
          <div key={tile.label} className="rounded-lg border border-[var(--color-line)] bg-[var(--color-panel)] p-2">
            <p className="truncate text-[9px] uppercase tracking-wide text-[var(--color-muted)]">{tile.label}</p>
            <p className="mt-0.5 text-[13px] font-semibold text-[var(--color-text)]">{tile.value}</p>
          </div>
        ))}
      </div>
      <div className="flex-1 overflow-hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-panel)]">
        {bills.map((bill) => (
          <div key={bill.id} className="flex items-center justify-between border-b border-[var(--color-line)] px-2.5 py-1.5 last:border-b-0">
            <span className="font-mono text-[10px] text-[var(--color-text)]">{bill.id}</span>
            <span className="rounded bg-[var(--color-panel-2)] px-1.5 py-0.5 text-[9px] text-[var(--color-muted)]">{bill.mode}</span>
            <span className="text-[11px] font-medium text-[var(--color-amber)]">{bill.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
