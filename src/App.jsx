import { Route, Routes } from "react-router-dom";
import { Login } from "./Views/Login";
import { Index } from "./Views";
import { CreateDocs } from "./Views/create";

export function App() {
    return(
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/index" element={<Index/>} />
            <Route path="/create" element={<CreateDocs/>} />
        </Routes>
    )
    
}