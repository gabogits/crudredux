import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  COMENZAR_DESCARGA_EXITO,
  COMENZAR_DESCARGA_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR,
} from "../types";
//cada reducer tiene su propio state

const initialState = {
  productos: [],
  error: false,
  loading: false,
  productoEliminar: null,
  productoEditar: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_PRODUCTOS:
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        loading: action.payload,
      };
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        loading: false,
        productos: [...state.productos, action.payload],
      };
    case AGREGAR_PRODUCTO_ERROR:
    case COMENZAR_DESCARGA_ERROR:
    case PRODUCTO_ELIMINADO_ERROR:
      case PRODUCTO_EDITADO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        productoEliminar: null,
      };
    case COMENZAR_DESCARGA_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        productos: action.payload,
      };
    case OBTENER_PRODUCTO_ELIMINAR:
      return {
        ...state,
        productoEliminar: action.payload,
      };
    case PRODUCTO_ELIMINADO_EXITO:
      return {
        ...state,
        productos: state.productos.filter(
          (producto) => producto.id !== state.productoEliminar
        ),
        productoEliminar: null,
      };
      case OBTENER_PRODUCTO_EDITAR: 
      return {
        ...state,
       productoEditar: action.payload,
      };
      case PRODUCTO_EDITADO_EXITO:
        return {
          ...state,
         productoEditar: null,
         productos: state.productos.map(
          (producto) => producto.id === action.payload.id ? producto = action.payload : producto
        ),
        };
    default:
      return state;
  }
}
