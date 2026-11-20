function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="brand-icon" aria-hidden="true">
          📚
        </div>

        <div className="brand-text">
          <h1>AI 도서관리시스템</h1>
          <span>AI Book Manager</span>
        </div>
      </div>

      <div className="header-status">
        <span className="status-dot"></span>
        도서 관리 서비스
      </div>
    </header>
  );
}

export default Header;
