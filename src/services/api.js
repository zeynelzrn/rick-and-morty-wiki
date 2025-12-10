//      API SERVIS KATMANI 
// Hocam butun veri cekme islemlerini (Fetch)bu dosyada topladim.
//Boylece sayfalarin icinde fetch kodlari yazmama gerek kalmadi, kod daha temiz oldu.

const BASE_URL = 'https://rickandmortyapi.com/api'; // Ana linki degiskene atadim, yarin degisirse tek yerden duzeltirim.

//1. KARAKTERLERI GETIREN FONKSIYON
// Sayfalama, isim arama ve filtreleme (status, gender) parametrelerini aliyor.
export const fetchCharacters = async (page = 1, name = "", status = "", gender = "") => {
  
  //Hocam burada parametreleri elle birlestirmek yerine (string concatenation)
  // 'URLSearchParams' kullandim. Bu yontem URL yi otomatik ve hatasiz olusturuyor.
  //Ornegin: ?page=2&name=rick&status=alive gibi
  const query = new URLSearchParams({ page, name, status, gender }).toString();
  
  // Asenkron olarak veriyi cekiyorum (async/await)
  const response = await fetch(`${BASE_URL}/character/?${query}`);
  
  // HATA YONETIMI, ERROR HANDLING
  //Eger aranan kriterde karakter yoksa API 404 donuyor ve uygulama patliyordu.
  //  Bunu onlemek icin 404 gelirse bos dizi donduruyorum, boylece Sonuc Bulunamadi ekrani cikiyor.
  if (response.status === 404) return { results: [], info: null };
  
  const data = await response.json();
  return data;
};

//2. LOCATIONS GETIREN FONKSIYON
// Karakter fonksiyonu ile ayni mantikta calisiyor
export const fetchLocations = async (page = 1, name = "") => {
  const query = new URLSearchParams({ page, name }).toString();
  
  const response = await fetch(`${BASE_URL}/location/?${query}`);
  
  if (response.status === 404) return { results: [], info: null };
  
  const data = await response.json();
  return data;
};

// 3. EPISODES GETIREN FONKSIYON
//Hocam burada ekstra olarak 'sezon filtresi' ekledim.
export const fetchEpisodes = async (page = 1, name = "", episodeCode = "") => {
  const query = new URLSearchParams({ 
    page, 
    name, 
    //API dokumantasyonunda 'episode' parametresi 'S01' gibi kodlari kabul ediyormus.
    // Ben de dropdown dan gelen 'S01' kodunu buraya gonderdim.
    episode: episodeCode 
  }).toString();
  
  const response = await fetch(`${BASE_URL}/episode/?${query}`);
  
  if (response.status === 404) return { results: [], info: null };
  
  const data = await response.json();
  return data;
};

//4. TEK BIR KARAKTERIN DETAYINI CEKEN FONKSIYON
// Detay sayfasinda (CharacterDetail) kullaniyorum. ID ye gore tekil veri getiriyor.
export const fetchCharacterDetail = async (id) => {
    const response = await fetch(`${BASE_URL}/character/${id}`);
    const data = await response.json();
    return data;
};