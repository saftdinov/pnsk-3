// окно возврата карточки из тестирования в работу
// тут обязательно пишем причину

Vue.component('return-dialog', {
  data: function () {
    return {
      reason: ''
    };
  },
  methods: {
    save: function () {
      // проверяем что причина не пустая
      if (this.reason == '') {
        alert('Напишите причину возврата');
        return;
      }
      this.$emit('save', this.reason);
    },
    cancel: function () {
      this.$emit('cancel');
    }
  },
  template: `
    <base-modal title="Возврат в работу" @close="cancel">
      <p class="modal-text">Карточка вернётся в колонку «Задачи в работе».</p>
      <div class="form-row">
        <label>Причина возврата</label>
        <textarea rows="3" v-model.trim="reason" placeholder="Например: не проходит проверку"></textarea>
      </div>
      <div class="btns">
        <button class="btn" @click="cancel">Отмена</button>
        <button class="btn orange" @click="save">Вернуть</button>
      </div>
    </base-modal>`
});
