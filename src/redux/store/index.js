import { createStore } from "redux";

let value;
let canciones;
let generos;
let cancionActual;

const reducers = () => {
  return {};
};
const getCancion = () => {
  return value;
};
const setCancion = (cancion) => {
  value = cancion.cancion;
  cancionActual = cancion;
};

const setCanciones = (can) => {
  canciones = can;
};

const getGeneros = () => {
  return generos;
};

const setGeneros = (gen) => {
  generos = gen;
};

const getCanciones = () => {
  return canciones;
};

const getCancionActual = () => {
  return cancionActual;
};

const setCancionActual = (i) => {
  if (i > 0) {
    //Avanzando
    let nuevaCancion = cancionActual.id + i;
    if (nuevaCancion >= 0 && nuevaCancion !== canciones.length) {
      cancionActual.id = nuevaCancion;
      cancionActual.cancion = canciones[cancionActual.id];
    }
    if (nuevaCancion === canciones.length) {
      cancionActual.id = 0;
      cancionActual.cancion = canciones[cancionActual.id];
    }
  } else {
    //Retrocediendo
    let nuevaCancion = cancionActual.id + i;
    cancionActual.id = nuevaCancion;
    if (cancionActual.id < 0) {
      cancionActual.id = canciones.length - 1;
    }
    cancionActual.cancion = canciones[cancionActual.id];
  }
};

export default () => {
  return {
    ...createStore(reducers),
  };
};

export { getCancion };
export { setCancion };
export { getCanciones };
export { setCanciones };
export { getGeneros };
export { setGeneros };
export { getCancionActual };
export { setCancionActual };
