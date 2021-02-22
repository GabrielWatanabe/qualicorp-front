<template>
  <div v-if="!updateClient" class="edit-form">
    <h4>Cliente</h4>
    <form>
      <div class="form-group">
        <label for="nome">Nome</label>
        <input type="text" class="form-control" id="nome"
          v-model="currentCliente.nome"
        />
      </div>
      <div class="form-group">
        <label for="cpf">CPF</label>
        <input type="text" class="form-control" id="cpf"
          v-model="currentCliente.cpf"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" class="form-control" id="email"
          v-model="currentCliente.email"
        />
      </div>
      <div class="form-group">
        <label for="telefone">Telefone</label>
        <input type="text" class="form-control" id="telefone"
          v-model="currentCliente.telefone"
        />
      </div>
      <div class="form-group">
        <label for="endereco">Endereço</label>
        <input type="text" class="form-control" id="endereco"
          v-model="currentCliente.endereco"
        />
      </div>
      <div class="form-group">
        <label for="data_nascimento">Data de Nascimento</label>
        <input type="text" class="form-control" id="data_nascimento"
          v-model="currentCliente.dataNascimento"
        />
      </div>
    </form>

    <button class="badge badge-danger mr-2"
      @click="deleteCliente"
    >
      Excluir
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateCliente"
    >
      Atualizar
    </button>
  </div>

  <div v-else>
    <br />
    <p>Cliente {{currentCliente.nome}} atualizado com sucesso</p>
  </div>
</template>

<script>
import ClienteDataService from "../serviços/ClienteDataService";

export default {
  name: "cliente",
  data() {
    return {
      currentCliente: null,
      message: '',
      updateClient: false
    };
  },
  methods: {
    getCliente(id) {
      ClienteDataService.get(id)
        .then(response => {
          this.currentCliente = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },


    updateCliente() {
      ClienteDataService.update(this.currentCliente.id, this.currentCliente)
        .then(response => {
          console.log(response.data);
          this.message = 'The cliente was updated successfully!';
          this.updateClient = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteCliente() {
      ClienteDataService.delete(this.currentCliente.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "clientes" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getCliente(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>