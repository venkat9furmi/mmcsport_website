import type { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <div className="pt-[70px] pb-16 border-b border-line">
      <div className="max-w-[1240px] mx-auto px-8">
        <span className="inline-block bg-yellow text-black font-semibold text-xs tracking-[0.14em] uppercase px-2.5 py-1.5 mb-5">
          {eyebrow}
        </span>
        <h1 className="display text-[clamp(38px,5.6vw,76px)]">{title}</h1>
        {lede && <p className="max-w-[56ch] text-muted mt-6 text-[19px]">{lede}</p>}
      </div>
    </div>
  );
}
