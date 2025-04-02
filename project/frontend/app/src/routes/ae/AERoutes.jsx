import React from "react";
import { Routes, Route } from "react-router-dom";

import AlunoRoutes from "./AlunoRoutes";

export default function AERouter()
{
  return (
      <Routes>
        <Route path="/aluno/*" element={<AlunoRoutes/>} />
      </Routes>
  )
}

