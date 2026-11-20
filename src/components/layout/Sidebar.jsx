function Sidebar({ onNavigate }) {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li onClick={() => onNavigate("list")}>
            📚 도서 목록
          </li>

          <li onClick={() => onNavigate("create")}>
            ➕ 도서 등록
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;