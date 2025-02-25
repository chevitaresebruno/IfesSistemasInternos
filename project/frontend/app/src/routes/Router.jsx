import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../views/Home";

import AlunoRoutes from "./AlunoRoutes";

export default function AppRouter()
{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/aluno/*" element={<AlunoRoutes/>} />
      </Routes>
    </Router>
  )
}

