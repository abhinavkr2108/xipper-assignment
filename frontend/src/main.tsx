import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import AboutPage from "./pages/about/page.tsx";
import BrowseListingsPage from "./pages/browse/page.tsx";
import LoginPage from "./pages/login/page.tsx";
import SignUpPage from "./pages/signup/page.tsx";
import BookHotelPage from "./pages/book-hotel/page.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import CheckInPage from "./pages/check-in/page.tsx";
import WebCheckInPage from "./pages/web-check-in/page.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/browse" element={<BrowseListingsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/book/:id" element={<BookHotelPage />} />
      <Route path="/check-in/:bookingId" element={<CheckInPage />} />
      <Route path="/web-check-in/:bookingId" element={<WebCheckInPage />} />
    </Routes>
    <Toaster
      position="top-center"
      richColors
      theme="light"
      toastOptions={{ duration: 3000 }}
    />
  </BrowserRouter>
);
