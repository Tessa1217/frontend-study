import SkeletonCard from "@/components/SkeletonCard";

function SkeletonList({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={`skeleton_card_${i}`} />
      ))}
    </>
  );
}

export default SkeletonList;
