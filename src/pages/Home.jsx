import { Link } from 'react-router-dom';
import pickleRickImg from '../assets/pickle-rick.png';

//     ANA SAYFA (LANDING PAGE)
// burasi sitenin vitrini oldugu icin gorsellige onem verdim.
//Kullaniciyi karsilayan ve diger sayfalara yonlendiren merkez burasi.
const Home = () => {
  return (
    //pt-32 verdim ki baslik navbar a yapismasn, ferah dursun
    // overflow-hidden onemli cunku arkadaki susler sayfayi tasirabilir, kaydirmayi engelledim
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative overflow-hidden pt-32 pb-10">
      
      {/* --- ARKAPLAN EFEKTLERI (CREATIVITY ICIN YAPTIKLARIM) --- */}
      {/*Sayfa cok bos durmasin diye arkaya flulastirilmis renkli toplar ekledim */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none"></div>

      {/* PICKLE RICK(SOL ALT KOSE) */}
      {/* Hocam Rick and Morty ruhunu yansitsin diye Pickle Ricki ekledim  */}
      {/*pointer-events-none verdim ki kullanici yanlislikla tiklayip secemesin, sadece dekor olsun */}
      <div className="absolute bottom-5 left-5 md:bottom-12 md:left-12 z-0 pointer-events-none select-none">
          <img
              src={pickleRickImg}
              alt="Pickle Rick background"
              //scale-x-[-1] ile resmi aynaladim (yonunu cevirdim)ki sahneye baksin
              className="w-48 md:w-96 h-auto opacity-30 transform scale-x-[-1] drop-shadow-2xl"
          />
      </div>

      {/*ICERIK ALANI */}
      {/* z-10 verdim ki arka planin ustunde dursun,  yazi okunabilsin */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full">
        {/*ANA BASLIK */}
        {/* Gradient text efektiyle modern bir gorunum sagladim*/}
        <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mb-4 drop-shadow-2xl">
          WUBBA LUBBA <br /> DUB DUB!
        </h1>
        
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Welcome to the most detailed <span className="text-green-400 font-bold">Rick and Morty</span> guide in the universe.
        </p>

        {/*  -- NAVIGASYON BUTONLARI --- */}
        <div className="flex flex-col items-center gap-6 mb-12 w-full max-w-3xl mx-auto">
          
          {/*1. SEVIYE: KARAKTERLER (ANA BUTON */}
          {/* Hocam genelde insanlar karakterlere bakmak icin gelir diye bu butonu digerlerinden buyuk yaptim (Hiyerarsi için) */}
          {/*group class ını kullanarak hover olunca icindeki ok isaretini ve parlamayi kontrol ediyorum*/}
          <Link to="/characters" className="group relative w-full bg-gray-800/80 hover:bg-gray-800 border-2 border-green-500 p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/30 flex flex-col md:flex-row items-center justify-center gap-6 overflow-hidden">
            <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="text-6xl group-hover:scale-110 transition-transform duration-300">👽</span>
            <div className="text-center md:text-left z-10">
              <h3 className="text-3xl font-bold text-white group-hover:text-green-400 mb-2">Explore Characters</h3>
              <p className="text-gray-400 group-hover:text-gray-200">Rick, Morty, and all the weird creatures of the universe are here.</p>
            </div>
            {/*Mobilde gizledim, masaüstünde gosterdim */}
            <span className="hidden md:block text-3xl text-green-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">→</span>
          </Link>

          {/*  2.  SEVIYE: MEKANLAR VE BOLUMLER*/}
          {/*Bunlari yan yana koydum ki ana butondan rol calmasinlar */}
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <Link to="/locations" className="flex-1 group bg-gray-800/40 hover:bg-gray-800 border border-gray-700 hover:border-blue-500 p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 flex flex-col items-center text-center">
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">🪐</span>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400">Locations</h3>
              <p className="text-gray-500 text-sm mt-1">Planets and dimensions</p>
            </Link>

            <Link to="/episodes" className="flex-1 group bg-gray-800/40 hover:bg-gray-800 border border-gray-700 hover:border-purple-500 p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 flex flex-col items-center text-center">
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">📺</span>
              <h3 className="text-xl font-bold text-white group-hover:text-purple-400">Episodes</h3>
              <p className="text-gray-500 text-sm mt-1">List of all adventures</p>
            </Link>
          </div>

        </div>

        {/*  --- GELISTIRICI BUTONU -- (Kendi Portfolyo Websitem) */}
        {/* Site disina link verdigim icin a etiketi kullandim */}
        <div className="flex justify-center">
          <a 
            href="https://zeynelzeren.online/" 
            target="_blank" 
            rel="noreferrer" 
            //Hover olunca yesil parliyor 
            className="px-8 py-3 rounded-full bg-gray-800/50 border border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-green-500 hover:text-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300 flex items-center gap-3 text-sm tracking-widest uppercase font-semibold group backdrop-blur-sm"
          >
            <span>👨‍💻 Meet the Developer</span>
            <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default Home;