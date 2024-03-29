import {createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import axios from "axios";
import { config } from "../config/config";

const estadoInicial = {
  cargando: true,
  editado: false,
  novedades: [],
  novedadesUsuario:[],
  novedad: {},
};

const urlBaseNovedad = axios.create({

  baseURL: `http://${config.localhost}:8080/api/novedades`, //192.168.0.92//192.168.1.36

});

export const crearNovedad = createAsyncThunk(
  "CREAR_NOVEDAD",
  async (infoNovedad) => {
    try {
      await urlBaseNovedad.post("/", infoNovedad);
      return "Novedad creada con éxito!";
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const traerUnaNovedad = createAsyncThunk(
  "TRAER_UNA_NOVEDAD",
  async (idNovedad) => {
    try {
      const novedad = await urlBaseNovedad.get(`/una/${idNovedad}`);
      return novedad.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const traerTodasNovedades = createAsyncThunk(
  "TRAER_TODAS_NOVEDADES",
  async (usuario) => {
    if (usuario.tipo) {
      try {
        const novedades = await urlBaseNovedad.get(`all/admin`);
        return novedades.data;
      } catch (error) {
        throw new Error(error);
      }
    } else throw new Error("Acceso denegado!");
  }
);

export const traerNovedadesUsuario = createAsyncThunk(
  "TRAER_USUARIO_NOVEDADES",
  async (usuarioId) => {
    try {
      const novedades = await urlBaseNovedad.get(`/${usuarioId}`);
      return novedades.data.novedades;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const actualizarNovedad = createAsyncThunk(
  "ACTUALIZAR_NOVEDAD",
  async (update) => {
    if (update.usuario.tipo) {
      try {
        await urlBaseNovedad.put(`/${update.novedadId}`, update.estado);
        return "Novedad actualizada con éxito";
      } catch (error) {
        throw new Error(error);
      }
    } else throw new Error("Acceso denegado!");
  }
);
const novedadReducer = createReducer(estadoInicial, {
  [crearNovedad.pending]: (estado) => {
    estado.cargando = true;
  },
  [crearNovedad.fulfilled]: (estado, accion) => {
    estado.cargando = false;
    Alert.alert("Novedades", accion.payload, [{ text: "Entiendo" }], {
      cancelable: true,
    });
  },
  [crearNovedad.rejected]: (estado) => {
    estado.cargando = false;
  },
  [traerNovedadesUsuario.pending]: (estado) => {
    estado.cargando = true;
  },
  [traerNovedadesUsuario.fulfilled]: (estado, accion) => {
    estado.cargando = false;
    estado.novedadesUsuario = accion.payload;
  },
  [traerNovedadesUsuario.rejected]: (estado) => {
    estado.cargando = false;
  },
  [traerTodasNovedades.pending]: (estado) => {
    estado.cargando = true;
  },
  [traerTodasNovedades.fulfilled]: (estado, accion) => {
    estado.cargando = false;
    estado.novedades = accion.payload;
  },
  [traerTodasNovedades.rejected]: (estado) => {
    estado.cargando = false;
    throw new Error("Acceso denegado!");
  },
  [actualizarNovedad.pending]: (estado) => {
    estado.editado = false;
  },
  [actualizarNovedad.fulfilled]: (estado, accion) => {
    estado.editado = true;
    Alert.alert("Novedades", accion.payload, [{ text: "Entiendo" }], {
      cancelable: true,
    });
  },
  [actualizarNovedad.rejected]: (estado) => {
    estado.editado = false;
    throw new Error("Acceso denegado!");
  },
  [traerUnaNovedad.pending]: (estado) => {
    estado.cargando = true;
  },
  [traerUnaNovedad.fulfilled]: (estado, accion) => {
    estado.cargando = false;
    estado.novedad = accion.payload;
  },
  [traerUnaNovedad.rejected]: (estado) => {
    estado.cargando = false;
    throw new Error("Ha ocurrido un error al intentar traer su novedad");
  },
});

export default novedadReducer;
