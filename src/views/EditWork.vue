<template>
  <div>
    <h2>İşinizi düzenleyin</h2>
    <div class="alert" :class="alert_variant" v-if="show_alert">
      {{ alert_text }}
    </div>
    <form @submit.prevent="guncelle">
      <div class="form-group">
        <label for="workName"> Yapılacak iş </label>
        <input v-model="work.todoItem" class="form-control" />
      </div>
      <div class="form-group">
        <button
          :disabled="is_submitting"
          type="submit"
          class="form-control btn btn-primary"
        >
          Değişiklikleri kaydet
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { todoCollection } from "@/includes/firebase";
export default {
  name: "EditWork",
  data() {
    return {
      work: {},
      is_submitting: false,
      show_alert: false,
      alert_variant: "alert-primary",
      alert_text: "Lütfen bekleyiniz güncelleniyor..",
    };
  },
  async beforeMount() {
    const workSnapshot = await todoCollection.doc(this.$route.params.id).get();
    this.work = {
      ...workSnapshot.data(),
    };
  },
  methods: {
    async guncelle() {
      this.is_submitting = true;
      try {
        await todoCollection.doc(this.$route.params.id).update(this.work);
      } catch (ex) {
        this.is_submitting = false;
        this.show_alert = true;
        this.alert_variant = "alert-danger";
        this.alert_text = "Güncelleme işleminde hata oluştu!" + ex;
        return;
      }

      this.is_submitting = false;
      this.show_alert = true;
      this.alert_variant = "alert-success";
      this.alert_text = "Güncelleme başarılı!";
    },
  },
};
</script>
