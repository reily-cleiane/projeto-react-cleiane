import type { Story } from "@ladle/react"
import Item, { type ItemProps} from "../Item"

export const TesteItem: Story = () => {
    const props: ItemProps = {
        id: 1,
        nome: 'Pizza de peito de peru',
        descricao: 'Queijo mussarela, peito de peru, etc',
        imagem: 'imagens/pizza1.jpg',
        preco: 75.65
    }
    return <Item {...props}/>
}