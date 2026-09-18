// одна карточка задачи
// num это номер колонки от 1 до 4, от него зависят кнопки

Vue.component('task-card', {
  props: ['card', 'num'],
  computed: {
    prettyDeadline: function () {
      return prettyDate(this.card.deadline);
    }
  },
  methods: {
    statusText: function () {
      if (this.card.status == 'overdue') {
        return 'Просрочено';
      }
      return 'Выполнено в срок';
    },
    rightName: function () {
      if (this.num == 1) { return 'В работу →'; }
      if (this.num == 2) { return 'На тестирование →'; }
      return 'В выполненные →';
    },
    editCard: function () { this.$emit('edit'); },
    delCard: function () { this.$emit('del'); },
    moveRightCard: function () { this.$emit('right'); },
    backCard: function () { this.$emit('back'); }
  },
  template: `
    <div class="card">
      <div class="card-title">
        <b>{{ card.title }}</b>
        <span v-if="card.status" :class="card.status == 'overdue' ? 'badge badge-late' : 'badge badge-ok'">{{ statusText() }}</span>
      </div>
      <div class="card-desc" v-if="card.description">{{ card.description }}</div>
      <div class="card-line">Создана: {{ card.createdAt }}</div>
      <div class="card-line">Дэдлайн: {{ prettyDeadline }}</div>
      <div class="card-line" v-if="card.updatedAt">Изменена: {{ card.updatedAt }}</div>
      <div class="card-return" v-if="card.returnReason">Вернули с тестирования: {{ card.returnReason }}</div>
      <div class="card-btns">
        <button class="mini-btn" v-if="num != 4" @click="editCard">Редактировать</button>
        <button class="mini-btn red" v-if="num == 1" @click="delCard">Удалить</button>
        <button class="mini-btn blue" v-if="num != 4" @click="moveRightCard">{{ rightName() }}</button>
        <button class="mini-btn orange" v-if="num == 3" @click="backCard">↩ Вернуть в работу</button>
      </div>
    </div>`
});
