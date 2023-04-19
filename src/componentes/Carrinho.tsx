import Resumo from './Resumo'
import ListaPedidos from './ListaPedidos'
import { type PedidoProps} from "./Pedido"
import { ReactNode, useContext, useState } from 'react'
import { ListaPedidosContext } from './ListaPedidosContext'
import './Carrinho.css'

export default function Carrinho(props: PedidoProps[]) {
    let qtdItens : number = 0;
    let lista = Object.values(props)
    const [estado_lista, setEstado_lista] = useState(lista)

    lista.forEach(function (pedido) {
        qtdItens+= pedido.quantidade
    });

    const [estado_qtdItens, setEstado_qtdItens] = useState(qtdItens)

    function handleUpdateLista(lista:PedidoProps[]){
        setEstado_lista(({...lista}))
        qtdItens = 0
        lista.forEach(function (pedido) {
            qtdItens+= parseInt(pedido.quantidade.toString())
        });
        setEstado_qtdItens(qtdItens)
    }

    function handleFecharPedido(evento : any, valorTotal: number, cep:string){
        evento.preventDefault()
        let texto : string = ""
        texto = "Obrigada por comprar com a gente!\n Nós enviaremos:\n"
        lista.forEach(function (pedido) {
            texto += pedido.quantidade + " " +pedido.item.nome +"\n"
        });
        texto += "No valor total de "+ valorTotal.toFixed(2) + " para o cep " + cep

        alert(texto)
    }

    let conteudo: ReactNode = <>
        
        <h2>Você tem {estado_qtdItens} {estado_qtdItens == 1? "item": "itens"}</h2>
        <div className='pedidoResumo'>
            <ListaPedidos {...props}/>
            <Resumo {...{acaoOnClick:handleFecharPedido}}/>
        </div>
    </>

    return  <ListaPedidosContext.Provider value={{lista:estado_lista,alterarListaPedidosContext:handleUpdateLista}}>
        <div className="pagina">
            <h1>Carrinho de compras</h1>
            {estado_qtdItens == 0 ? <h2>O carrinho de compras está vazio!</h2> :conteudo  } 
        </div>

    </ListaPedidosContext.Provider>
   
}