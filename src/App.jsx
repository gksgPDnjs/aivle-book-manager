
import { useState, useEffect } from "react";
import MainLayout from "./components/layout/MainLayout";
import BookCreate from "./pages/BookCreate";
import BookDetail from "./pages/BookDetail";
import BookEdit from "./pages/BookEdit";
import BookCatalog from "./pages/BookCatalog";
import "./App.css";
import "./book-pages.css";

const API_URL = "http://localhost:3000/books";

function App() {
  const [page, setPage] = useState("list");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [listStatus, setListStatus] = useState("loading");
  const [listRequest, setListRequest] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const fetchBooks = async () => {
      try {
        const response = await fetch(API_URL, { signal: controller.signal });

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

  const handleBookClick = async (book) => {
    try {
      const response = await fetch(`${API_URL}/${book.id}`);
      if (!response.ok) throw new Error("도서 상세 조회 실패");
      const data = await response.json();
      setSelectedBook(data);
      setPage("detail");
    } catch (error) {
      console.error(error);
      alert("도서 상세 정보를 불러오지 못했습니다.");
    }
  };

  const handleEdit = () => {
    setPage("edit");
  };

  const handleCreate = async (newBook) => {
    try {
      const now = new Date().toISOString();
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newBook,
          createdAt: now,
          updatedAt: now,
        }),
      });
      if (!response.ok) throw new Error("도서 등록 실패");
      const savedBook = await response.json();
      setBooks((prevBooks) => [...prevBooks, savedBook]);
      setPage("list");
      alert("도서가 등록되었습니다.");
    } catch (error) {
      console.error(error);
      alert("도서 등록에 실패했습니다.");
      throw error;
    }
  };

  const handleSave = async (updatedBook) => {
    try {
      const response = await fetch(`${API_URL}/${updatedBook.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: updatedBook.title,
          author: updatedBook.author,
          content: updatedBook.content,
          coverImageUrl: updatedBook.coverImageUrl,
          updatedAt: new Date().toISOString(),
        }),
      });
      if (!response.ok) throw new Error("도서 수정 실패");
      const savedBook = await response.json();
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === savedBook.id ? savedBook : book
        )
      );
      setSelectedBook(savedBook);
      setPage("detail");
      alert("도서가 수정되었습니다.");
    } catch (error) {
      console.error(error);
      alert("도서 수정에 실패했습니다.");
      throw error;
    }
  };

  const handleDelete = async () => {
    if (!selectedBook) return;
    if (!window.confirm("이 도서를 삭제하시겠습니까?")) return;
    try {
      const response = await fetch(`${API_URL}/${selectedBook.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("도서 삭제 실패");
      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== selectedBook.id)
      );
      setSelectedBook(null);
      setPage("list");
      alert("도서가 삭제되었습니다.");
    } catch (error) {
      console.error(error);
      alert("도서 삭제에 실패했습니다.");
    }
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
        <BookCreate onCreate={handleCreate} />
      )}

      {page === "detail" && (
        <BookDetail
          book={selectedBook}
          onBack={() => setPage("list")}
          onEdit={handleEdit}
          onDelete={handleDelete}
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
