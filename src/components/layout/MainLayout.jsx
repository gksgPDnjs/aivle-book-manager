import Header from "./Header";
import Sidebar from "./Sidebar";

function MainLayout({ children, onNavigate }) {
  return (
    <div className="app">
      <Header />

      <div className="layout">
        <Sidebar onNavigate={onNavigate} />

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;