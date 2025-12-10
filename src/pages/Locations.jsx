import { useEffect, useState } from 'react';
import { fetchLocations } from '../services/api';
import LocationCard from '../components/LocationCard';

//            MEKANLAR (LOCATIONS) SAYFASI
// Hocam bu sayfanin mantigi da Karakterler ve Bolumler ile ayni.
//Kullanici deneyimi (UX) acisindan butun sayfalarda ayni yapiyi korudum.
const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  //SAYFALAMA VE ARAMA STATE LERI
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [info, setInfo] = useState({}); //API den gelen sayfa bilgisi

  //VERI CEKME ISLEMI
  // [page, searchTerm] degiskenleri degisince otomatik calisir
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchLocations(page, searchTerm);
        setLocations(data.results || []);
        setInfo(data.info || {});
      } catch (error) {
        console.error("Error:", error);
        setLocations([]); //Hata olursa listeyi bosalt
        setInfo({});
      } finally {
        setLoading(false);
      }
    };
    getData();
    
    //Sayfa degisince en yukari kaydir
    window.scrollTo(0,0);
  }, [page, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-10 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-400 mb-8">Locations</h1>
        
        {/*    ARAMA ALANI  */}
        <div className="max-w-md mx-auto mb-10">
           {/* onChange de hem arama kelimesini guncelliyorum hem de sayfayi 1 yapiyorum */}
           {/*yoksa 10. sayfadayken arama yaparsa sonuc bulamayabilir */}
           <input 
             type="text" 
             placeholder="Search location... (e.g. Earth)" 
             className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none shadow-lg transition-all focus:ring-2 focus:ring-blue-500/20"
             value={searchTerm} 
             onChange={(e) => {setSearchTerm(e.target.value); setPage(1);}} 
           />
        </div>

        {/*ICERIK KONTROLU */}
        {loading ? (
          // YUKLENIYOR EKRANI
          //Temaya uygun olsun diye Scanning galaxy  yazdim
          <div className="text-center text-blue-500 animate-pulse text-xl">Scanning galaxy...</div>
        ) : (
          <>
            {locations.length > 0 ? (
              <>
                {/*  MEKAN KARTLARI   */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                  {locations.map(loc => <LocationCard key={loc.id} location={loc} />)}
                </div>

                {/*  SAYFALAMA BUTONLARI  */}
                <div className="flex justify-center items-center space-x-4">
                  <button 
                    disabled={page === 1} 
                    onClick={() => setPage(p=>p-1)} 
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition disabled:cursor-not-allowed"
                  >
                    ← Prev
                  </button>
                  <span className="text-gray-400 py-2 font-mono bg-gray-800 px-3 rounded border border-gray-700">
                    Page {page} / {info.pages || 1}
                  </span>
                  <button 
                    disabled={!info.next} 
                    onClick={() => setPage(p=>p+1)} 
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </>
            ) : (
              //  SONUC BULUNAMADI EKRANI
              // Hocam burada Rick and Morty evrenine uygun Karadelik esprisi yaptim :)
              <div className="text-center py-20 bg-gray-800/30 rounded-3xl border border-gray-700/50 backdrop-blur-sm">
                <p className="text-6xl mb-4">🪐</p>
                <p className="text-gray-400 text-2xl font-bold">
                  No locations found!
                </p>
                <p className="text-gray-500 mt-2">
                  Is the planet you are looking for lost in a black hole?
                </p>
                
                {/*Filtreleri temizleme butonu */}
                <button 
                  onClick={() => {setSearchTerm(""); setPage(1);}}
                  className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition shadow-lg shadow-blue-500/30"
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
export default Locations;