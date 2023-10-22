<template>
  <div>
    <header>
      <h1>Lista de pessoas</h1>
    </header>
    <main>
      <Modal :showModal="mostrarModal" @fechar-modal="fecharModal" title="Visualização completa">
        <div v-if="pessoaSelecionada" class="modal-content">
          <!-- Detalhes da pessoa selecionada -->
          <h2>Detalhes da Pessoa</h2>
          <p class="detail-item">Nome: {{ pessoaSelecionada.nome }}</p>
          <p class="detail-item">RG: {{ pessoaSelecionada.rg }}</p>
          <p class="detail-item">CPF: {{ pessoaSelecionada.cpf }}</p>
          <p class="detail-item">Data de Nascimento: {{ formatarData(pessoaSelecionada.data_nascimento) }}</p>
          <p class="detail-item">Data de Admissão: {{ formatarData(pessoaSelecionada.data_admissao) }}</p>
          <p class="detail-item">Função: {{ pessoaSelecionada.funcao }}</p>
          <span>
            <p>Opções:</p>
            <div class="action-button">
              <router-link :to="{ name: 'editar', params: { id: pessoaSelecionada.id } }">
                <i class="bi bi-pencil icon icon-edit"></i>
              </router-link>
              <i @click="excluirPessoa(pessoaSelecionada.id)" class="bi bi-trash icon icon-delete"></i>
            </div>
          </span>
        </div>
      </Modal>

      <!-- Tabela de todos os registros -->
      <div class="container-table">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data de Admissão</th>
              <th>Opções</th>
              <th>Datalhes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pessoa, index) in pessoas" :key="index">
              <td>{{ pessoa.nome.split(' ')[0] }}</td>
              <td>{{ formatarData(pessoa.data_admissao) }}</td>
              <td>
                <div class="action-button">
                  <router-link :to="{ name: 'editar', params: { id: pessoa.id } }">
                    <i class="bi bi-pencil icon icon-edit"></i>
                  </router-link>
                  <i @click="excluirPessoa(pessoa.id)" class="bi bi-trash icon icon-delete"></i>
                </div>
              </td>
              <td><button class="show-button" @click="selecionarPessoa(pessoa)">VER MAIS</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <router-link to="/adicionar">
        <button class="add-button">Adicionar</button>
      </router-link>
    </main>

  </div>
</template>
<script>
import '../../styles/global.css'
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import urlAPI from '../../utils/urlAPI'
import Modal from "../../components/Modal/ModalComponent";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      pessoas: [],
      mostrarModal: false,
      pessoaSelecionada: null,
    };
  },
  created() {
    axios
      .get(`${urlAPI}/pessoas`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          this.pessoas = response.data.map((pessoa) => ({
            ...pessoa,
          }));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },

  methods: {
    selecionarPessoa(pessoa) {
      this.pessoaSelecionada = pessoa;
      this.mostrarModal = true;
    },
    formatarData(data) {
      if (data) {
        const date = new Date(data);
        if (!isNaN(date)) {
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        }
      }
      return 'Data inválida';
    },
    async excluirPessoa(pessoaId) {
      try {
        const response = await axios.delete(`${urlAPI}/pessoa/${pessoaId}`);
        if (response.status === 200) {
          this.pessoas = this.pessoas.filter((pessoa) => pessoa.id !== pessoaId);
          this.fecharModal();
          console.log('Pessoa excluída com sucesso');
        } else {
          console.log('Erro ao excluir a pessoa. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro ao excluir a pessoa:', error);
      }
    },
    exibirModal(id) {
      this.mostrarModal = true;
      this.idPessoa = id;
    },
    fecharModal() {
      this.pessoaSelecionada = null;
      this.mostrarModal = false;
      this.idPessoa = false;
    },
  },
};
</script>

<style>
@import './style.css';
</style>