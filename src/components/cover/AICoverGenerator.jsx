
import { useState } from "react";
import "./AICoverGenerator.css";

function AICoverGenerator({ book, onSelect, actionLabel = "도서 등록" }) {

  // ===== 1. State 정의 =====
  const [userApiKey, setUserApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-image-2");
  const [selectedQuality, setSelectedQuality] = useState("low");

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // ===== 2. OpenAI 표지 생성 함수 =====
  const handleGenerateCover = async () => {

    // API Key 입력 확인
    if (!userApiKey.trim()) {
      alert("API Key를 입력해주세요.");
      return;
    }

    // 도서 제목 및 내용 확인
    if (!book || !book.title || !book.title.trim() ||
        !book.content || !book.content.trim()) {
      alert("도서 제목과 내용을 먼저 입력해주세요.");
      return;
    }

    // 생성 상태 초기화
    setLoading(true);
    setError("");
    setMessage("");
    setImages([]);
    setSelectedImage("");

    // 기존 선택 정보 초기화
    if (onSelect) {
      onSelect("");
    }

    try {

      // 도서 정보를 활용한 프롬프트
      const prompt = `
        Create a professional book cover design.

        Book title: ${book.title}
        Author: ${book.author || ""}
        Book content: ${book.content}

        Reflect the emotions, atmosphere,
        and main theme of the story.

        Create an artistic, visually appealing
        portrait-oriented book cover.
      `;

      // OpenAI 이미지 생성 API 요청
      const res = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userApiKey}`
          },
          body: JSON.stringify({
            model: selectedModel,
            prompt: prompt,
            n: 3,
            size: "1024x1536",
            quality: selectedQuality,
            output_format: "png"
          })
        }
      );

      // API 오류 확인
      if (!res.ok) {

        if (res.status === 401) {
          throw new Error("API Key를 확인해주세요.");
        }

        if (res.status === 429) {
          throw new Error(
            "API 요청 제한 또는 사용량 문제가 발생했습니다."
          );
        }

        throw new Error(
          `이미지 생성 요청 실패 (${res.status})`
        );
      }

      // 응답 JSON 변환
      const data = await res.json();

      // 이미지 응답 개수 확인
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

      // 생성된 이미지 3장 저장
      setImages(generatedImages);
      setMessage("표지 이미지 3장이 생성되었습니다.");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ===== 3. 표지 이미지 선택 함수 =====
  const handleSelectCover = (image) => {

    // 선택한 이미지 State에 저장
    setSelectedImage(image);

    // 부모 컴포넌트에 전달
    if (onSelect) {
      onSelect(image);
    }

    setMessage("최종 표지가 선택되었습니다.");
  };

  // ===== 4. 화면 구성 =====
  return (
    <div className="ai-cover-generator">

      {/* API Key 입력 */}
      <div className="ai-cover-input">
        <label htmlFor="ai-api-key">
          OpenAI API Key
        </label>

        <input
          id="ai-api-key"
          type="password"
          placeholder="API Key를 입력해주세요"
          value={userApiKey}
          onChange={(e) => setUserApiKey(e.target.value)}
        />
      </div>

      {/* 이미지 생성 옵션 */}
      <div className="ai-cover-options">

        <div className="ai-cover-option">
          <label htmlFor="ai-model">이미지 모델</label>

          <select
            id="ai-model"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option value="gpt-image-2">
              GPT Image 2
            </option>

            <option value="gpt-image-1">
              GPT Image 1
            </option>
          </select>
        </div>

        <div className="ai-cover-option">
          <label htmlFor="ai-quality">이미지 품질</label>

          <select
            id="ai-quality"
            value={selectedQuality}
            onChange={(e) => setSelectedQuality(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

      </div>

      {/* AI 이미지 생성 버튼 */}
      <button
        type="button"
        className="ai-cover-generate-btn"
        onClick={handleGenerateCover}
        disabled={loading}
      >
        {loading ? "이미지 생성 중..." : "AI 표지 3장 생성"}
      </button>

      <p className="ai-cover-notice">
        이미지 생성 시 API 사용 비용이 발생할 수 있습니다.
      </p>

      {/* 에러 메시지 */}
      {error && (
        <p className="ai-cover-error">{error}</p>
      )}

      {/* 생성된 이미지 미리보기 */}
      <div className="ai-cover-list">

        {[0, 1, 2].map((index) => {

          const image = images[index];

          return (
            <div
              className="ai-cover-item"
              key={index}
            >

              {/* 표지 미리보기 */}
              <div
                className={
                  selectedImage && selectedImage === image
                    ? "ai-cover-image ai-cover-selected"
                    : "ai-cover-image"
                }
              >
                {image ? (
                  <img
                    src={image}
                    alt={`AI 표지 ${index + 1}`}
                  />
                ) : (
                  <span>표지 {index + 1}</span>
                )}
              </div>

              {/* 각 이미지 선택 버튼 */}
              <button
                type="button"
                className="ai-cover-select-btn"
                disabled={!image || loading}
                onClick={() => handleSelectCover(image)}
              >
                {image && selectedImage === image
                  ? "선택됨"
                  : "선택"}
              </button>

            </div>
          );
        })}

      </div>

      {/* 결과 메시지 */}
      {message && (
        <p className="ai-cover-success">{message}</p>
      )}

      {/* 최종 선택 이미지 미리보기 */}
      {selectedImage && (
        <div className="ai-cover-final">

          <h4>최종 선택한 표지</h4>

          <img
            src={selectedImage}
            alt="최종 선택된 도서표지"
          />

          <p>{actionLabel} 시 해당 이미지가 적용됩니다.</p>

        </div>
      )}

    </div>
  );
}

export default AICoverGenerator;
