
import { useState, useEffect } from "react";
import MainLayout from "./components/layout/MainLayout";
import BookCreate from "./pages/BookCreate";
import BookDetail from "./pages/BookDetail";
import BookEdit from "./pages/BookEdit";
import BookCard from "./components/common/BookCard";
import Button from "./components/common/Button";
import "./App.css";

function App() {
  const [page, setPage] = useState("list");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  // DB에서 도서 목록 불러오기
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3000/books");

        if (!response.ok) {
          throw new Error("도서 목록을 불러오지 못했습니다.");
        }

        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("도서 목록 조회 오류:", error);
      }
    };

    fetchBooks();
  }, []);

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
      {page === "list" && (
        <>
          <div className="page-header">
            <h2>도서 목록</h2>

            <Button onClick={() => setPage("create")}>
              + 도서 등록
            </Button>
          </div>

          <div className="book-grid">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => handleBookClick(book)}
              />
            ))}
          </div>
        </>
      )}

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
