import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

//      NAVBAR 
// Hocam bu menuyu her sayfada sabit duracak sekilde ayarladim
//hem masaustu hem mobil uyumlu (responsive) calisiyor
const Navbar = () => {
  // Hangi sayfada oldugumuzu anlamak icin useLocation hook unu kullandim
  //boylece aktif olan linki boyayabiliyorum
  const location = useLocation();

  // Mobil menunun acik/kapali durumunu tutan state
  //baslangicta kapali false olsun
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  //   LINKLERIN AKTIFLIK DURUMUNU AYARLAYAN FONKSIYON
  //her linke tek tek class yazmak yerine bu fonksiyonu yazdim
  // eger o anki sayfa (location.pathname) link ile ayniysa yesil ve kalin yapiyor
  const getLinkClass = (path) => {
    const baseClass = "transition duration-300 font-medium";
    const activeClass = "text-green-400 font-bold border-b-2 border-green-400 pb-1"; // Aktifse yesil
    const inactiveClass = "text-gray-300 hover:text-green-400"; // Pasifse gri, ustune gelince yesil

    //ternary operator ile kontrol ettim
    return location.pathname === path ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`;
  };

  // MOBIL MENUYU KAPATAN FONKSIYON
  //telefonda bir linke tiklayinca menu acik kalmasin diye bunu kullaniyorum
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    //  fixed w-full: sayfayi asagi kaydirsak bile menu hep ustte kalsin
    //backdrop-blur-md: arkasi flu gorunsun, modern dursun diye
    <nav className="fixed w-full top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-2xl">
      <div className="container mx-auto px-6 py-4">
        
        {/* UST KISIM, LOGO ve HAMBURGER BUTONU*/}
        <div className="flex justify-between items-center">
          
          {/*LOGO ALANI */}
          {/* Tiklayinca ana sayfaya gitsin ve mobil menu aciksa kapatsin*/}
          <Link to="/" onClick={closeMenu} className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 transition-transform duration-300">
            Wubba Lubba!
          </Link>
          
          {/*.  MASAUSTU MENU LINKLERI */}
          {/* 'hidden md:flex' diyerek mobilde gizledim, sadece bilgisayarda (md ve ustu) gosterdim*/}
          <div className="hidden md:flex space-x-8 text-lg">
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/characters" className={getLinkClass('/characters')}>Characters</Link>
            <Link to="/locations" className={getLinkClass('/locations')}>Locations</Link>
            <Link to="/episodes" className={getLinkClass('/episodes')}>Episodes</Link>
          </div>

          {/*  MOBIL MENU ACMA/KAPAMA BUTONU */}
          {/* 'md:hidden' diyerek bilgisayarda gizledim, sadece mobilde gosterdim*/}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // tiklayinca tersine cevir (acsa kapat, kapaliysa ac)
            className="md:hidden text-white focus:outline-none"
          >
            {/*IKON DEGISIMI */}
            {/* state true ise Carpi (X), false ise Hamburger üç çizgi göster*/}
            {isMobileMenuOpen ? (
              <span className="text-3xl">✖</span> 
            ) : (
              <span className="text-3xl">☰</span>
            )}
          </button>
        </div>

        {/*MOBIL MENU LISTESI, ACILIR ALAN */}
        {/* Conditional Rendering: State true ise bu div i ekrana bas */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col space-y-4 text-center bg-gray-800/50 rounded-xl p-4 border border-gray-700 animate-fade-in-down">
            {/* Linklere onClick={closeMenu} ekledim ki tiklayinca menu kapansin*/}
            <Link to="/" onClick={closeMenu} className={`block py-2 ${getLinkClass('/')}`}>
              Home
            </Link>
            <Link to="/characters" onClick={closeMenu} className={`block py-2 ${getLinkClass('/characters')}`}>
              Characters
            </Link>
            <Link to="/locations" onClick={closeMenu} className={`block py-2 ${getLinkClass('/locations')}`}>
              Locations
            </Link>
            <Link to="/episodes" onClick={closeMenu} className={`block py-2 ${getLinkClass('/episodes')}`}>
              Episodes
            </Link>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;