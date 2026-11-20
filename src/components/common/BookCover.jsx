import { useState } from "react";

function BookCover({ book, miniature = false }) {
  const [failedImage, setFailedImage] = useState(null);
  const showImage = book.coverImageUrl && book.coverImageUrl !== failedImage;
  return (
    <div className={miniature ? "jacket miniature" : "jacket"} aria-hidden={miniature || undefined}>
      {showImage ? (
        <img src={book.coverImageUrl} alt={miniature ? "" : book.title + " 표지"}
          onError={() => setFailedImage(book.coverImageUrl)} />
      ) : (
        <div className="type-cover" role={miniature ? undefined : "img"} aria-label={miniature ? undefined : book.title + " 기본 표지"}>
          <span className="jacket-title">{book.title}</span>
          <span className="jacket-author">{book.author}</span>
        </div>
      )}
    </div>
  );
}
export default BookCover;
