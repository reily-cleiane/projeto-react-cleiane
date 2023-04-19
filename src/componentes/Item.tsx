import './Item.css'

export type ItemProps = {
    id: number
    nome: string
    descricao: string
    imagem: string
    preco: number
}

function Item(props: ItemProps) {
    return <div className='item'>
        <img src={ props.imagem }></img>
        <div className="informacaoItem">
            <p className="nomeItem">{ props.nome }</p>
            <p className="descricaoItem">{ props.descricao }</p>
            <p className="precoItem">R$ { props.preco }</p>
        </div>
    </div>
}

export default Item