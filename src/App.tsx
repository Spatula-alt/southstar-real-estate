import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Index from "./pages/Index";
import Property from "./pages/Property";
import Popular from "./pages/Popular";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Information from "./pages/Information";
import Agents from "./pages/Agents";
import AgentProfile from "./pages/AgentProfile";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Chatbot from "./components/Chatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/property" element={<Property />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/agents/:id" element={<AgentProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/information" element={<Information />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
