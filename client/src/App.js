import Landing from "./pages/Landing";
import { BrowserRouter, Routes, Route, Links } from 'react-router-dom';


function App() {
  return (
     <BrowserRouter>
     <Routes>

       <Landing />
  
     </Routes>
      
     </BrowserRouter> 
  )
}

export default App;
