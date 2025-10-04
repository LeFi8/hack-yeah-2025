import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import Home from "./routes/Home.tsx";
import SandboxMode from "./routes/SandboxMode.tsx";
import {Paths} from "./constants/paths.ts";
import Layout from "./routes/Layout.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path={Paths.Home} element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path={Paths.SandboxMode} element={<SandboxMode/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
