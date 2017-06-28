/**
 * A simple Shopping List Component
 */

export default {
  name: 'shopping-list',

  template: `
    <ul class="shopping-list">
      <li v-for="item in items" :key="item.uuid" :class="{ done: item.done}">
        {{ item.text }}
        <button @click="complete(item.uuid)">Done</button>
      </li>
    </ul>
  `,

  data() {
    return {
      items: [
        { text: 'Beer', done: true, uuid: 1},
        { text: 'Milk', done: false, uuid: 2},
        { text: 'Apple', done: false, uuid: 3},
      ]
    }
  },

  methods: {
    complete(key) {
      let item = this.items.find( entry => entry.uuid == key)
      item.done = true
    }
  }
}
