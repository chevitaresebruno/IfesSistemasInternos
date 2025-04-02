import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../views/Home";

import AERouter from "./ae/AERoutes";

export default function AppRouter()
{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/AssistenciaEstudantil/*" element={<AERouter/>} />
      </Routes>
    </Router>
  )
}

