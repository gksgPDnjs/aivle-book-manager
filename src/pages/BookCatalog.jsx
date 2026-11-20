import { useState } from "react";
import BookCard from "../components/common/BookCard";
import BookCover from "../components/common/BookCover";

const dateFormat = new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" });

function BookCatalog({ books, status, onRetry, onOpen, onCreate }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("전체");
  const [sort, setSort] = useState("latest");
  const [previewId, setPreviewId] = useState(null);
  const withCoverCount = books.filter(book => book.coverImageUrl).length;
  const coverFilters = [
    { label: "전체", count: books.length },
    { label: "표지 있음", count: withCoverCount },
    { label: "표지 없음", count: books.length - withCoverCount },
  ];
  const term = query.trim().toLocaleLowerCase();
  const visible = books.filter(book => {
    const matchesCover = filter === "전체" || (filter === "표지 있음") === Boolean(book.coverImageUrl);
    return matchesCover && [book.title, book.author].some(value => String(value ?? "").toLocaleLowerCase().includes(term));
  }).sort((a, b) => {
    if (sort === "title") return (a.title ?? "").localeCompare(b.title ?? "", "ko");
    return (Date.parse(b.createdAt) || 0) - (Date.parse(a.createdAt) || 0);
  });
  const selected = visible.find(book => book.id === previewId) ?? visible[0];
  return (
    <>
      <div className="page-header catalog-heading">
        <h1>도서 목록</h1>
        <button type="button" className="btn btn-primary" onClick={onCreate}><span aria-hidden="true">＋</span>도서 등록</button>
      </div>
      <div className="catalog-layout">
        <section className="catalog-panel" aria-label="도서 검색 및 목록">
          <div className="catalog-filters" aria-label="표지 필터" role="group">
            {coverFilters.map(({ label, count }) => (
              <button type="button" key={label} aria-pressed={filter === label} onClick={() => setFilter(label)}>
                {label}{status === "ready" && <span>{count}</span>}
              </button>
            ))}
          </div>
          <div className="catalog-tools">
            <label className="search-field">
              <i aria-hidden="true" />
              <input type="search" value={query} onChange={e => setQuery(e.target.value)} aria-label="제목 또는 저자 검색" placeholder="제목 또는 저자 검색" />
            </label>
            <select aria-label="도서 정렬" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="latest">최근 등록순</option><option value="title">제목순</option>
            </select>
          </div>
          {status === "ready" && visible.length > 0 ? (
            <table className="catalog-table">
              <thead><tr><th scope="col">도서명</th><th scope="col">저자</th><th scope="col">등록일</th></tr></thead>
              <tbody>{visible.map(book => {
                const created = Date.parse(book.createdAt);
                return (
                  <tr key={book.id} className={book.id === selected?.id ? "is-selected" : undefined}>
                    <td><button className="row-book" type="button" onClick={() => setPreviewId(book.id)}
                      aria-label={book.title + " 미리보기"} aria-pressed={book.id === selected?.id}>
                      <BookCover book={book} miniature /><strong>{book.title}</strong>
                    </button></td>
                    <td>{book.author || "—"}</td><td>{Number.isFinite(created) ? dateFormat.format(created) : "—"}</td>
                  </tr>
                );
              })}</tbody>
            </table>
          ) : (
            <div className="catalog-feedback" role="status">
              {status === "error" ? <><p>도서 목록을 불러오지 못했어요.</p><button type="button" className="detail-link" onClick={onRetry}>다시 시도</button></> :
                status === "loading" ? <p>도서를 불러오는 중…</p> :
                <p>{books.length ? "조건에 맞는 도서가 없어요." : "첫 번째 도서를 등록해 주세요."}</p>}
            </div>
          )}
          {status === "ready" && <p className="catalog-total" aria-live="polite">전체 {books.length}권 중 {visible.length}권 표시</p>}
        </section>
        {selected && status === "ready" && <BookCard book={selected} onClick={() => onOpen(selected)} />}
      </div>
    </>
  );
}
export default BookCatalog;
