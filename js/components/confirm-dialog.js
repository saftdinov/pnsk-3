// окно с вопросом да или нет, используем перед удалением

Vue.component('confirm-dialog', {
  props: ['question'],
  methods: {
    yes: function () {
      this.$emit('yes');
    },
    no: function () {
      this.$emit('no');
    }
  },
  template: `
    <base-modal title="Подтверждение" @close="no">
      <p class="modal-text">{{ question }}</p>
      <div class="btns">
        <button class="btn" @click="no">Отмена</button>
        <button class="btn red" @click="yes">Да, удалить</button>
      </div>
    </base-modal>`
});
