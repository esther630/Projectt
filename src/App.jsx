import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "../components/footer.jsx";
import Navigation from "../components/navigation.jsx";
import HomePage from "../components/home.jsx"; 
import LoginPage from "../auth/login.jsx"; 
import RegisterPage from"../auth/Register.jsx"; 
import WriterDashboardPage from "../writer/WriterDash.jsx";
import WriterEditorPage from "../writer/writerstudio.jsx";
import GrammarChecker from "../writer/grammar.jsx";
import CreateBook from "../writer/createbook.jsx";


function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="grow">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
        
        </Route>
        <Route path="/writer/createbook" element={<CreateBook />} /> 
      <Route path="/writer/writerStudio" element={<WriterEditorPage />} />
       <Route path="/writer/WriterDash" element={<WriterDashboardPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/writer/grammar" element={<GrammarChecker />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;