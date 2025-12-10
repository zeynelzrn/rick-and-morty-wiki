import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCharacterDetail } from '../services/api';

//       KARAKTER DETAY SAYFASI
// Hocam bu sayfa dinamik bir sayfa. Hangi karaktere tiklandiysa onun ID'sini alip
//API den sadece o karaktere ait detaylari cekiyor.
const CharacterDetail = () => {
  // URL den (adres cubugundan) ID parametresini yakalamak icin useParams hook unu kullandim
  //Ornegin: /character/1 --> id = 1 oluyor
  const { id } = useParams();
  
  const [character, setCharacter] = useState(null); // Veriyi tutacak state
  const [loading, setLoading] = useState(true); // Yukleniyor ekranini kontrol etmek icin

  //ID degistiginde veya sayfa ilk acildiginda calisacak
  useEffect(() => {
    const getDetail = async () => {
      try {
        // Servis dosyamdaki fonksiyonu kullanarak veriyi cektim
        const data = await fetchCharacterDetail(id);
        setCharacter(data);
      } catch (error) {
        console.error("Detail error:", error);
      } finally {
        // Hata olsa da olmasa da yuklenme islemi bitince loading i kapatiyorum
        setLoading(false);
      }
    };
    getDetail();
  }, [id]); // id dependency array de, yani id degisirse tekrar ceker

  //       YUKLENIYOR EKRANI
  //Veri gelene kadar kullanici bos sayfa gormesin diye basit bir animasyon ekledim
  if (loading) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-green-500 text-3xl font-mono animate-bounce">Opening Portal...</div>
    </div>
  );

  //Eger ID hataliysa ve karakter bulunamazsa
  if (!character) return <div className="text-center text-red-500 mt-10">Character not found!</div>;

  return (
    <div className="min-h-screen bg-gray-900 py-20 px-6 flex items-center justify-center relative">
      
      {/*       ARKAPLAN EFEKTI*/}
      {/*Hocam burada karakterin resmini arka plana koyup blur ve opacity verdim */}
      {/*Boylece sayfa daha dolu ve modern gorunuyor, tema ile uyumlu oluyor */}
      <div className="absolute inset-0 overflow-hidden">
        <img src={character.image} className="w-full h-full object-cover opacity-10 blur-3xl scale-110" alt="bg" />
      </div>

      {/* ANA KART*/}
      {/*z-10 verdim ki bulanik arka planin ustunde dursun */}
      {/* mobilde flex-col (alt alta), masaustunde md:flex-row (yan yana) olacak sekilde responsive yaptim*/}
      <div className="relative z-10 bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700 overflow-hidden max-w-5xl w-full flex flex-col md:flex-row">
        
        {/* SOL KISIM: BUYUK RESIM*/}
        <div className="md:w-2/5 relative group">
          <img src={character.image} alt={character.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          {/*Resmin altina hafif bir gradient attim */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
        </div>

        {/* SAG KISIM: DETAYLI BILGILER */}
        <div className="p-10 md:w-3/5 flex flex-col justify-center">
          
          {/* Baslik ve Durum Etiketi*/}
          <div className="mb-6">
            <h1 className="text-5xl font-black text-white mb-2 tracking-tight">{character.name}</h1>
            {/*Karakter yasiyorsa yesil, oluyse kirmizi arka plan  */}
            <span className={`inline-block px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${character.status === 'Alive' ? 'bg-green-500 text-gray-900' : 'bg-red-500 text-white'}`}>
              {character.status}
            </span>
          </div>

          {/*. Izgara, Grid Yapisi ile Bilgiler */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300 mb-10">
            
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700 hover:border-green-500 transition">
              <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Species</span>
              <span className="text-lg text-white font-medium">{character.species}</span>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700 hover:border-green-500 transition">
              <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Gender</span>
              <span className="text-lg text-white font-medium">{character.gender}</span>
            </div>
            
            {/*  col-span-2 ile bu kutularin tam genislikte olmasini sagladim*/}
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700 hover:border-green-500 transition sm:col-span-2">
              <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Origin</span>
              <span className="text-lg text-white font-medium">{character.origin.name}</span>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700 hover:border-green-500 transition sm:col-span-2">
              <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Last Location</span>
              <span className="text-lg text-white font-medium">{character.location.name}</span>
            </div>
          </div>

          {/*GERI DON BUTONU*/}
          <Link to="/characters" className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-green-400 transition-colors duration-300 group w-max">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="ml-2">Back to List</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;