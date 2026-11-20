import Header from "./Header";
import Sidebar from "./Sidebar";

function MainLayout({ children, onNavigate, currentPage }) {
  return (
    <div className="app">
      <Header>
        <Sidebar onNavigate={onNavigate} currentPage={currentPage} />
      </Header>
      <main className="work-area" id="main-content">{children}</main>
    </div>
  );
}
export default MainLayout;
