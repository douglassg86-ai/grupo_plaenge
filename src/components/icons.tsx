import type { SVGProps } from "react";

export function PlaengeVanguardLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 40"
      width="120"
      height="24"
      aria-label="Plaenge Vanguard Logo"
      {...props}
    >
      <style>{`.cls-1{font-family:'Playfair Display', serif;font-weight:700;font-size:24px;}.cls-2{fill:#008080;}.cls-3{font-family:'PT Sans', sans-serif;font-size:10px;letter-spacing:.3em;}`}</style>
      <text className="cls-1" transform="translate(0 25)">
        <tspan x="0" y="0">
          PLAENGE
        </tspan>
      </text>
      <text className="cls-1" transform="translate(130 25)">
        <tspan className="cls-2" x="0" y="0">
          V
        </tspan>
        <tspan x="17.5" y="0">
          GD
        </tspan>
      </text>
      <text className="cls-3" transform="translate(130 35)">
        <tspan x="0" y="0">
          VANGUARD
        </tspan>
      </text>
    </svg>
  );
}
