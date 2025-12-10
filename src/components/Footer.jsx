const Footer = () => {
  return (
    //       FOOTER DIS KAPLAYICI
    // mt-auto (margin-top: auto) burada cok onemli hocam. 
    //Eger sayfa icerigi azsa footer yukari kaymasin, hep ekranin en altina yapissin diye bunu ekledim.
    //App.jsx icindeki flex yapisiyla beraber calisiyor.
    <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-6 text-center">
        
        {/*.   PROJE KIMLIGI */}
        {/*Odev teslimi oldugu icin ismimi ve ders kodunu belirgin sekilde yazdim */}
        <p className="mb-4 text-xl font-semibold text-white tracking-wide">
          Zeynel Zeren | <span className="text-green-500">SE 3355</span> – Midterm Project
        </p>
        
        {/* LINKLER*/}
        <div className="flex justify-center space-x-8 mb-6 text-sm uppercase tracking-widest">
          {/* API Dokumantasyon Linki*/}
          {/*target="_blank" ile yeni sekmede actirdim ki kullanici sitemden cikmasin */}
          {/* rel="noreferrer" guvenlik icin gerekliymis (React warning veriyordu yoksa) */}
          <a 
            href="https://rickandmortyapi.com/" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-green-400 transition-colors duration-300"
          >
            API Docs
          </a>
          
          {/*GitHub Profilim */}
          <a 
            href="https://github.com/zeynelzrn" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-green-400 transition-colors duration-300 flex items-center gap-2"
          >
            GitHub Profile ↗
          </a>
        </div>
        
        {/* TELIF HAKKI KISMI*/}
        <p className="text-xs text-gray-600">
          {/* Yılı elle yazmak yerine dinamik aldim. Seneye site guncel kalsin*/}
          &copy; {new Date().getFullYear()} Rick and Morty Wiki. Built with React & Tailwind.
        </p>
      </div>
    </footer>
  );
};

export default Footer;