import MainLayout from "./components/layout/MainLayout";
import BookCard from "./components/common/BookCard";
import Button from "./components/common/Button";
import "./App.css";

function App() {
  const books = [
    {
      id: 1,
      title: "test1",
      author: "홍길동",
      coverImageUrl: ""
    },
    {
      id: 2,
      title: "test2",
      author: "김철수",
      coverImageUrl: ""
    },
    {
      id: 3,
      title: "test3",
      author: "이영희",
      coverImageUrl: ""
    }
  ];

  return (
    <MainLayout>
      <div className="page-header">
        <h2>도서 목록</h2>
        <Button onClick={() => alert("도서 등록 페이지 이동 예정")}>
          + 도서 등록
        </Button>
      </div>

      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </MainLayout>
  );
}

export default App;