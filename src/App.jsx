import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Characters from './pages/Characters';
import CharacterDetail from './pages/CharacterDetail';
import Locations from './pages/Locations';
import Episodes from './pages/Episodes';

//              ANA UYGULAMA BILESENI (MAIN APP)
//Hocam butun sayfa yapisi ve yonlendirmeler (Routing) burada toplaniyor.
// Sayfa yenilenmeden gecis yapmak icin (SPA mantigi) 'react-router-dom' kutuphanesini kullandim.
function App() {
  return (
    <Router>
      {/* SAYFA DUZENI*/}
      {/* Hocam burada 'Sticky Footer' mantigini kurdum*/}
      {/*min-h-screen ve flex-col ile sayfayi tam ekran yapiyorum. */}
      {/* justify-between ile footer i en asagi itiyorum. */}
      <div className="bg-gray-900 min-h-screen font-sans text-white flex flex-col justify-between">
        
        {/*Navbar her sayfada sabit kalsin diye Routes un disina koydum */}
        <Navbar />
        
        {/*ICERIK ALANI (MAIN) */}
        {/* flex-grow verdim ki icerik az olsa bile bu alan genislesin ve footer i asagi itsin*/}
        <main className="flex-grow">
          <Routes>
            {/*SAYFA ROTALARI */}
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<Characters />} />
            
            {/* DINAMIK ROTA*/}
            {/* :id parametresi ile hangi karaktere tiklandiysa onun detayini aciyorum */}
            <Route path="/character/:id" element={<CharacterDetail />} />
            
            {/* Mekanlar ve Bolumler sayfalari*/}
            <Route path="/locations" element={<Locations />} />
            <Route path="/episodes" element={<Episodes />} />
          </Routes>
        </main>
        
        {/*Footer da her sayfada sabit */}
        <Footer />
      </div>
    </Router>
  );
}
export default App;