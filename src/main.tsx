import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Carrinho from './componentes/Carrinho'
import { type PedidoProps} from "./componentes/Pedido"
import './index.css'

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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  
  <React.StrictMode>
    <Carrinho {...props}/>
  </React.StrictMode>,
)
