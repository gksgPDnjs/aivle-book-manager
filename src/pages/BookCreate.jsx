import { useState } from "react";
import Button from "../components/common/Button";

function BookCreate() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="book-create">
      <div className="page-header">
        <h2>도서 등록</h2>
      </div>

      <div className="form-container">
        <div className="form-group">
          <label htmlFor="book-title">도서 제목</label>
          <input
            id="book-title"
            type="text"
            placeholder="도서 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="book-author">저자</label>
          <input
            id="book-author"
            type="text"
            placeholder="저자 이름을 입력하세요"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="book-content">도서 내용</label>
          <textarea
            id="book-content"
            placeholder="도서 내용을 입력하세요"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>AI 표지 이미지</label>
          <div className="cover-preview">
            <span>📚 AI 표지 이미지 미리보기</span>
          </div>
        </div>

        <div className="form-actions">
          <Button
            variant="secondary"
            onClick={() => {
              setTitle("");
              setAuthor("");
              setContent("");
            }}
          >
            초기화
          </Button>

          <Button onClick={() => alert("도서 저장 기능은 추후 연결됩니다.")}>
            도서 등록
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookCreate;
