import type { Story } from "@ladle/react"
import { type PedidoProps} from "../Pedido"
import ListaPedidos from "../ListaPedidos"
import { useContext, useState } from 'react'
import { ListaPedidosContext } from '../ListaPedidosContext'

export const TesteListaPedido: Story = () => {

    const pedido1: PedidoProps = {
        item: {
            id: 1,
            nome: 'Pizza de peito de peru',
            descricao: 'Queijo mussarela, peito de peru, etc',
            imagem: 'imagens/pizza1.jpg',
            preco: 75.65
        },
        quantidade: 4
    }

    const pedido2: PedidoProps = {
        item: {
            id: 2,
            nome: 'Pizza de frango',
            descricao: 'Queijo mussarela, frango, etc',
            imagem: 'imagens/pizza1.jpg',
            preco: 60.00
        },
        quantidade: 1
    }

    const pedido3: PedidoProps = {
        item: {
            id: 3,
            nome: 'Pizza de carne',
            descricao: 'Queijo mussarela, carne, etc',
            imagem: 'imagens/pizza1.jpg',
            preco: 64.18
        },
        quantidade: 1
    }

    let props: PedidoProps[] = [pedido1,pedido2,pedido3]

    const [estado_lista, setEstado_lista] = useState(props)

    function handleUpdateLista(lista:any){
        setEstado_lista(({...lista}))
    }

    return <ListaPedidosContext.Provider value={{lista:estado_lista,alterarListaPedidosContext:handleUpdateLista}}>
        <ListaPedidos {...props}/>
    </ListaPedidosContext.Provider>
}