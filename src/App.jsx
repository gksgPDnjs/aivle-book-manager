import { useState } from "react";
import MainLayout from "./components/layout/MainLayout";
import BookCreate from "./pages/BookCreate";
import BookDetail from "./pages/BookDetail";
import BookEdit from "./pages/BookEdit";
import BookCard from "./components/common/BookCard";
import Button from "./components/common/Button";
import "./App.css";

const initialBooks = [
  {
    id: 1,
    title: "test1",
    author: "홍길동",
    content: "test, test, test",
    coverImageUrl: "",
  },
  {
    id: 2,
    title: "test2",
    author: "김철수",
    content: "test, test, test",
    coverImageUrl: "",
  },
  {
    id: 3,
    title: "test3",
    author: "이영희",
    content: "test, test, test",
    coverImageUrl: "",
  },
];

function App() {
  const [page, setPage] = useState("list");
  const [books, setBooks] = useState(initialBooks);
  const [selectedBook, setSelectedBook] = useState(null);

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
    <MainLayout onNavigate={setPage}>

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
          onDelete={() => alert("삭제 기능은 추후 연결됩니다.")}
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