import Frete, {FreteProps} from './Frete'
import { useState, useContext } from 'react'
import './Resumo.css'
import { ListaPedidosContext } from './ListaPedidosContext'
import { PedidoProps } from './Pedido'

export type ResumoProps = {
    acaoOnClick: (evento:any, valor: number, cep: string) => void
}

export default function Resumo(props: ResumoProps) {
    let qtdItens : number = 0
    let valorItens : number = 0.0
    let valorTotal : number = 0.0

    const ctx = useContext(ListaPedidosContext)

    let lista : any

    if(!Array.isArray(ctx.lista)){       
        lista = Object.values(ctx.lista)
    }else{
        lista = ctx.lista
    }

    lista.forEach(function (pedido: PedidoProps)  {
        qtdItens+= parseInt(pedido.quantidade.toString())
        valorItens +=pedido.quantidade*pedido.item.preco
    });

    //useState retorna um array com dois valores, o primeiro é o próprio valor, o segundo é uma função para alterá-lo
    //É possível colocar undefined como valor inicial, ficaria: const [estado_valorFrete, setEstado_valorFrete] = useState<string | undefined>(undefined)
    const [estado_valorFrete, setEstado_valorFrete] = useState<string | number>("-")
    const [estado_freteValidado, setEstado_freteValidado] = useState(false)
    const [estado_cep, setEstado_cep] = useState("")

    function handleFreteUpdate(valor:number, validado:boolean, cep:string=""){

        //Não altera a variável imediatamente, é apenas um agendamento
        if(validado){
            setEstado_valorFrete(valor.toFixed(2))
            setEstado_freteValidado(true)
            setEstado_cep(cep)
        }else{
            setEstado_freteValidado(false)
        }

    }
    valorTotal = valorItens+ (estado_valorFrete != "-"?parseInt(estado_valorFrete.toString()): 0)
    
    return <div className="resumo">
        
        <h2>Resumo</h2>
        <Frete acaoOnUpdate={(valor:number, validado:boolean, cep:string="") => handleFreteUpdate(valor, validado,cep)}/>
        <div className='resumoItens'>
            <h6>Itens ({ qtdItens })</h6>
            <p>R$ {valorItens.toFixed(2)}</p>
        </div>
        <div className='resumoFrete'>
            <h6>Frete</h6>
            <p>R$ {estado_freteValidado? estado_valorFrete : "-"}</p>
        </div>
        <div className='resumoTotal'>
            <h6>Total</h6>
            <p>R$ {valorTotal.toFixed(2)}</p>
        </div>
        <button disabled={!estado_freteValidado} id="fecharPedido" type="submit" onClick={(e) => props.acaoOnClick(e, valorTotal, estado_cep)}>Fechar Pedido</button>

    </div>
   
}