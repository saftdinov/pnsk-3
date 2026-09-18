// вспомогательные функции для канбан доски

// названия месяцев чтобы выводить дату красиво
var MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

// делаем уникальный идентификатор карточки
function makeId() {
  var n = Math.floor(Math.random() * 100000);
  var id = '' + Date.now() + '-' + n;
  return id;
}

// текущая дата и время в виде ДД.ММ.ГГГГ ЧЧ:ММ
function getNowString() {
  var d = new Date();
  var day = d.getDate();
  var month = d.getMonth() + 1;
  if (day < 10) { day = '0' + day; }
  if (month < 10) { month = '0' + month; }
  var hours = d.getHours();
  var minutes = d.getMinutes();
  if (hours < 10) { hours = '0' + hours; }
  if (minutes < 10) { minutes = '0' + minutes; }
  var s = day + '.' + month + '.' + d.getFullYear() + ' ' + hours + ':' + minutes;
  return s;
}

// из формата инпута ГГГГ-ММ-ДД делаем привычную ДД.ММ.ГГГГ
function normalDate(s) {
  if (!s) { return ''; }
  var p = s.split('-');
  var res = p[2] + '.' + p[1] + '.' + p[0];
  return res;
}

// красивая дата типа 5 марта 2026 для карточки
function prettyDate(s) {
  var p = s.split('-');
  var m = parseInt(p[1], 10);
  var res = parseInt(p[2], 10) + ' ' + MONTHS[m - 1] + ' ' + p[0];
  return res;
}

// сегодняшняя дата в виде ДД.ММ.ГГГГ
function todayNormal() {
  var d = new Date();
  var day = d.getDate();
  var month = d.getMonth() + 1;
  if (day < 10) { day = '0' + day; }
  if (month < 10) { month = '0' + month; }
  var res = day + '.' + month + '.' + d.getFullYear();
  return res;
}

// true если дэдлайн уже прошёл
// даты это строки вида ДД.ММ.ГГГГ поэтому сравниваем по частям
function isLate(deadline) {
  var dl = normalDate(deadline);
  var td = todayNormal();
  var a = dl.split('.');
  var b = td.split('.');
  var dayA = parseInt(a[0], 10);
  var monA = parseInt(a[1], 10);
  var yearA = parseInt(a[2], 10);
  var dayB = parseInt(b[0], 10);
  var monB = parseInt(b[1], 10);
  var yearB = parseInt(b[2], 10);
  // сначала сравниваем год
  if (yearA < yearB) { return true; }
  if (yearA > yearB) { return false; }
  // потом месяц
  if (monA < monB) { return true; }
  if (monA > monB) { return false; }
  // потом день
  if (dayA < dayB) { return true; }
  return false;
}
