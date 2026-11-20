import Button from "../components/common/Button";

function BookDetail({ book, onBack, onEdit, onDelete }) {
  if (!book) {
    return <p>도서 정보가 없습니다.</p>;
  }

  return (
    <div className="book-detail">
      <div className="page-header">
        <h2>도서 상세 정보</h2>
        <Button onClick={onBack}>목록으로</Button>
      </div>

      <div className="detail-container">
        <div className="detail-cover">
          {book.coverImageUrl ? (
            <img src={book.coverImageUrl} alt={book.title} />
          ) : (
            <span>📚 표지 이미지 없음</span>
          )}
        </div>

        <div className="detail-info">
          <h2>{book.title}</h2>

          <p>
            <strong>저자:</strong> {book.author}
          </p>

          <div className="detail-description">
            <h3>도서 내용</h3>
            <p>{book.content || "등록된 도서 내용이 없습니다."}</p>
          </div>

          <div className="detail-actions">
            <Button onClick={onEdit}>수정</Button>
            <Button onClick={onDelete}>삭제</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;