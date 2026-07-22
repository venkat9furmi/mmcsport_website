import { getWork } from "@/lib/content";

export default function Work() {
  const cases = getWork();

  return (
    <section id="work" className="py-[120px]">
      <div className="max-w-[1240px] mx-auto px-8">
        <span className="reveal inline-block bg-yellow text-black font-semibold text-xs tracking-[0.14em] uppercase px-2.5 py-1.5 mb-5">
          Why it works
        </span>
        <h2 className="reveal display text-[clamp(38px,5.6vw,76px)]">
          Proof, not logos.
        </h2>
        <p className="reveal max-w-[56ch] text-muted mt-6 text-[19px]">
          Every client wall looks the same. What separates agencies is what
          happened after the contract was signed.
        </p>

        <div className="grid md:grid-cols-2 gap-px bg-line mt-16 border border-line">
          {cases.map((item) => (
            <article key={item.slug} className="reveal bg-ink px-9 pt-11 pb-[50px]">
              <span className="mono text-[12px] text-yellow">
                {item.client}
              </span>
              <h3 className="display text-[34px] mt-4 mb-[18px] max-w-[16ch]">
                {item.title}
              </h3>
              <p className="text-smoke text-base">{item.summary}</p>
              <div className="flex gap-9 mt-7 pt-6 border-t border-line">
                {item.results.map((result) => (
                  <div key={result.label}>
                    <b className="display block text-[38px] text-paper leading-none">
                      {result.value}
                    </b>
                    <span className="mono text-[11px] text-smoke">
                      {result.label}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
