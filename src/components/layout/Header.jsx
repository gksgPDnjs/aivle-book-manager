function Header({ children }) {
  return (
    <header className="workspace-header">
      <div className="workspace-bar">
        <div className="wordmark">
          <span className="library-mark" aria-hidden="true"><i /><i /><i /></span>
          Aivle <strong>Library</strong>
        </div>
        {children}
      </div>
    </header>
  );
}
export default Header;
