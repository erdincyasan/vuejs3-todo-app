<template>
  <div class="card">
    <div class="alert" :class="alert_variant" v-if="show_alert">
      {{ alert_text }}
    </div>
    <div class="card-header">
      İşlerinizi düzenleyebilir veya silebilirsiniz.
    </div>
    <div class="card-body">
      <h2 v-if="works.length == 0">Yükleniyor lütfen bekleyiniz...</h2>
      <ul v-else>
        <li v-for="(work, index) in works" :key="work.workId">
          {{ work.todoItem }}
          <br />
          <router-link
            :to="{ name: 'EditWork', params: { id: work.workId } }"
            class="btn btn-primary"
            >Düzenle</router-link
          >
          <button
            @click.prevent="sil(work.workId, index)"
            class="btn btn-danger"
          >
            SİL
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { todoCollection } from "@/includes/firebase";
export default {
  name: "ListWork",
  data() {
    return {
      works: [],
      show_alert: false,
      alert_variant: "alert-primary",
      alert_text: "Lütfen bekleyiniz işleminiz devam ediyor..",
    };
  },
  async beforeMount() {
    const worksSnapshot = await todoCollection.get();
    worksSnapshot.forEach((doc) => {
      this.works.push({
        workId: doc.id,
        ...doc.data(),
      });
    });
  },
  methods: {
    async sil(id, index) {
      try {
        await todoCollection.doc(id).delete();
      } catch (ex) {
        this.alert_variant = "alert-danger";
        this.alert_text = "Silme Sırasında hata oluştu!" + ex;
        this.show_alert = true;
        return;
      }
      this.alert_variant = "alert-success";
      this.alert_text = "Başarıyla silindi";
      this.show_alert = true;
      this.works.splice(index, 1);
      setTimeout(() => {
        this.show_alert = false;
      }, 3000);
    },
  },
};
</script>
