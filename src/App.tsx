import { Route, Routes } from "react-router";
import RootLayout from "./components/RootLayout";
import Catalog from "./pages/Catalog/Catalog";
import Product from "./pages/Product/Product";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Catalog />} />
        <Route path="/:productId" element={<Product />} />
      </Route>
    </Routes>
  );
}

export default App;
