import Item, {type ItemProps} from './Item'
import React, { useState } from "react";
import './Pedido.css'

export type PedidoProps = {
    item: ItemProps
    quantidade: number
    //DÚVIDA: é possível definir que por padrão seja uma função () => {}
    acaoOnUpdate?: (id: number, quantidade: number) => void
    acaoOnRemove?: (id: number) => void
}

export default function Pedido(props: PedidoProps) {

    const [estado_quantidade, setEstado_quantidade] = useState(props.quantidade);
    const [estado_valorPedido, setEstado_valorPedido] = useState(props.item.preco*props.quantidade);

    function handleQuantidade(event: any) {
        setEstado_quantidade(event.target.value);
        setEstado_valorPedido(event.target.value*props.item.preco)
        if(props.acaoOnUpdate && event.target.value.trim().length != 0 && parseInt(event.target.value)>0){
            props.acaoOnUpdate({...props.item}.id, event.target.value) 
        }
          
    }

    function validarQuantidade(evento: any){
        if(parseInt(evento.target.value)<=0 || evento.target.value.trim().length == 0){
            evento.target.value = 1
            handleQuantidade(evento)         
        }
    }

    return <div className="pedido">
        <Item {...props.item}/>
        <input className="quantidade" onKeyUp={(evento)=> validarQuantidade(evento)} type="number" onInput={handleQuantidade} min="1" value= { estado_quantidade }></input>
        <p className="precoPedido">R$ { estado_valorPedido.toFixed(2) }</p>
        <img className="lixeira" src="imagens/design/lixeira.png" onClick={()=>props.acaoOnRemove? props.acaoOnRemove({...props.item}.id): null}></img>
    </div>
   
}