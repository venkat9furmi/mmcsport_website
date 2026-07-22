const LANGUAGES = [
  "English",
  "Deutsch",
  "Italiano",
  "Français",
  "Español",
  "Português",
  "العربية",
  "日本語",
  "中文",
  "Bahasa Indonesia",
  "Русский",
  "Nederlands",
  "Türkçe",
  "한국어",
  "粵語",
];

export default function LanguagesMarquee() {
  const doubled = [...LANGUAGES, ...LANGUAGES];

  return (
    <div
      id="languages"
      className="border-t border-b border-line py-9 overflow-hidden bg-panel"
    >
      <div className="marquee-track" aria-hidden="true">
        {doubled.map((lang, i) => (
          <span
            key={`${lang}-${i}`}
            className="display text-[30px] text-dim whitespace-nowrap hover:text-yellow transition-colors"
          >
            {lang}
          </span>
        ))}
      </div>
      <span className="sr-only">
        We publish in {LANGUAGES.length}+ languages: {LANGUAGES.join(", ")}.
      </span>
    </div>
  );
}
