import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App, { Authorizations, PersonalPage, RegistrationCh, RegistrationSt, Timing } from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { Student } from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/students" element={<App />} />
          <Route path="/student/:id" element={<Student />} />
          <Route path="/auto" element={<Authorizations />} />
          <Route path="/regStudent" element={<RegistrationSt />} />
          <Route path="/regChild" element={<RegistrationCh />} />
          <Route path="/personalPage/:login" element={<Timing />} />
        </Routes>
      </QueryClientProvider>
    </React.StrictMode>
  </BrowserRouter>
  
);
