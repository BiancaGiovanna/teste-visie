<template>
  <div>
    <header>
      <h1>Adicionar Pessoa</h1>
    </header>
    <div class="container">
      <form @submit.prevent="adicionarPessoa" class="form">
        <div class="form-group">
          <label for="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            v-model="pessoa.nome"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="rg">RG:</label>
          <input
            type="text"
            id="rg"
            v-model="pessoa.rg"
            v-mask="'##.###.###-#'"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            v-model="pessoa.cpf"
            v-mask="'###.###.###-##'"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="data_nascimento">Data de Nascimento:</label>
          <input
            type="text"
            id="data_nascimento"
            v-model="pessoa.data_nascimento"
            v-mask="'##/##/####'"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="dataAdmissao">Data de Admissão:</label>
          <input
            type="text"
            id="dataAdmissao"
            v-model="pessoa.data_admissao"
            v-mask="'##/##/####'"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="funcao">Função:</label>
          <input
            type="text"
            id="funcao"
            v-model="pessoa.funcao"
            class="form-control"
          />
        </div>
        <div class="button-container">
          <router-link to="/">  
            <button  class="btn btn-cancel">cancelar</button>
          </router-link>
          <button type="submit" class="btn btn-primary">Adicionar</button>
        </div>
      </form>

    </div>
  </div>
</template>


<script>
import urlAPI from '@/utils/urlAPI';
import axios from 'axios';
import { VueMaskDirective } from 'v-mask'


export default {
  directives: { mask: VueMaskDirective },
  data() {
    return {
      pessoa: {
        nome: '',
        rg: '',
        cpf: '',
        data_nascimento: '',
        data_admissao: '',
        funcao: '',
      },
    };
  },
  methods: {
    async adicionarPessoa() {
      try {
        this.pessoa.data_nascimento = this.formatarData(this.pessoa.data_nascimento);
        this.pessoa.data_admissao = this.formatarData(this.pessoa.data_admissao);
        const response = await axios.post(`${urlAPI}/pessoas`, this.pessoa);
        if (response.status === 200) { 
            this.$router.push('/');
            this.feedbackMessage = 'Pessoa adicionada com sucesso.';
            this.pessoa = {
              nome: '',
              rg: '',
              cpf: '',
              data_nascimento: '',
              data_admissao: '',
              funcao: '',
            };
          } else {
            this.feedbackMessage = 'Erro ao adicionar a pessoa. Tente novamente.';
          }
        } catch (error) {
          this.feedbackMessage = 'Erro ao adicionar a pessoa. Tente novamente.';
        }
       
    },
    formatarData(data) {
      const date = new Date(data);
      if (!isNaN(date)) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      return data;
    },
  },
};
</script>

<style>
@import './styles.css';
</style>
