import { useEffect, useState } from 'react';
import { fetchCharacters } from '../services/api';
import CharacterCard from '../components/CharacterCard';

//      KARAKTERLERI LISTELEYEN ANA SAYFA
// Hocam projenin en karmasik sayfasi burasi diyebilirim.
//Hem listeleme, hem arama, hem filtreleme hem de sayfalama islemleri burada yapiliyor.
const Characters = () => {
  const [characters, setCharacters] = useState([]);  // Karakterleri tutan dizi
  const [loading, setLoading] = useState(true);     // Yukleniyor mu kontrolu
  
  // FILTRE VE SAYFA DEGISKENLERI , STATE
  //Kullanicinin sectigi filtreleri ve arama metnini burada tutuyorum
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  
  const [page, setPage] = useState(1);  //O anki sayfa numarasi
  const [info, setInfo] = useState({}); // API'den gelen sayfa bilgisi (kac sayfa var, sonraki sayfa var mi vs.)

  // FILTRE DEGISINCE SAYFAYI BASA ALMA
  //Hocam filtre degistiginde (mesela 'Alive' secince) eger 5. sayfadaysak ve sonuc azsa liste bos gorunebiliyor.
  // O yuzden filtre degisince hep 1. sayfaya donuyorum.
  const resetPage = () => setPage(1);

  //VERI CEKME ISLEMI ,EFFECT
  // Sayfa acilinca VEYA [page, searchTerm, statusFilter, genderFilter] degiskenlerinden biri degisince calisir.
  useEffect(() => {
    const getData = async () => {
      setLoading(true); // Once yukleniyor ekranini ac
      try {
        //Servis dosyamdaki fonksiyonu cagiriyorum, butun filtreleri parametre olarak yolluyorum
        const data = await fetchCharacters(page, searchTerm, statusFilter, genderFilter);
        setCharacters(data.results || []); //Gelen sonuclari kaydetme
        setInfo(data.info || {});  //Sayfa bilgisini kaydet
      } catch (error) {
        console.error("Error:", error);
        setCharacters([]); // Hata varsa listeyi bosaltma
        setInfo({});
      } finally {
        setLoading(false); //Islem bitince yukleniyor ekranini kapat
      }
    };

    getData();
    
    //Sayfa degisince kullanici en altta kalmasin, sayfanin en ustune kaydirayim dedim
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }, [page, searchTerm, statusFilter, genderFilter]);  // Bu degiskenleri dinliyor

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-10 px-6">
      <div className="container mx-auto">
        
        {/*BASLIK VE FILTRELEME ALANI */}
        <div className="flex flex-col items-center mb-12 space-y-6">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500 filter drop-shadow-lg text-center">
            Character Guide
          </h1>
          
          {/* FILTRE KUTUSU*/}
          {/*Grid yapisi kullandim, mobilde tek sutun masaustunde 3 sutun oluyor */}
          <div className="w-full max-w-4xl bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur-sm shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* 1.ISIM ARAMA INPUTU */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-xl">🔍</span>
                </div>
                {/* onChange de hem degeri guncelliyorum hem sayfayi 1 e aliyorum*/}
                <input 
                  type="text" 
                  placeholder="Search by name..." 
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900 text-white border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); resetPage(); }}
                />
              </div>

              {/* 2.DURUM FILTRESI ,DROPDOWN */}
              <select 
                className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 outline-none transition-all appearance-none cursor-pointer hover:bg-gray-800"
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); resetPage(); }}
              >
                <option value="">All Statuses</option>
                <option value="alive">🟢 Alive</option>
                <option value="dead">🔴 Dead</option>
                <option value="unknown">⚪ Unknown</option>
              </select>

              {/* 3. CINSIYET FILTRESI*/}
              <select 
                className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white border border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 outline-none transition-all appearance-none cursor-pointer hover:bg-gray-800"
                value={genderFilter}
                onChange={(e) => { setGenderFilter(e.target.value); resetPage(); }}
              >
                <option value="">All Genders</option>
                <option value="female">♀️ Female</option>
                <option value="male">♂️ Male</option>
                <option value="genderless">❌ Genderless</option>
                <option value="unknown">❓ Unknown</option>
              </select>

            </div>
          </div>
        </div>

        {/*  LISTELEME ALANI*/}
        {loading ? (
          //YUKLENIYOR EKRANI 
          // Hocam burada duz "Yukleniyor" yazisi yerine Youtube gibi gri kutularin yanip sonmesini yaptim
          //Daha modern durdugunu dusunuyorum
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl h-96 animate-pulse border border-gray-700">
                <div className="h-64 bg-gray-700 rounded-t-2xl"></div>
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-700 rounded w-full mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Eger karakter varsa listele*/}
            {characters.length > 0 ? (
              <>
                {/* KARAKTER KARTLARI*/}
                {/*Her karakter icin CharacterCard bilesenini cagiriyorum*/}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
                  {characters.map((char) => (
                    <CharacterCard key={char.id} character={char} />
                  ))}
                </div>

                {/* SAYFALAMA BUTONLARI*/}
                <div className="flex justify-center items-center space-x-6 pb-10">
                  {/*ONCEKI BUTONU: Sayfa 1 ise tiklanamaz (disabled) */}
                  <button 
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className={`px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 flex items-center space-x-2 ${page === 1 ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-800 text-green-400 hover:bg-green-500 hover:text-gray-900 shadow-lg'}`}
                  >
                    <span>←</span> <span>Prev</span>
                  </button>

                  <span className="text-gray-400 font-mono text-lg bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                    Page <span className="text-white font-bold">{page}</span> / {info.pages || 1}
                  </span>

                  {/*  SONRAKI BUTONU: API den next bilgisi gelmiyorsa son sayfadayiz demektir*/}
                  <button 
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={!info.next}
                    className={`px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 flex items-center space-x-2 ${!info.next ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gray-800 text-green-400 hover:bg-green-500 hover:text-gray-900 shadow-lg'}`}
                  >
                    <span>Next</span> <span>→</span>
                  </button>
                </div>
              </>
            ) : (
              //  SONUC BULUNAMADI EKRANI
              //Eger filtreleme sonucu bos donerse kullaniciya bunu soyluyorum
              <div className="text-center py-20 bg-gray-800/50 rounded-3xl border border-gray-700">
                <p className="text-6xl mb-4">🧪</p>
                <p className="text-gray-400 text-2xl font-bold">
                  No characters found!
                </p>
                <p className="text-gray-500 mt-2">
                  Try different filters.
                </p>
                {/* Filtreleri temizleme butonu*/}
                <button 
                  onClick={() => {setSearchTerm(""); setStatusFilter(""); setGenderFilter(""); setPage(1);}}
                  className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Characters;