
import { useState } from "react";
import "./AICoverGenerator.css";

function AICoverGenerator({ book, onCoverSaved }) {

  // ===== 1. State 정의 =====
  const [userApiKey, setUserApiKey] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // ===== 2. OpenAI 이미지 생성 함수 =====
  const handleGenerateCover = async () => {

    // API Key 확인
    if (!userApiKey.trim()) {
      alert("API Key를 입력해주세요.");
      return;
    }

    // 도서 정보 확인
    if (!book || !book.title || !book.content) {
      alert("도서 제목과 내용이 필요합니다.");
      return;
    }

    // 생성 시작
    setLoading(true);
    setError("");
    setMessage("");
    setImages([]);
    setSelectedImage("");

    try {
      // 도서 정보로 프롬프트 작성
      const prompt = `
        Create a beautiful book cover illustration.

        Title: ${book.title}
        Author: ${book.author}
        Content: ${book.content}

        Reflect the emotion, atmosphere, and
        main theme of this story.
        Professional book cover design.
      `;

      // OpenAI 이미지 생성 요청
      const res = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userApiKey}`
          },
          body: JSON.stringify({
            model: "gpt-image-2",
            prompt: prompt,
            n: 3,
            size: "1024x1536",
            quality: "low",
            output_format: "png"
          })
        }
      );

      // 응답 상태 확인
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("API Key를 확인해주세요.");
        }

        if (res.status === 429) {
          throw new Error(
            "요청 제한 또는 사용량 문제가 발생했습니다."
          );
        }

        throw new Error("이미지 생성 요청에 실패했습니다.");
      }

      // 응답 JSON 변환
      const data = await res.json();

      // 이미지 데이터 확인
      if (!data.data || data.data.length !== 3) {
        throw new Error("이미지 3장을 받지 못했습니다.");
      }

      // Base64 데이터를 Data URL로 변환
      const generatedImages = data.data.map((item) => {
        if (!item.b64_json) {
          throw new Error("이미지 데이터가 없습니다.");
        }

        return `data:image/png;base64,${item.b64_json}`;
      });

      // 이미지 3장 저장
      setImages(generatedImages);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ===== 3. 선택한 이미지 DB 저장 =====
  const handleSaveCover = async () => {

    if (!selectedImage) {
      alert("표지를 선택해주세요.");
      return;
    }

    if (!book || book.id == null) {
      alert("저장할 도서 정보가 없습니다.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      // json-server PATCH 요청
      const res = await fetch(
        `http://localhost:3000/books/${book.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            coverImageUrl: selectedImage
          })
        }
      );

      if (!res.ok) {
        throw new Error("표지 저장에 실패했습니다.");
      }

      const updatedBook = await res.json();

      // 부모 컴포넌트에 수정된 도서 전달
      if (onCoverSaved) {
        onCoverSaved(updatedBook);
      }

      setMessage("선택한 표지가 저장되었습니다.");

    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // ===== 4. 화면 구성 =====
  return (
    <div className="ai-cover-generator">

      <h2>AI 도서표지 생성</h2>

      <p>
        도서의 내용을 바탕으로
        AI가 어울리는 표지를 생성합니다.
      </p>

      {/* API Key 입력 */}
      <div className="ai-cover-input">
        <input
          type="password"
          placeholder="OpenAI API Key 입력"
          value={userApiKey}
          onChange={(e) => setUserApiKey(e.target.value)}
        />
      </div>

      {/* 이미지 생성 버튼 */}
      <button
        type="button"
        onClick={handleGenerateCover}
        disabled={loading || saving}
      >
        {loading ? "이미지 생성 중..." : "AI 표지 3장 생성"}
      </button>

      <p className="ai-cover-notice">
        이미지 생성 시 API 사용 비용이 발생할 수 있습니다.
      </p>

      {/* 오류 표시 */}
      {error && <p className="ai-cover-error">{error}</p>}

      {/* 생성된 이미지 목록 */}
      <div className="ai-cover-list">
        {images.map((image, index) => (
          <div
            className="ai-cover-item"
            key={index}
          >
            <img
              src={image}
              alt={`AI 표지 ${index + 1}`}
            />

            <button
              type="button"
              onClick={() => setSelectedImage(image)}
              disabled={saving}
            >
              {selectedImage === image
                ? "선택됨"
                : `표지 ${index + 1} 선택`}
            </button>
          </div>
        ))}
      </div>

      {/* 선택한 이미지 저장 */}
      {selectedImage && (
        <button
          type="button"
          onClick={handleSaveCover}
          disabled={saving || loading}
        >
          {saving ? "저장 중..." : "선택한 표지 저장"}
        </button>
      )}

      {/* 저장 결과 */}
      {message && (
        <p className="ai-cover-success">{message}</p>
      )}

    </div>
  );
}

export default AICoverGenerator;
