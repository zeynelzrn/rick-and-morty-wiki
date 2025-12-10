import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Tailwind ve global stilleri buradan projeye dahil ettim
//.  butun sayfalarda gecerli olacak stiller burada
import './index.css'
import App from './App.jsx'

//     REACT UYGULAMASININ BASLANGIC NOKTASI (ENTRY POINT)
// Hocam index.html icindeki 'root' id'li div'i yakalayip
//butun React uygulamasini (App.jsx) oraya monte ediyorum.

// React 18 ile gelen yeni 'createRoot' yontemini kullandim 
createRoot(document.getElementById('root')).render(
  
  //StrictMode: gelistirme asamasinda olasi hatalari ve uyarilari onceden gormek icin kullandim.
  // (Hocam bir not: Console a bazen useEffect in iki kere calismasinin sebebi bu modmus, 
  //guvenlik icin production da degil sadece dev ortaminda calisiyor)
  <StrictMode>
    <App />
  </StrictMode>,
)