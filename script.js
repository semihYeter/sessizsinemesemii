const buttonArea = document.getElementById('buttonArea');
const icerikAlani = document.getElementById('icerikAlani');
const pageTitle = document.getElementById('pageTitle');

let stateStack = [];
let currentData = null;
let currentFileName = '';

// Buton isimlerinde kitap türleri için doğru yazımlar ve küçük harfe çevrilmiş dosya adları
const kitapTuruMap = {
  "19yuzyilineniyiromanlar.json": "19. Yüzyılın En İyi Romanları",
  "distopyautopyaromanlar.json": "Distopya-Utopya Romanları",
  "fantastikbilimkurguromanlar.json": "Fantastik & Bilimkurgu Romanları",
  "genclikwattpadromanlar.json": "Gençlik & Wattpad Romanları",
  "modernpopulerromanlar.json": "Modern & Popüler Romanlar",
  "polisiyegerilimromanlar.json": "Polisiye & Gerilim Romanları",
  "tarihromanlar.json": "Tarih Romanları",
  "turkrusromanlar.json": "Türk & Rus Romanları"
};

// Film/dizi için var olan map (küçük harf dosya adları)
const filmDiziMap = {
  'yerlifilm.json': 'Yerli Film',
  'yerlidizi.json': 'Yerli Dizi',
  'yabancifilm.json': 'Yabancı Film',
  'yabancidizi.json': 'Yabancı Dizi',
  'platformdizi.json': 'Platform - Dizi',
  'platformfilm.json': 'Platform - Film',
  'imdbtop100.json': 'IMDb Top 100',
  'rastgele.json': 'Rastgele Öner',
  'top200romanlar.json': 'Top 200 Kitaplar'
};

function createButton(text, onClick, className = 'main-btn') {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.className = className;
  btn.addEventListener('click', onClick);
  return btn;
}

function clearUI() {
  buttonArea.innerHTML = '';
  icerikAlani.innerHTML = '';
}

function geri() {
  if (stateStack.length > 0) {
    const prevState = stateStack.pop();
    prevState();
  } else {
    window.location.href = 'index.html';
  }
}

function anaEkran() {
  clearUI();
  pageTitle.textContent = 'Öneri 🎬✨';

  buttonArea.appendChild(createButton('Tür Seçimi', () => {
    stateStack.push(anaEkran);
    turSecimiEkrani();
  }, 'tur-secimi-btn'));

  buttonArea.appendChild(createButton('Seçilmişler', () => {
    stateStack.push(anaEkran);
    secilmislerEkrani();
  }, 'secilmisler-btn'));
}

function secilmislerEkrani() {
  clearUI();
  pageTitle.textContent = 'Seçilmişler';

  buttonArea.appendChild(createButton('Geri', geri, 'geri-btn'));

  buttonArea.appendChild(createButton('IMDb Top 100', () => {
    stateStack.push(secilmislerEkrani);
    loadJSON('imdbtop100.json');
  }, 'secilmisler-btn'));

  buttonArea.appendChild(createButton('Rastgele Öner', () => {
    stateStack.push(secilmislerEkrani);
    loadJSON('rastgele.json');
  }, 'secilmisler-btn'));

  // Top 200 Kitaplar seçilmişler kısmında
  buttonArea.appendChild(createButton('Top 200 Kitaplar', () => {
    stateStack.push(secilmislerEkrani);
    loadJSON('top200romanlar.json', true);
  }, 'secilmisler-btn'));
}

function turSecimiEkrani() {
  clearUI();
  pageTitle.textContent = 'Tür Seçimi';

  buttonArea.appendChild(createButton('Geri', geri, 'geri-btn'));

  buttonArea.appendChild(createButton('Yerli-Yabancı', () => {
    stateStack.push(turSecimiEkrani);
    yerliYabanciEkrani();
  }, 'tur-secimi-btn'));

  buttonArea.appendChild(createButton('Platform', () => {
    stateStack.push(turSecimiEkrani);
    platformEkrani();
  }, 'tur-secimi-btn'));

  // Kitaplar kısmı (tür seçimi altında)
  buttonArea.appendChild(createButton('Kitaplar', () => {
    stateStack.push(turSecimiEkrani);
    kitapTurleriEkrani();
  }, 'tur-secimi-btn'));
}

