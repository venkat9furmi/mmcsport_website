const STATS = [
  { value: "120+", label: "live commentaries every week" },
  { value: "20+", label: "languages, 365 days a year" },
  { value: "80+", label: "social channels managed" },
  { value: "30+", label: "club and league websites run" },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line">
      {STATS.map((stat) => (
        <div key={stat.label} className="bg-ink px-7 py-14">
          <b className="display block text-[clamp(44px,5vw,72px)] text-yellow leading-none">
            {stat.value}
          </b>
          <span className="block mt-3 text-sm text-smoke tracking-wide">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
