import { Dispatch, createContext } from "react";
import { PedidoProps } from "./Pedido";

type ListaPedidosContextType = {
    lista: PedidoProps[]
    alterarListaPedidosContext: Dispatch<any>
}

export const ListaPedidosContext = createContext<ListaPedidosContextType>({
    lista: [],
    alterarListaPedidosContext: v => {}
})