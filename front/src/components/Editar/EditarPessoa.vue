<template>
  <div>
    <header>
      <h1>Editar Pessoa</h1>
    </header>
    <div class="container">
      <form @submit.prevent="atualizarPessoa" class="form">
        <div class="form-group">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" v-model="pessoa.nome" required class="form-control" />
        </div>
        <div class="form-group">
          <label for="funcao">Função:</label>
          <input type="text" id="funcao" v-model="pessoa.funcao" class="form-control" />
        </div>
        <div class="button-container">
          <router-link to="/">
            <button class="btn btn-cancel">Cancelar</button>
          </router-link>
          <button type="submit" class="btn btn-primary">Atualizar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import urlAPI from '@/utils/urlAPI';
import axios from 'axios';
import { VueMaskDirective } from 'v-mask';

export default {
  directives: { mask: VueMaskDirective },
  data() {
    return {
      pessoa: this.$route.params.pessoa,
    };
  },

  methods: {
    async atualizarPessoa() {
      try {
        const idPessoa = this.$route.params.id;
        const response = await axios.put(`${urlAPI}/pessoa/${idPessoa}`, this.pessoa);

        if (response.status === 200) {
          this.$router.push('/');
          this.feedbackMessage = 'Pessoa atualizada com sucesso.';
        } else {
          this.feedbackMessage = 'Erro ao atualizar a pessoa. Tente novamente.';
        }
      } catch (error) {
        this.feedbackMessage = 'Erro ao atualizar a pessoa. Tente novamente.';
      }
    },
  },
};
</script>

<style>
@import './styles.css';
</style>
