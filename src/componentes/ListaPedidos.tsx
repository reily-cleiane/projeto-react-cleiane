import Pedido, {type PedidoProps} from './Pedido'
import '../Estilo.css'
import './ListaPedidos.css'
import { useContext } from 'react'
import { ListaPedidosContext } from './ListaPedidosContext'

export default function ListaPedidos(props: PedidoProps[]) {

    const ctx = useContext(ListaPedidosContext)

    function handlePedidoRemove(id: number){

        let listaAtualizada : any
        if(!Array.isArray(ctx.lista)){
            let array : PedidoProps[] = Object.values(ctx.lista)
            listaAtualizada = array.filter((elemento) => elemento.item.id !== id)
        }else{
            listaAtualizada = ctx.lista.filter((elemento) => elemento.item.id !== id)
        }

        ctx.alterarListaPedidosContext(listaAtualizada)
    }

    function handlePedidoUpdate(id: number, quantidade: number){

        let listaAtualizada : PedidoProps[]
        if(!Array.isArray(ctx.lista)){
            let array : PedidoProps[] = Object.values(ctx.lista)
            listaAtualizada = array
        }else{
            listaAtualizada = ctx.lista;
        }
        let indiceAlterado = listaAtualizada.findIndex((elemento => elemento.item.id == id));

        listaAtualizada[indiceAlterado].quantidade = quantidade
        ctx.alterarListaPedidosContext(listaAtualizada)
    }

    let lista = ctx.lista

    if(!Array.isArray(lista)){
        lista = Object.values(ctx.lista)
    }
    //let lista = Object.values(props)
    lista.forEach(function (pedido) {
        pedido.acaoOnRemove = (idItem: number) => handlePedidoRemove(idItem)
        pedido.acaoOnUpdate = (idItem: number, quantidade:number) => handlePedidoUpdate(idItem,quantidade)
    });
    
    const listaProdutos = lista.map((pedido) => <li key={pedido.item.id}><Pedido {...pedido}  /></li>)

    return <ul className="listaPedidos">
        {listaProdutos}
    </ul>
   
}