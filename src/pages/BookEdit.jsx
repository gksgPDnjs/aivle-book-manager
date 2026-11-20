
import { useState } from "react";
import Button from "../components/common/Button";

function BookEdit({ book, onBack, onSave }) {
  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [content, setContent] = useState(book?.content || "");
  const [saving, setSaving] = useState(false);

  if (!book) {
    return <p>수정할 도서 정보가 없습니다.</p>;
  }

  const handleSave = async () => {
    if (!title.trim() || !author.trim() || !content.trim()) {
      alert("제목, 저자, 내용을 모두 입력해 주세요.");
      return;
    }

    setSaving(true);
    try {
      await onSave({
        ...book,
        title: title.trim(),
        author: author.trim(),
        content: content.trim(),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="book-edit">
      <div className="page-header">
        <h2>도서 수정</h2>
      </div>

      <div className="book-create-container">

        {/* 왼쪽: 현재 표지 이미지 */}
        <section className="book-create-cover">
          <h3 className="section-title">현재 표지 이미지</h3>
          <p className="section-description">
            현재 도서에 등록된 표지 이미지입니다.
          </p>

          <div className="cover-preview">
            {book.coverImageUrl ? (
              <img
                src={book.coverImageUrl}
                alt={`${book.title} 표지`}
                className="edit-cover-image"
              />
            ) : (
              <div className="cover-placeholder">
                <span className="cover-placeholder-icon">
                  📚
                </span>
                <p>등록된 표지 이미지가 없습니다.</p>
                <span>
                  AI 표지 생성 기능을 통해 표지를 추가할 수 있습니다.
                </span>
              </div>
            )}
          </div>
        </section>

        {/* 오른쪽: 도서 정보 수정 */}
        <section className="book-create-info">
          <h3 className="section-title">도서 정보</h3>
          <p className="section-description">
            수정할 도서 정보를 입력해 주세요.
          </p>

          <div className="form-group">
            <label htmlFor="edit-title">도서 제목</label>
            <input
              id="edit-title"
              type="text"
              placeholder="도서 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-author">저자</label>
            <input
              id="edit-author"
              type="text"
              placeholder="저자 이름을 입력하세요"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-content">도서 내용</label>
            <textarea
              id="edit-content"
              rows={8}
              placeholder="도서 내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>

        {/* 하단 버튼 */}
        <div className="book-create-actions">
          <Button variant="secondary" onClick={onBack}>
            취소
          </Button>

          <Button onClick={handleSave} disabled={saving}>
            {saving ? "저장 중..." : "수정 완료"}
          </Button>
        </div>

      </div>
    </div>
  );
}

export default BookEdit;
