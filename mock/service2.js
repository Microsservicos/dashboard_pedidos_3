// mock/service2.js
exports.verificarDisponibilidadePratos = (pratos) => {
    const pratosDisponiveis = [101, 102, 201, 202, 203];
  
    return pratos.every(item => pratosDisponiveis.includes(item.pratoId));
  };
  