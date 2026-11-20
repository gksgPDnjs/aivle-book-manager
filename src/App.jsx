
import { useState, useEffect } from "react";
import MainLayout from "./components/layout/MainLayout";
import BookCreate from "./pages/BookCreate";
import BookDetail from "./pages/BookDetail";
import BookEdit from "./pages/BookEdit";
import BookCatalog from "./pages/BookCatalog";
import "./App.css";
import "./book-pages.css";

function App() {
  const [page, setPage] = useState("list");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [listStatus, setListStatus] = useState("loading");
  const [listRequest, setListRequest] = useState(0);

  // DB에서 도서 목록 불러오기
  useEffect(() => {
    const controller = new AbortController();
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3000/books", { signal: controller.signal });

        if (!response.ok) {
          throw new Error("도서 목록을 불러오지 못했습니다.");
        }

        const data = await response.json();
        setBooks(data);
        setListStatus("ready");
      } catch (error) {
        if (controller.signal.aborted) return;
        setListStatus("error");
        console.error("도서 목록 조회 오류:", error);
      }
    };

    fetchBooks();
    return () => controller.abort();
  }, [listRequest]);

  // 도서 카드 클릭
  const handleBookClick = (book) => {
    setSelectedBook(book);
    setPage("detail");
  };

  // 수정 페이지 이동
  const handleEdit = () => {
    setPage("edit");
  };

  // 수정 완료
  const handleSave = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === updatedBook.id ? updatedBook : book
      )
    );

    setSelectedBook(updatedBook);
    setPage("detail");
  };

  return (
    <MainLayout
      onNavigate={setPage}
      currentPage={page}
    >
      <div hidden={page !== "list"}>
        <BookCatalog books={books} status={listStatus} onOpen={handleBookClick}
          onCreate={() => setPage("create")}
          onRetry={() => {
            setListStatus("loading");
            setListRequest(request => request + 1);
          }}
        />
      </div>

      {page === "create" && (
        <BookCreate />
      )}

      {page === "detail" && (
        <BookDetail
          book={selectedBook}
          onBack={() => setPage("list")}
          onEdit={handleEdit}
          onDelete={() =>
            alert("삭제 기능은 추후 연결됩니다.")
          }
        />
      )}

      {page === "edit" && (
        <BookEdit
          book={selectedBook}
          onBack={() => setPage("detail")}
          onSave={handleSave}
        />
      )}
    </MainLayout>
  );
}

export default App;
