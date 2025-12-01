export interface WorkerCategorySeed {
  code: string;
  name: string;
  parent?: string;
  tags?: string[];
}

export const workerCategorySeeds: WorkerCategorySeed[] = [
  { code: 'stroika', name: 'Стройка' },
  { code: 'shtukatur', name: 'Штукатур', parent: 'stroika', tags: ['отделка', 'стены'] },
  { code: 'malyar', name: 'Маляр', parent: 'stroika', tags: ['краска', 'ремонт'] },
  { code: 'gipsokarton', name: 'Гипсокартон', parent: 'stroika', tags: ['каркас', 'потолок'] },
  { code: 'plitka', name: 'Плиточник', parent: 'stroika', tags: ['плитка', 'ванная'] },
  { code: 'fasad', name: 'Фасадчик', parent: 'stroika', tags: ['фасад', 'утепление'] },
  { code: 'beton', name: 'Бетонщики', parent: 'stroika', tags: ['бетон', 'фундамент'] },
  { code: 'podsbors', name: 'Подсобные рабочие', parent: 'stroika', tags: ['подсобник', 'грузчик'] },
  { code: 'demontazh', name: 'Демонтажники', parent: 'stroika', tags: ['демонтаж', 'снос'] },
  { code: 'krysha', name: 'Кровельщики', parent: 'stroika', tags: ['крыша', 'монтаж'] },
  { code: 'santehnika', name: 'Сантехника' },
  { code: 'santehnik', name: 'Сантехник', parent: 'santehnika', tags: ['трубы', 'канализация'] },
  { code: 'otoplenie', name: 'Отопление', parent: 'santehnika', tags: ['котел', 'радиатор'] },
  { code: 'vodosnab', name: 'Водоснабжение', parent: 'santehnika', tags: ['вода', 'скважина'] },
  { code: 'elektrika', name: 'Электрика' },
  { code: 'electric', name: 'Электрик', parent: 'elektrika', tags: ['розетки', 'щит'] },
  { code: 'razvodka', name: 'Разводка', parent: 'elektrika', tags: ['проводка', 'кабели'] },
  { code: 'montazhsh', name: 'Монтаж щитов', parent: 'elektrika', tags: ['щиток', 'автоматы'] },
  { code: 'osveshenie', name: 'Освещение', parent: 'elektrika', tags: ['свет', 'лампы'] },
  { code: 'plotnik', name: 'Плотник / Столяр' },
  { code: 'plotnik-master', name: 'Плотник', parent: 'plotnik', tags: ['дерево', 'крыша'] },
  { code: 'stolyar', name: 'Столяр', parent: 'plotnik', tags: ['мебель', 'дерево'] },
  { code: 'furniture', name: 'Сборка мебели', parent: 'plotnik', tags: ['сборка', 'шкаф'] },
  { code: 'svarshik', name: 'Сварщик' },
  { code: 'zabory', name: 'Заборы', parent: 'svarshik', tags: ['забор', 'каркас'] },
  { code: 'karkasy', name: 'Каркасы', parent: 'svarshik', tags: ['каркас', 'сварка'] },
  { code: 'metall', name: 'Металлоконструкции', parent: 'svarshik', tags: ['металл', 'конструкции'] },
  { code: 'home', name: 'Домашние услуги' },
  { code: 'cleaning', name: 'Клининг', parent: 'home', tags: ['уборка', 'клининг'] },
  { code: 'uborka', name: 'Уборка', parent: 'home', tags: ['дом', 'уборка'] },
  { code: 'small-repair', name: 'Мелкий ремонт', parent: 'home', tags: ['ремонт', 'быт'] },
  { code: 'door-repair', name: 'Ремонт дверей', parent: 'home', tags: ['двери', 'замок'] },
  { code: 'lock-change', name: 'Замена замков', parent: 'home', tags: ['замок', 'дверь'] },
  { code: 'windows', name: 'Окна/двери', parent: 'home', tags: ['окна', 'монтаж'] },
  { code: 'flat-repair', name: 'Квартирный ремонт' },
  { code: 'remont-key', name: 'Ремонт под ключ', parent: 'flat-repair', tags: ['комплекс', 'бригада'] },
  { code: 'kosmetic', name: 'Косметический ремонт', parent: 'flat-repair', tags: ['косметика', 'покраска'] },
  { code: 'design', name: 'Дизайн-проект', parent: 'flat-repair', tags: ['дизайн', 'проект'] },
];
