// главный файл, тут вся логика доски

new Vue({
  el: '#app',
  data: {
    titles: ['Запланированные задачи', 'Задачи в работе', 'Тестирование', 'Выполненные задачи'],
    cards: [], // все карточки, у каждой есть col от 1 до 4
    showAddForm: false,
    editCardId: null, // id карточки которую редактируем
    editCopy: null, // копия карточки для формы
    returnCardId: null,
    deleteCardId: null,
    sortAZ: false // сортировка по алфавиту, не сделана
  },
  created: function () {
    this.loadCards();
  },
  methods: {
    // карточки нужной колонки
    getCards: function (n) {
      var res = [];
      for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].col == n) {
          res.push(this.cards[i]);
        }
      }
      return res;
    },
    // найти одну карточку по id
    getCardById: function (id) {
      var res = null;
      for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].id == id) {
          res = this.cards[i];
        }
      }
      return res;
    },
    openAdd: function () {
      if (this.showAddForm == true) { return; }
      this.showAddForm = true;
    },
    cancelAdd: function () {
      this.showAddForm = false;
    },
    addCard: function (data) {
      console.log('добавляем карточку ' + data.title);
      var card = {
        id: makeId(),
        col: 1,
        title: data.title,
        description: data.description,
        deadline: data.deadline,
        createdAt: getNowString(),
        updatedAt: '',
        returnReason: '',
        status: ''
      };
      this.cards.push(card);
      this.showAddForm = false;
      this.saveCards();
    },
    openEdit: function (card) {
      this.editCardId = card.id;
      // делаем копию чтобы не менять карточку пока редактируем
      this.editCopy = JSON.parse(JSON.stringify(card));
    },
    cancelEdit: function () {
      this.editCardId = null;
    },
    saveEdit: function (data) {
      var card = this.getCardById(this.editCardId);
      if (card == null) {
        this.editCardId = null;
        return;
      }
      card.title = data.title;
      card.description = data.description;
      card.deadline = data.deadline;
      // запоминаем когда последний раз редактировали
      card.updatedAt = getNowString();
      console.log('карточка изменена ' + card.updatedAt);
      this.editCardId = null;
      this.saveCards();
    },
    openDelete: function (card) {
      this.deleteCardId = card.id;
    },
    cancelDelete: function () {
      this.deleteCardId = null;
    },
    delCard: function () {
      var id = this.deleteCardId;
      var index = -1;
      for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].id == id) {
          index = i;
        }
      }
      if (index >= 0) {
        this.cards.splice(index, 1);
      }
      this.deleteCardId = null;
      this.saveCards();
    },
    moveRight: function (card) {
      console.log('переносим карточку вправо');
      if (card.col == 1) {
        card.col = 2;
      } else if (card.col == 2) {
        card.col = 3;
      } else if (card.col == 3) {
        // перед переходом в выполненные проверяем дэдлайн
        if (isLate(card.deadline) == true) {
          card.status = 'overdue';
        } else {
          card.status = 'ontime';
        }
        card.col = 4;
      }
      this.saveCards();
    },
    openReturn: function (card) {
      this.returnCardId = card.id;
    },
    cancelReturn: function () {
      this.returnCardId = null;
    },
    doReturn: function (reason) {
      console.log('возвращаем карточку, причина: ' + reason);
      var card = this.getCardById(this.returnCardId);
      if (card == null) {
        this.returnCardId = null;
        return;
      }
      card.returnReason = reason;
      card.col = 2;
      this.returnCardId = null;
      this.saveCards();
    },
    deleteQuestion: function () {
      var card = this.getCardById(this.deleteCardId);
      if (card == null) { return ''; }
      var q = 'Удалить карточку "' + card.title + '"?';
      return q;
    },
    saveCards: function () {
      // сохраняем в localStorage чтобы данные не пропали после перезагрузки
      localStorage.setItem('kanban_cards', JSON.stringify(this.cards));
      // console.log(this.cards);
    },
    loadCards: function () {
      var text = localStorage.getItem('kanban_cards');
      if (text != null && text != '') {
        this.cards = JSON.parse(text);
        console.log('загрузили карточек: ' + this.cards.length);
      }
    }
  }
});
