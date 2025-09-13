function MoreButton({
  addMorePage,
  loading,
}: {
  addMorePage: () => void;
  loading: boolean;
}) {
  return (
    <div className="pagination">
      <button className="more-btn" onClick={addMorePage} disabled={loading}>
        {loading && <span className="loader" />}뉴스 더보기
      </button>
    </div>
  );
}

export default MoreButton;
