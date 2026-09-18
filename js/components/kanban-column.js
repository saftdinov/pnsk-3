// колонка доски, num от 1 до 4
// кнопку добавить показываем только в первой колонке

Vue.component('kanban-column', {
  props: ['num', 'name', 'list'],
  template: `
    <div class="column">
      <div class="column-head">
        <b>{{ name }}</b>
        <span class="cnt">{{ list.length }}</span>
      </div>
      <div class="column-cards">
        <div class="empty" v-if="list.length == 0">Задач нет</div>
        <task-card
          v-for="card in list"
          :key="card.id"
          :card="card"
          :num="num"
          @edit="$emit('edit', card)"
          @del="$emit('del', card)"
          @right="$emit('right', card)"
          @back="$emit('back', card)">
        </task-card>
      </div>
      <button class="add-btn" v-if="num == 1" @click="$emit('add')">+ Добавить задачу</button>
    </div>`
});
