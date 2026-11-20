
import { useState } from "react";
import Button from "../components/common/Button";

function BookCreate() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  // 입력값 초기화
  const handleReset = () => {
    setTitle("");
    setAuthor("");
    setContent("");
  };

  return (
    <div className="book-create">
      <div className="page-header">
        <h2>도서 등록</h2>
      </div>

      <div className="book-create-container">

        {/* 왼쪽: AI 표지 미리보기 */}
        <section className="book-create-cover">
          <h3 className="section-title">AI 표지 이미지</h3>
          <p className="section-description">
            AI가 생성한 도서 표지가 표시되는 영역입니다.
          </p>

          <div className="cover-preview">
            <div className="cover-placeholder">
              <span className="cover-placeholder-icon">📚</span>
              <p>아직 생성된 표지가 없습니다.</p>
              <span>
                도서 정보를 입력한 후 AI 표지를 생성할 수 있습니다.
              </span>
            </div>
          </div>
        </section>

        {/* 오른쪽: 도서 정보 입력 */}
        <section className="book-create-info">
          <h3 className="section-title">도서 정보</h3>
          <p className="section-description">
            등록할 도서의 기본 정보를 입력해 주세요.
          </p>

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
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>

        {/* 하단 버튼 */}
        <div className="book-create-actions">
          <Button variant="secondary" onClick={handleReset}>
            초기화
          </Button>

          <Button
            onClick={() =>
              alert("도서 저장 기능은 추후 연결됩니다.")
            }
          >
            도서 등록
          </Button>
        </div>

      </div>
    </div>
  );
}

export default BookCreate;
