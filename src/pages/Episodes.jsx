import { useEffect, useState } from 'react';
import { fetchEpisodes } from '../services/api';
import EpisodeCard from '../components/EpisodeCard';

//      BOLUMLER SAYFASI
//bu sayfa da Karakterler sayfasina cok benziyor mantik olarak.
//Sadece burada ekstra olarak 'Sezon' filtresi ekledim.
const Episodes = () => {
  const [episodes, setEpisodes] = useState([]); //bölümleri tutan dizi
  const [loading, setLoading] = useState(true);
  
  // STATE LER
  //Sayfa numarasi, arama metni ve sezon filtresi icin state ler
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [seasonFilter, setSeasonFilter] = useState(""); 
  const [info, setInfo] = useState({}); // Sayfalama bilgisi (next/prev)

  // FILTRE DEGISINCE SAYFAYI SIFIRLAMA
  //Kullanici yeni bir arama yapinca 1. sayfadan baslamasi lazim, yoksa bos sayfa gorebilir
  const resetPage = () => setPage(1);

  // API ISTEGI 
  //[page, searchTerm, seasonFilter] degiskenlerinden biri degistiginde otomatik calisir
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        //  Servis dosyamdaki fonksiyonu cagiriyorum
        const data = await fetchEpisodes(page, searchTerm, seasonFilter);
        setEpisodes(data.results || []);
        setInfo(data.info || {});
      } catch (error) {
        console.error("Error:", error);
        setEpisodes([]);
        setInfo({});
      } finally {
        setLoading(false);
      }
    };
    getData();
    
    //Sayfa degisince en yukari kaydirma
    window.scrollTo(0,0);
  }, [page, searchTerm, seasonFilter]); 

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-10 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-400 mb-8">Episodes</h1>
        
        {/* -- FILTRELEME ALANI-- */}
        {/*Hocam burada Karakterler sayfasindaki tasarim dilini korudum (tutarlilik icin) */}
        <div className="w-full max-w-4xl mx-auto mb-10 bg-gray-800/50 p-6 rounded-2xl border border-gray-700 backdrop-blur-sm shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/*1. ISIM ILE ARAMA */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-xl">🔍</span>
                </div>
                {/* onChange ile hem degeri guncelliyorum hem de resetPage() cagiriyorum*/}
                <input 
                  type="text" 
                  placeholder="Search episode... (e.g. Pilot)" 
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-900 text-white border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); resetPage(); }}
                />
              </div>

              {/* 2. SEZON SECIMI*/}
              {/*Kullanicinin kolayca sezon secebilmesi icin select kullandim (yıl ile birlikte)*/}
              <select 
                className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all appearance-none cursor-pointer hover:bg-gray-800"
                value={seasonFilter}
                onChange={(e) => { setSeasonFilter(e.target.value); resetPage(); }}
              >
                <option value="">📺 All Seasons</option>
                <option value="S01">Season 1 (2013-2014)</option>
                <option value="S02">Season 2 (2015)</option>
                <option value="S03">Season 3 (2017)</option>
                <option value="S04">Season 4 (2019-2020)</option>
                <option value="S05">Season 5 (2021)</option>
              </select>

            </div>
        </div>

        {/*ICERIK KONTROLU */}
        {loading ? (
          //YUKLENIYOR EKRANI
          //  Temaya uygun olsun diye 'Loading tape...' yazdim
          <div className="text-center text-purple-500 animate-pulse text-xl">Loading tape...</div>
        ) : (
          <>
            {episodes.length > 0 ? (
              <>
                {/*BOLUM KARTLARI LISTESI */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                  {episodes.map(ep => <EpisodeCard key={ep.id} episode={ep} />)}
                </div>

                {/* SAYFALAMA BUTONLARI*/}
                <div className="flex justify-center items-center space-x-4">
                  {/* Ilk sayfadaysak 'Prev' butonu calismasini engelledim */}
                  <button 
                    disabled={page === 1} 
                    onClick={() => setPage(p=>p-1)} 
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 hover:bg-purple-600 transition disabled:cursor-not-allowed"
                  >
                    ← Prev
                  </button>

                  <span className="text-gray-400 py-2 font-mono bg-gray-800 px-3 rounded border border-gray-700">
                    {page} / {info.pages || 1}
                  </span>

                  {/*Son sayfadaysak(info.next yoksa) 'Next' butonu calismasini engelledim */}
                  <button 
                    disabled={!info.next} 
                    onClick={() => setPage(p=>p+1)} 
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 hover:bg-purple-600 transition disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </>
            ) : (
              //.  SONUC BULUNAMADI EKRANI
              //Filtreler sonuc vermezse kullaniciya geri donus veriyorum
              <div className="text-center py-20 bg-gray-800/30 rounded-3xl border border-gray-700/50 backdrop-blur-sm">
                <p className="text-6xl mb-4">📺</p>
                <p className="text-gray-400 text-2xl font-bold">
                  No episodes found!
                </p>
                <p className="text-gray-500 mt-2">
                  No results match your criteria.
                </p>
                {/* Temizle butonu ile her seyi sifirliyorum*/}
                <button 
                  onClick={() => {setSearchTerm(""); setSeasonFilter(""); setPage(1);}}
                  className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition shadow-lg shadow-purple-500/30"
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
export default Episodes;