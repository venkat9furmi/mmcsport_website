import type { CSSProperties } from "react";

function len(value: number): CSSProperties {
  return { "--len": value } as CSSProperties;
}

export default function TacticsBoard() {
  return (
    <div className="chalk-wrap absolute -top-10 -right-16 w-[560px] opacity-90 pointer-events-none max-md:w-[320px] max-md:opacity-35 max-md:-top-5 max-md:-right-20">
      <svg className="chalk" viewBox="0 0 400 320" aria-hidden="true">
        <circle className="chalk-circle-a" cx="90" cy="230" r="34" style={len(214)} />
        <path
          className="chalk-line-1"
          d="M120 235 C 160 210, 170 190, 190 175"
          style={len(90)}
        />
        <path
          className="chalk-arrowhead-1"
          d="M176 186 L190 175 L181 162"
          style={len(34)}
        />
        <path
          className="chalk-cross"
          d="M188 158 L212 182 M212 158 L188 182"
          style={len(68)}
        />
        <path
          className="chalk-line-2"
          d="M215 165 C 250 140, 270 115, 285 100"
          style={len(90)}
        />
        <path
          className="chalk-arrowhead-2"
          d="M270 110 L285 100 L292 116"
          style={len(34)}
        />
        <circle className="chalk-circle-b" cx="300" cy="90" r="34" style={len(214)} />
      </svg>
    </div>
  );
}
