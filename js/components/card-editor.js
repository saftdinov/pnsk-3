// форма для добавления и для редактирования карточки
// если mode == edit то заполняем поля из card

Vue.component('card-editor', {
  props: ['mode', 'card'],
  data: function () {
    return {
      title: '',
      description: '',
      deadline: ''
    };
  },
  mounted: function () {
    // при редактировании показываем старые значения в полях
    if (this.mode == 'edit' && this.card != null) {
      this.title = this.card.title;
      this.description = this.card.description;
      this.deadline = this.card.deadline;
    }
  },
  methods: {
    headName: function () {
      if (this.mode == 'edit') {
        return 'Редактирование задачи';
      }
      return 'Новая задача';
    },
    save: function () {
      // проверяем что заголовок не пустой
      if (this.title == '') {
        alert('Введите заголовок задачи');
        return;
      }
      if (this.deadline == '') {
        alert('Выберите дэдлайн');
        return;
      }
      var data = {
        title: this.title,
        description: this.description,
        deadline: this.deadline
      };
      this.$emit('save', data);
    },
    cancel: function () {
      this.$emit('cancel');
    }
  },
  template: `
    <base-modal :title="headName()" @close="cancel">
      <div class="form-row">
        <label>Заголовок</label>
        <input type="text" v-model.trim="title">
      </div>
      <div class="form-row">
        <label>Описание</label>
        <textarea rows="3" v-model.trim="description"></textarea>
      </div>
      <div class="form-row">
        <label>Дэдлайн</label>
        <input type="date" v-model="deadline">
      </div>
      <div class="btns">
        <button class="btn" @click="cancel">Отмена</button>
        <button class="btn blue" @click="save">{{ mode == 'edit' ? 'Сохранить' : 'Добавить' }}</button>
      </div>
    </base-modal>`
});
