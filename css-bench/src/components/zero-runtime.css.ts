import { style } from "@vanilla-extract/css";

export const box = style({
  width: "24px",
  height: "24px",
  borderRadius: "4px",
});

export const variants = [
  style({ background: "#1e3a8a" }),
  style({ background: "#2563eb" }),
  style({ background: "#16a34a" }),
  style({ background: "#d97706" }),
  style({ background: "#dc2626" }),
];

export const bordered = style({
  outline: "1px solid rgba(0,0,0,.08)",
});

export const shadowed = style({
  boxShadow: "0 1px 2px rgba(0,0,0,.12)",
});
