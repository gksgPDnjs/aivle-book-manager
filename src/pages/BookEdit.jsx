import { useState } from "react";
import Button from "../components/common/Button";

function BookEdit({ book, onBack, onSave }) {
  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [content, setContent] = useState(book?.content || "");

  if (!book) {
    return <p>수정할 도서 정보가 없습니다.</p>;
  }

  const handleSave = () => {
    onSave({
      ...book,
      title,
      author,
      content,
    });
  };

  return (
    <div className="book-edit">
      <div className="page-header">
        <h2>도서 수정</h2>
      </div>

      <div className="form-container">
        <div className="form-group">
          <label htmlFor="edit-title">도서 제목</label>
          <input
            id="edit-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-author">저자</label>
          <input
            id="edit-author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-content">도서 내용</label>
          <textarea
            id="edit-content"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>현재 표지 이미지</label>

          <div className="cover-preview">
            {book.coverImageUrl ? (
              <img
                src={book.coverImageUrl}
                alt={book.title}
                className="edit-cover-image"
              />
            ) : (
              <span>📚 등록된 표지 이미지 없음</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <Button onClick={onBack}>
            취소
          </Button>

          <Button onClick={handleSave}>
            수정 완료
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookEdit;