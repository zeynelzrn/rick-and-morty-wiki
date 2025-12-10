const EpisodeCard = ({ episode }) => {
  return (
    //         BOLUM KARTI DIS KATMANI
    //karakterlerde yesil tema kullanmistim, karismasin diye bolumlerde mor tema sectim
    // group class ını buraya verdim ki karta hover olunca icindeki elemanlar da tepki versin
    <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group h-full flex flex-col">
      
      {/* GORSEL YERINE IKON KULLANDIM*/}
      {/* Hocam API'den bolumler icin resim gelmiyor, kartlar bos durmasin diye */}
      {/*gradient arka plan yapip ortasina tv emojisi koydum*/}
      <div className="h-32 bg-gradient-to-br from-purple-900 to-gray-900 flex items-center justify-center group-hover:from-purple-800 transition-colors">
        {/* Emojiye de golge ve hover efekti ekledim*/}
        <span className="text-6xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
          📺
        </span>
      </div>

      {/* BILGI ALANI */}
      {/*flex-grow ile kartin geri kalanini kaplamasini sagladim, boylece butonlar hizali duruyor */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Bolum Ismi*/}
          {/*truncate kullandim cunku bazi bolum isimleri cok uzun, bu taşmayı engelliyor*/}
          <h2 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors truncate">
            {episode.name}
          </h2>
          
          {/* Bolum Kodu(S01E01 gibi)*/}
          {/* Daha teknik dursun diye font-mono kullandim ve kutu icine aldim*/}
          <p className="text-purple-300 text-sm font-mono font-bold mb-4 bg-purple-900/30 inline-block px-2 rounded">
            {episode.episode}
          </p>
        </div>
        
        {/*Alt Kisim (Tarih) */}
        {/* Ust taraftan ayirmak icin ince bir cizgi (border-t) cektim*/}
        <div className="text-gray-400 text-sm border-t border-gray-700 pt-3 mt-2">
          <p className="text-xs uppercase font-semibold text-gray-500 mb-1">Release Date:</p>
          <p className="text-white font-medium">
            {episode.air_date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;