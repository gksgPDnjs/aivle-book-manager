function Sidebar({ onNavigate, currentPage }) {
  const isCreating = currentPage === "create";
  return (
    <nav className="workspace-nav" aria-label="주 메뉴">
      <button type="button" aria-current={isCreating ? undefined : "location"} onClick={() => onNavigate("list")}>도서 목록</button>
      <button type="button" aria-current={isCreating ? "page" : undefined} onClick={() => onNavigate("create")}>도서 등록</button>
    </nav>
  );
}
export default Sidebar;
