import { Route, Routes } from "react-router";
import RootLayout from "./components/RootLayout";
import Catalog from "./pages/Catalog/Catalog";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Catalog />} />
        <Route path="/:productId" element={<div>Product Detail</div>} />
      </Route>
    </Routes>
  );
}

export default App;
