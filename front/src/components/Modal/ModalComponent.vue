<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <h2>{{ title }}</h2>
        <span @click="fecharModal" class="modal-close-button">X</span>
      </div>
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: Boolean,
    title: String,
    idPessoa: Number,
  },
  methods: {
    fecharModal() {
      this.$emit("fechar-modal");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #fff;
  width: 50%;
  height: 50%;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.modal-header {
  background: #cc0000;
  color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.modal-close-button {
  cursor: pointer;
}

.modal-content {
  padding: 20px;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
}

.modal-content h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 15px;
}

.modal-content p {
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
}

.modal-content p strong {
  font-weight: 600;
  color: #000;
}

.modal-content a {
  color: #007bff;
  text-decoration: none;
}

.modal-content a:hover {
  text-decoration: underline;
}

.modal-content span {
  display: flex;
}
</style>
