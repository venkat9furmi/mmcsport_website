import DemoForm from "@/components/DemoForm";

const PROMISES = [
  "Live walkthrough of a matchday in your market",
  "Sample localised assets, made for your club",
  "Honest answer on what we'd charge",
];

export default function DemoSection() {
  return (
    <div id="demo" className="bg-yellow text-black py-[120px]">
      <div className="max-w-[1240px] mx-auto px-8 grid md:grid-cols-2 gap-20 items-start">
        <div>
          <h2 className="display text-[clamp(38px,5.6vw,76px)] max-w-[16ch]">
            Book a demo.
          </h2>
          <p className="max-w-[46ch] mt-[22px] text-[19px] font-medium">
            Thirty minutes with an editor, not a salesperson. Bring us a real
            fixture and a real market — we&apos;ll show you what the desk
            would have published.
          </p>
          <ul className="mt-8 list-none">
            {PROMISES.map((item, i) => (
              <li
                key={item}
                className={`py-3 text-[17px] font-medium before:content-['/'] before:mr-2.5 before:font-semibold ${
                  i < PROMISES.length - 1 ? "border-b border-black/15" : ""
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <DemoForm />
      </div>
    </div>
  );
}
