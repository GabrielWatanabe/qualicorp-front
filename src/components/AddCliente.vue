<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="nome">Nome</label>
        <input
          type="text"
          class="form-control"
          id="nome"
          required
          v-model="cliente.nome"
          name="nome"
        />
      </div>

      <div class="form-group">
        <label for="cpf">CPF</label>
        <input
          class="form-control"
          id="cpf"
          required
          v-model="cliente.cpf"
          name="cpf"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          class="form-control"
          id="email"
          required
          v-model="cliente.email"
          name="email"
        />
      </div>

      <div class="form-group">
        <label for="telefone">Telefone</label>
        <input
          class="form-control"
          id="telefone"
          required
          v-model="cliente.telefone"
          name="telefone"
        />
      </div>

      <div class="form-group">
        <label for="endereco">Endereço</label>
        <input
          class="form-control"
          id="endereco"
          required
          v-model="cliente.endereco"
          name="endereco"
        />
      </div>

      <div class="form-group">
        <label for="data_nascimento">Data de Nascimento</label>
        <input
          class="form-control"
          id="data_nascimento"
          required
          v-model="cliente.dataNascimento"
          name="data_nascimento"
        />
      </div>

      <button @click="saveCliente" class="btn btn-success">Criar</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newCliente">Adicionar</button>
    </div>
  </div>
</template>

<script>
import ClienteDataService from "../serviços/ClienteDataService";
import validator from "cpf-cnpj-validator";


export default {
  name: "add-cliente",
  data() {
    return {
      cliente: {
        id: null,
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
        endereco: "",
        dataNascimento: "",

      },
      submitted: false
    };
  },
  methods: {
    saveCliente() {
        const Joi = require('@hapi/joi').extend(validator)
 
        const cpfSchema = Joi.document().cpf();
        const cpfValid = cpfSchema.validate(this.cliente.cpf);

        if(!cpfValid) {
           return alert('CPF is not valid');
        }

      var data = {
        nome: this.cliente.nome,
        cpf: this.cliente.cpf,
        email: this.cliente.email,
        telefone: this.cliente.telefone,
        endereco: this.cliente.endereco,
        dataNascimento: this.cliente.dataNascimento,
      };

      ClienteDataService.create(data)
        .then(response => {
          this.cliente.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newCliente() {
      this.submitted = false;
      this.cliente = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
.format-select {
    margin-top: 0 im !important
}
</style>