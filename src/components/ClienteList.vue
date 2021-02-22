<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Procurar pelo nome"
          v-model="searchNome"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="page = 1; retrieveClientesPorNome();"
          >
            Procurar
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        prev-text="Prev"
        next-text="Next"
        @change="handlePageChange"
      ></b-pagination>
    </div>

    <div class="col-md-6">
      <h4>Lista de Clientes</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(cliente, index) in clientes"
          :key="index"
          @click="setActiveCliente(cliente, index)"
        >
          {{ cliente.nome }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllClientes">
        Remover Todos
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentCliente">
        <h4>Cliente</h4>
        <div>
          <label><strong>Nome:</strong></label> {{ currentCliente.nome }}
        </div>
        <div>
          <label><strong>CPF:</strong></label> {{ currentCliente.cpf }}
        </div>
        <div>
          <label><strong>Email:</strong></label> {{ currentCliente.email }}
        </div>
        <div>
          <label><strong>Telefone:</strong></label> {{ currentCliente.telefone }}
        </div>
        <div>
          <label><strong>Endereço:</strong></label> {{ currentCliente.endereco }}
        </div>
        <div>
          <label><strong>Data de Nascimento:</strong></label> {{ currentCliente.dataNascimento }}
        </div>

        <a class="badge badge-warning"
          :href="'/clientes/' + currentCliente.id"
        >
          Editar
        </a>
      </div>
      <div v-else>

        <br />
        Cliente {{ currentCliente.nome }} atualizado com sucesso
        <!-- <p></p> -->
        <!-- <p>Por favor clique em um Cliente...</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import ClienteDataService from "../serviços/ClienteDataService";

export default {
  name: "clientes-list",
  data() {
    return {
      clientes: [],
      currentCliente: null,
      currentIndex: -1,
      searchNome: "",

      page: 1,
      count: 0,
      pageSize: 3,

      pageSizes: [3, 6, 9],
    };
  },
  methods: {
    getRequestParams(searchNome, page, pageSize) {
      let params = {};

      if (searchNome) {
        params["nome"] = searchNome;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

    retrieveClientesPorNome() {
      ClienteDataService.findByNome(this.searchNome)
        .then(response => {
          const { clientes, totalItems } = response.data;
          this.clientes = clientes;
          this.count = totalItems;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    retrieveClientes() {
       const params = this.getRequestParams(
        this.searchNome,
        this.page,
        this.pageSize
      );

      ClienteDataService.getAll(params)
        .then(response => {
          const { clientes, totalItems } = response.data;
          this.clientes = clientes;
          this.count = totalItems;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

     handlePageChange(value) {
      this.page = value;
      this.retrieveClientes();
    },

    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveClientes();
    },

    refreshList() {
      this.retrieveClientes();
      this.currentCliente = null;
      this.currentIndex = -1;
    },

    setActiveCliente(cliente, index) {
      this.currentCliente = cliente;
      this.currentIndex = index;
    },

    removeAllClientes() {
      ClienteDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveClientes();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>