function yerliYabanciEkrani() {
  clearUI();
  pageTitle.textContent = 'Lütfen Seçiniz';

  buttonArea.appendChild(createButton('Geri', geri, 'geri-btn'));

  buttonArea.appendChild(createButton('Yerli Film', () => {
    stateStack.push(yerliYabanciEkrani);
    loadJSON('yerlifilm.json');
  }, 'tur-secimi-btn'));

  buttonArea.appendChild(createButton('Yerli Dizi', () => {
    stateStack.push(yerliYabanciEkrani);
    loadJSON('yerlidizi.json');
  }, 'tur-secimi-btn'));

  buttonArea.appendChild(createButton('Yabancı Film', () => {
    stateStack.push(yerliYabanciEkrani);
    loadJSON('yabancifilm.json');
  }, 'tur-secimi-btn'));

  buttonArea.appendChild(createButton('Yabancı Dizi', () => {
    stateStack.push(yerliYabanciEkrani);
    loadJSON('yabancidizi.json');
  }, 'tur-secimi-btn'));
}

function platformEkrani() {
  clearUI();
  pageTitle.textContent = 'Lütfen Seçiniz';

  buttonArea.appendChild(createButton('Geri', geri, 'geri-btn'));

  buttonArea.appendChild(createButton('Dizi', () => {
    stateStack.push(platformEkrani);
    loadJSON('platformdizi.json');
  }, 'tur-secimi-btn'));

  buttonArea.appendChild(createButton('Film', () => {
    stateStack.push(platformEkrani);
    loadJSON('platformfilm.json');
  }, 'tur-secimi-btn'));
}

function kitapTurleriEkrani() {
  clearUI();
  pageTitle.textContent = 'Kitap Türleri';

  buttonArea.appendChild(createButton('Geri', geri, 'geri-btn'));

  // Kitap türleri JSON dosyalarının listesi, küçük harf ve Türkçe karaktersiz
  const kitapTurleriDosyalar = [
    "19yuzyilineniyiromanlar.json",
    "distopyautopyaromanlar.json",
    "fantastikbilimkurguromanlar.json",
    "genclikwattpadromanlar.json",
    "modernpopulerromanlar.json",
    "polisiyegerilimromanlar.json",
    "tarihromanlar.json",
    "turkrusromanlar.json"
  ];

  kitapTurleriDosyalar.forEach(dosya => {
    const btnMetni = kitapTuruMap[dosya] || dosya.replace('.json','');
    buttonArea.appendChild(createButton(btnMetni, () => {
      stateStack.push(kitapTurleriEkrani);
      loadJSON(dosya, true);
    }, 'tur-secimi-btn'));
  });
}

// loadJSON fonksiyonuna ikinci parametre ile "kitap mı" olduğunu belirtiyoruz
async function loadJSON(file, kitapMi = false) {
  clearUI();

  buttonArea.appendChild(createButton('Geri', geri, 'geri-btn'));

  currentFileName = file;
  // küçük harfe çevirerek mapten isim alıyoruz
  const fileKey = file.toLowerCase();
  pageTitle.textContent = (kitapMi ? kitapTuruMap[fileKey] : filmDiziMap[fileKey]) + ' 🎬✨';

  // JSON dosyasının doğru path'i
  const basePath = kitapMi ? 'data/onerikitaplar/' : 'data/oneri/';

  try {
    const response = await fetch(basePath + file);
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      icerikAlani.innerHTML = 'Öneri bulunamadı.';
      return;
    }

    currentData = data;

    // Rastgele Önerme butonu (tek öneri)
    buttonArea.appendChild(createButton('Yeniden Öner 🔄', () => {
      showItems([randomItem(currentData)], kitapMi);
    }, 'tur-secimi-btn'));

    // İlk gösterim tek öneri
    showItems([randomItem(currentData)], kitapMi);

  } catch (e) {
    icerikAlani.innerHTML = 'Veri yüklenirken hata oluştu.';
    console.error(e);
  }
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Film/dizi ve kitap için farklı gösterim yapıyoruz
function showItems(items, kitapMi = false) {
  icerikAlani.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'film-item';

    if(kitapMi) {
      // Kitap formatı
      div.innerHTML = `
        <div><span class="film-ad">${item.Ad || 'Ad yok'}</span> <span class="film-yil">(${item.Yazar || 'Yazar yok'})</span></div>
        <div class="film-aciklama">${item.Tür || ''} - ${item.Ülke || ''}</div>
        <div class="film-aciklama">${item.Açıklama || ''}</div>
      `;
    } else {
      // Film/dizi formatı
      div.innerHTML = `
        <div><span class="film-ad">${item.AD || 'Ad yok'}</span> <span class="film-yil">(${item.YIL || ''})</span></div>
        <div class="film-aciklama">${item.AÇIKLAMA || ''}</div>
      `;
    }

    icerikAlani.appendChild(div);
  });
}

// Başlangıçta ana ekranı çağırıyoruz
anaEkran();
