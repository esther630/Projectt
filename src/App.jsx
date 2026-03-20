import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "../components/footer.jsx";
import Navigation from "../components/navigation.jsx";
import HomePage from "../components/home.jsx"; 
import LoginPage from "../auth/login.jsx"; 
import RegisterPage from"../auth/Register.jsx"; 
import ThankYou from "../auth/thankyou.jsx";  
import WriterDashboardPage from "../components/WriterDash.jsx";

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

       <Route path="/components/WriterDash" element={<WriterDashboardPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/thankyou" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;