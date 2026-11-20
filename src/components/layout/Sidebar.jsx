
function Sidebar({ onNavigate, currentPage }) {
  const menuItems = [
    {
      id: "list",
      label: "도서 목록",
      icon: "📚",
    },
    {
      id: "create",
      label: "도서 등록",
      icon: "➕",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-title">MENU</div>

      <nav aria-label="도서 관리 메뉴">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`sidebar-link ${
                  currentPage === item.id ? "active" : ""
                }`}
                onClick={() => onNavigate(item.id)}
                aria-current={
                  currentPage === item.id ? "page" : undefined
                }
              >
                <span className="sidebar-icon" aria-hidden="true">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        AI Book Manager
      </div>
    </aside>
  );
}

export default Sidebar;
