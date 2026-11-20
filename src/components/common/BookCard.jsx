import BookCover from "./BookCover";

function BookCard({ book, onClick }) {
  return (
    <aside className="book-preview" aria-label="선택한 도서 미리보기">
      <div className="preview-art"><BookCover book={book} /></div>
      <div className="preview-copy">
        <h3>{book.title}</h3>
        <p className="preview-author">{book.author}</p>
        {book.content && <p className="preview-excerpt">{book.content}</p>}
        <button type="button" className="detail-link" onClick={onClick}>상세 정보 보기 <span aria-hidden="true">↗</span></button>
      </div>
    </aside>
  );
}
export default BookCard;
