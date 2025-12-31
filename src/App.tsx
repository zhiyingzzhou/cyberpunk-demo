import { Navigate, Route, Routes } from "react-router-dom";

import { AppLayout } from "./components/layout/AppLayout";
import { ComponentsPage } from "./pages/ComponentsPage";
import { ConsolePage } from "./pages/ConsolePage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { TokensPage } from "./pages/TokensPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="components" element={<ComponentsPage />} />
        <Route path="tokens" element={<TokensPage />} />
        <Route path="console" element={<ConsolePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
