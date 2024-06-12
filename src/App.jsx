import './App.css'
import {Header} from "./components/Header.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainPanel} from "./pages/MainPanel.jsx";
import {Incomes} from "./pages/Incomes.jsx";
import {Expenses} from "./pages/Expenses.jsx";
import {Goals} from "./pages/Goals.jsx";
import {Reports} from "./pages/Reports.jsx";

function App() {
  return (
    <>
       <BrowserRouter>
           <Routes>
               <Route path="/" element={<MainPanel />} />
               <Route path="/incomes" element={<Incomes />} />
               <Route path="/expenses" element={<Expenses />} />
               <Route path="/goals" element={<Goals />} />
               <Route path="/reports" element={<Reports />} />
           </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
