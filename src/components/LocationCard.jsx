const LocationCard = ({ location }) => {
  return (
    //      MEKAN KARTI DIS KATMANI
    // Burada mavi tema kullandim ki karakterlerden yesil ve bolumlerden mor ayirt edilsin
    //flex-col ve h-full verdim ki icerik az olsa bile butun kartlar esit boyda olsun
    <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group h-full flex flex-col">
      
      {/* GORSEL ALANI*/}
      {/* Hocam API mekanlar icin resim vermiyor. Kartlar bos kalmasin diye*/}
      {/*CSS gradient ve gezegen emojisi ile temsili bir gorsel olusturdum */}
      <div className="h-32 bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center group-hover:from-blue-800 transition-colors">
        {/*  Hover olunca ikon buyusun diye transform ekledim */}
        <span className="text-6xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
          🪐
        </span>
      </div>

      {/* BILGILER*/}
      {/*  flex-grow ile bu kismi uzattim, boylece kartin alt kismi hep en asagida kaliyor */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Mekan Ismi*/}
          <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors truncate">
            {location.name}
          </h2>
          
          {/*Mekan Tipi (Planet, Cluster vs.) */}
          {/* Etiket gibi dursun diye rounded-full ve border verdim */}
          <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-300 text-xs rounded-full border border-blue-800 mb-4">
            {location.type}
          </span>
        </div>
        
        {/*Alt Bilgi (Boyut) */}
        <div className="text-gray-400 text-sm border-t border-gray-700 pt-3 mt-2">
          <p className="text-xs uppercase font-semibold text-gray-500 mb-1">Dimension:</p>
          <p className="text-white font-medium truncate">
            {/* KOSULLU GSTERIM*/}
            {/*API bazen boyut icin 'unknown' donuyor. */}
            {/* Oyle olursa yanina emoji koydum, yoksa direkt boyutu yazdim */}
            {location.dimension === "unknown" ? "Unknown 🌌" : location.dimension}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;