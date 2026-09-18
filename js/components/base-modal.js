// простое модальное окно, внутрь через slot вставляется что надо

Vue.component('base-modal', {
  props: ['title'],
  template: `
    <div class="overlay" @click.self="$emit('close')">
      <div class="window">
        <div class="window-head">
          <b>{{ title }}</b>
          <span class="close-x" @click="$emit('close')">x</span>
        </div>
        <div class="window-body">
          <slot></slot>
        </div>
      </div>
    </div>`
});
