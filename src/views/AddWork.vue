<template>
  <div class="card">
    <div class="card-header">Listenize veri ekleyebilirsiniz.</div>
    <div class="card-body">
      <form @submit.prevent="addList">
        <div class="form-group">
          <label for="listeElemani">Yapılacak iş</label>
          <input
            id="listeElemani"
            v-model="todo"
            class="form-control"
            type="text"
          />
        </div>
        <div class="form-group">
          <button class="form-control btn btn-success" type="submit">
            Ekle
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { todoCollection } from "@/includes/firebase";

export default {
  name: "AddWork",
  data() {
    return {
      todo: "",
    };
  },
  methods: {
    async addList() {
      await todoCollection.add({
        todoItem: this.todo,
      });
      this.todo = "";
    },
  },
};
</script>
