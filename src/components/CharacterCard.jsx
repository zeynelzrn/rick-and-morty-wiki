import { Link } from 'react-router-dom';

//        KARAKTER KARTI 
// Hocam bu component her bir karakteri liste sayfasinda kutu olarak gosteriyor
//kod tekrarini onlemek ve temiz tutmak icin ayri bir dosya yaptim
const CharacterCard = ({ character }) => {

  // KARAKTERIN DURUMUNA GORE RENK AYARLAMA
  //if-else bloklari cok yer kapladigi icin ternary operator ( ? : ) kullandim
  //yasiyorsa yesil, oluyse kirmizi, bilinmiyorsa gri yapiyorum
  const statusColor = character.status === 'Alive' ? 'bg-green-500' 
                    : character.status === 'Dead' ? 'bg-red-600' 
                    : 'bg-gray-500';

  return (
    // Sayfa yenilenmeden (SPA mantigiyla) detay sayfasina gitmek icin React Router ın Link ini kullandim
    //normal <a> etiketi kullansaydim sayfa bastan yuklenirdi, performans kaybi olurdu
    <Link to={`/character/${character.id}`} className="group relative block h-full">
      
      {/*KARTIN DIS GORUNUMU VE HOVER EFEKTLERI */}
      {/* Hocam burada tailwind classlariyla hover efektleri ekledim */}
      {/*mouse ustune gelince kart hafif yukari kalkiyor (-translate-y-2) ve shadow artiyor */}
      <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-700 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-green-500/30 group-hover:border-green-500/50 h-full flex flex-col">
        
        {/* RESIM ALANI*/}
        <div className="relative overflow-hidden h-64">
          {/*Resim hover olunca hafif zoom istedim */}
          <img 
            src={character.image} 
            alt={character.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          
          {/* RESMIN UZERINDEKI DURUM ETIKETI*/}
          {/*absolute vererek resmin sağ üst kosesine sabitledim */}
          <div className="absolute top-3 right-3 flex items-center space-x-2 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-700">
            {/* Yukarida belirledigim rengi buraya verdim*/}
            {/*animate-pulse ile yanip sonme efekti ekledim ki canli durdugu belli olsun */}
            <span className={`w-3 h-3 rounded-full ${statusColor} animate-pulse`}></span>
            <span className="text-white text-xs font-bold uppercase tracking-wide">{character.status}</span>
          </div>
        </div>
        
        {/* KARAKTER BILGILERI KISMI*/}
        {/*flex-grow kullandim ki kartlarin icerigi az olsa bile kartlar esit boyda dursun */}
        <div className="p-5 flex flex-col flex-grow">
          {/*Hover olunca ismin rengi yesile donsun*/}
          <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">
            {character.name}
          </h2>
          <p className="text-gray-400 text-sm mb-4">{character.species} - {character.gender}</p>
          
          {/* mt-auto ile bu kismi kartin en altina ittim */}
          <div className="mt-auto space-y-3 pt-4 border-t border-gray-700/50">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Last Location:</p>
              {/*API den gelen location objesinin icindeki ismi aldim*/}
              <p className="text-gray-200 text-sm truncate hover:text-green-400 transition-colors">
                {character.location.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;