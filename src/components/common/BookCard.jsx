function BookCard({ book }) {
  return (
    <div className="book-card">
      <div className="book-cover">
        {book.coverImageUrl ? (
          <img src={book.coverImageUrl} alt={book.title} />
        ) : (
          <span>📚 표지 없음</span>
        )}
      </div>

      <div className="book-info">
        <h3>{book.title}</h3>
        <p>저자: {book.author}</p>
      </div>
    </div>
  );
}

export default BookCard;