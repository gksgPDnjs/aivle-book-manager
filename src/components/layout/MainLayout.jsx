import Header from "./Header";
import Sidebar from "./Sidebar";

function MainLayout({ children, onNavigate, currentPage }) {
  return (
    <div className="app">
      <Header />

      <div className="layout">
        <Sidebar
          onNavigate={onNavigate}
          currentPage={currentPage}
        />

        <main className="main-content" id="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
