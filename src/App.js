import './App.css';
import Main from './views/Main';
import Shop from './views/Shop';
import TopBar from './components/organism/TopBar';
import { Route, Routes } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import PartnerShip from './views/PartnerShip';
import QnA from './views/Q&A';
import News from './views/News';
import Calendar from './views/Calendar';
import Footer from './components/organism/Footer';
import Login from './views/Login';
import Product from './views/Product';

function App() {
  console.log('fck')
  return (
    <div className="App">
      <TopBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/Calendar" element={<Calendar />} />
        <Route path="/partnership" element={<PartnerShip />} />
        <Route path="/news" element={<News />} />
        <Route path="/qna" element={<QnA />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:productId" element={<Product />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
