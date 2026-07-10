// Каталог магазина. Правится здесь — интерфейс подхватывает изменения автоматически.

export const SHOP = {
  name: 'PLANTOS',
  tagline: 'операционная для домашних растений',
  city: 'Москва',
  delivery: 'доставка по РФ · СДЭК и курьер',
  phone: '+7 900 000-00-00',
}

// Категории каталога. slug — для фильтра, label — подпись.
export const CATEGORIES = [
  { slug: 'shade', label: 'Тенелюбивые' },
  { slug: 'light', label: 'Светолюбивые' },
  { slug: 'succulent', label: 'Суккуленты' },
  { slug: 'large', label: 'Крупномеры' },
]

// leaf — ключ силуэта (monstera | fiddle | rosette | strap | palm | round).
export const PLANTS = [
  {
    id: 'pl-01', code: 'PL-01', name: 'Монстера', latin: 'Monstera deliciosa',
    category: 'large', price: 3400, light: 'рассеянный', height: '70 см',
    water: 'раз в 7 дней', difficulty: 'просто', leaf: 'monstera',
    desc: 'Резной лист с прорезями. Быстро растёт, прощает ошибки полива — рабочая лошадка для крупного объёма зелени.',
  },
  {
    id: 'pl-02', code: 'PL-02', name: 'Замиокулькас', latin: 'Zamioculcas zamiifolia',
    category: 'shade', price: 2200, light: 'тень / полутень', height: '55 см',
    water: 'раз в 14 дней', difficulty: 'просто', leaf: 'strap',
    desc: 'Держит месяц без полива и мирится с тёмным углом. Клубни запасают воду — залить сложнее, чем засушить.',
  },
  {
    id: 'pl-03', code: 'PL-03', name: 'Сансевиерия', latin: 'Sansevieria trifasciata',
    category: 'shade', price: 1600, light: 'любой свет', height: '60 см',
    water: 'раз в 14 дней', difficulty: 'просто', leaf: 'strap',
    desc: 'Вертикальные жёсткие листья. Чистит воздух ночью, выживает почти везде — стартовое растение по умолчанию.',
  },
  {
    id: 'pl-04', code: 'PL-04', name: 'Фикус Лирата', latin: 'Ficus lyrata',
    category: 'large', price: 4800, light: 'яркий рассеянный', height: '90 см',
    water: 'раз в 7 дней', difficulty: 'внимание', leaf: 'fiddle',
    desc: 'Крупный скрипичный лист — витринное растение. Требует стабильного света и не любит переезды.',
  },
  {
    id: 'pl-05', code: 'PL-05', name: 'Эхеверия', latin: 'Echeveria elegans',
    category: 'succulent', price: 650, light: 'прямое солнце', height: '10 см',
    water: 'раз в 12 дней', difficulty: 'просто', leaf: 'rosette',
    desc: 'Плотная розетка с восковым налётом. Компактная, для подоконника и настольных композиций.',
  },
  {
    id: 'pl-06', code: 'PL-06', name: 'Хавортия', latin: 'Haworthia fasciata',
    category: 'succulent', price: 720, light: 'яркий рассеянный', height: '12 см',
    water: 'раз в 12 дней', difficulty: 'просто', leaf: 'rosette',
    desc: 'Полосатые остроконечные листья. Терпит меньше света, чем большинство суккулентов, — годится вглубь комнаты.',
  },
  {
    id: 'pl-07', code: 'PL-07', name: 'Калатея', latin: 'Calathea orbifolia',
    category: 'shade', price: 2600, light: 'полутень', height: '45 см',
    water: 'держать влажной', difficulty: 'сложно', leaf: 'round',
    desc: 'Крупный полосатый лист, к ночи складывается. Любит влажность и не терпит жёсткую воду — для опытной руки.',
  },
  {
    id: 'pl-08', code: 'PL-08', name: 'Стрелиция', latin: 'Strelitzia reginae',
    category: 'light', price: 5200, light: 'прямое солнце', height: '100 см',
    water: 'раз в 6 дней', difficulty: 'внимание', leaf: 'fiddle',
    desc: 'Крупные вёсла-листья, при хорошем свете — оранжевый цветок-птица. Заявочное растение для светлой комнаты.',
  },
  {
    id: 'pl-09', code: 'PL-09', name: 'Алоэ вера', latin: 'Aloe vera',
    category: 'succulent', price: 890, light: 'прямое солнце', height: '30 см',
    water: 'раз в 12 дней', difficulty: 'просто', leaf: 'rosette',
    desc: 'Мясистые листья с гелем. Польза плюс неубиваемость — солнце и редкий полив, больше ничего не просит.',
  },
  {
    id: 'pl-10', code: 'PL-10', name: 'Арека', latin: 'Dypsis lutescens',
    category: 'light', price: 3900, light: 'яркий рассеянный', height: '110 см',
    water: 'раз в 6 дней', difficulty: 'внимание', leaf: 'palm',
    desc: 'Перистая пальма, наполняет объём мягкой зеленью. Держите землю чуть влажной и берегите от сквозняка.',
  },
  {
    id: 'pl-11', code: 'PL-11', name: 'Пилея', latin: 'Pilea peperomioides',
    category: 'light', price: 980, light: 'яркий рассеянный', height: '25 см',
    water: 'раз в 8 дней', difficulty: 'просто', leaf: 'round',
    desc: 'Круглые листья-монетки на тонких ножках. Легко даёт деток — расходится по друзьям как черенки.',
  },
  {
    id: 'pl-12', code: 'PL-12', name: 'Филодендрон', latin: 'Philodendron hederaceum',
    category: 'shade', price: 1400, light: 'полутень', height: '35 см',
    water: 'раз в 8 дней', difficulty: 'просто', leaf: 'monstera',
    desc: 'Ампельные сердцевидные листья, пускает плети. Растёт в полутени и прощает нерегулярный полив.',
  },
]
