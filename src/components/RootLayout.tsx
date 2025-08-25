import { Link, Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="h-16 bg-white border-b shadow-sm">
        <div className="mx-auto max-w-7xl h-full flex items-center justify-between px-4">
          <Link to="/" className="text-xl font-semibold text-slate-700">
            Products
          </Link>
        </div>
      </header>
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
