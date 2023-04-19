import type { Story } from "@ladle/react"
import Pedido, { type PedidoProps} from "../Pedido"
import { type ItemProps} from "../Item"

export const TestePedido: Story = () => {

    const item: ItemProps = {
        id: 1,
        nome: 'Pizza de peito de peru',
        descricao: 'Queijo mussarela, peito de peru, etc',
        imagem: 'imagens/pizza1.jpg',
        preco: 75.65
    }

    const props: PedidoProps= {
        item: item,
        quantidade: 4
        
    }
    return <Pedido {...props}/>
}