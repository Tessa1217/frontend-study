import * as styles from "./zero-runtime.css";

type BoxProps = {
  variant: number;
  bordered: boolean;
  shadowed: boolean;
};

function Box({ variant = 0, bordered = false, shadowed = false }: BoxProps) {
  const boxStyles = [
    styles.box,
    styles.variants[variant],
    bordered ? styles.bordered : "",
    shadowed ? styles.shadowed : "",
  ].join(" ");
  return <div className={boxStyles}></div>;
}

type ZeroRuntimeBoxesProps = {
  N: number;
  variantSeed: number;
};

export default function ZeroRuntimeBoxes({
  N,
  variantSeed,
}: ZeroRuntimeBoxesProps) {
  const items = new Array(N).fill(0).map((_, i) => (i + variantSeed) % 5);
  const bordered = variantSeed % 2 === 0;
  const shadowed = variantSeed % 3 === 0;
  return items.map((v, i) => (
    <Box key={i} variant={v} bordered={bordered} shadowed={shadowed} />
  ));
}
