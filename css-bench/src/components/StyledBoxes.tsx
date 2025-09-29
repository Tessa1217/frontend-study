import styled from "styled-components";

type BoxProps = {
  variant: number;
  bordered?: boolean;
  shadowed?: boolean;
};

const Box = styled.div<BoxProps>`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: ${(p) =>
      ["#1e3a8a", "#2563eb", "#16a34a", "#d97706", "#dc2626"][p.variant]}
    ${(p) => (p.bordered ? "outline: 1px solid rgba(0,0,0,.08);" : "")}
    ${(p) => (p.shadowed ? "box-shadow: 0 1px 2px rgba(0,0,0,.12);" : "")};
`;

type StyledBoxesProps = {
  N: number;
  variantSeed: number;
};

export default function StyledBoxes({ N, variantSeed }: StyledBoxesProps) {
  const items = new Array(N).fill(0).map((_, i) => (i + variantSeed) % 5);
  const bordered = variantSeed % 2 === 0;
  const shadowed = variantSeed % 3 === 0;
  return items.map((v, i) => (
    <Box key={i} variant={v} bordered={bordered} shadowed={shadowed} />
  ));
}
