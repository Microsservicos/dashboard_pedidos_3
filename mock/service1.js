// mock/service1.js
exports.validarClienteERestaurante = (clienteId, restauranteId) => {
    const clientes = [1, 2, 3];
    const restaurantes = [1, 2];
  
    const clienteValido = clientes.includes(clienteId);
    const restauranteValido = restaurantes.includes(restauranteId);
  
    return clienteValido && restauranteValido;
  };
  