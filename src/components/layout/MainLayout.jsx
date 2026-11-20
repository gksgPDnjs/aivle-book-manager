import Header from "./Header";
import Sidebar from "./Sidebar";

function MainLayout({ children }) {
  return (
    <div className="app">
      <Header />

      <div className="layout">
        <Sidebar />

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;