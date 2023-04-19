import './Frete.css'
import { useState } from 'react'

export type FreteProps = {
    acaoOnUpdate: (valor: number, validado: boolean, cep?: string|undefined) => void
}

export default function Frete(props: FreteProps){

    const [estado_valorFrete, setEstado_valorFrete] = useState<string | number>("-")
    const [estado_cep, setEstado_cep] = useState("")
    const [estado_msgErro, setEstado_msgErro] = useState("")
    const [estado_cidade, setEstado_cidade] = useState("")
    const [estado_validado, setEstado_validado] = useState(false)

    let freteCalculado:number

    function validarCEP(evento:any){
        let cep = evento.target.value.trim()
        cep = cep.replace("-","")
        setEstado_cep(cep)
        if(isNaN(cep)){
            setEstado_msgErro("Formato de CEP inválido")   
            setEstado_cidade("")
            setEstado_validado(false)
            props.acaoOnUpdate(0, false)        
            return
        }else{
            setEstado_msgErro("")
        }

        if(cep.length<5){
            return
        }

        if(cep.length>=6){
            let formatado = cep.slice(0, 5) + "-" + cep.slice(5);
            evento.target.value = formatado
            setEstado_cep(formatado)
        }
    }

    async function consultarCEP() {

        let cep: any = estado_cep;
        cep = cep.replace("-","")
        if(cep.length==8){
            if(isNaN(cep)){
                setEstado_msgErro("Formato de CEP inválido")
                setEstado_validado(false)
                props.acaoOnUpdate(0, false) 
                setEstado_cidade("")
                return
            }else{
                setEstado_msgErro("")
            }

            let api: string
            api = "https://viacep.com.br/ws/"+cep+"/json/"
            let response = await fetch(api)
            let json = await response.json();

            if(json.uf != null){
                setEstado_msgErro("")
                setEstado_cidade(json.localidade+"-"+json.uf)
                calcularFrete(json.uf)
                setEstado_validado(true)
                props.acaoOnUpdate(freteCalculado, true,cep)

            } else{
                setEstado_msgErro("CEP não encontrado")
                setEstado_validado(false)
                props.acaoOnUpdate(0, false) 
                setEstado_cidade("")
            }            
        }else{
            setEstado_msgErro("Formato de CEP inválido")
            setEstado_validado(false)
            props.acaoOnUpdate(0, false) 
            setEstado_cidade("")
        }
    }

    function calcularFrete(estado: string){

        switch (estado){
            case 'RN': 
            case 'PB':
            case 'CE': 
                freteCalculado = 0
                break
            case 'PI':
            case 'MA':
            case 'BA':
            case 'SE':
            case 'AL':
            case 'PE': 
                freteCalculado = 10
                break
            case 'TO':
            case 'PA':
            case 'AP':
            case 'AM':
            case 'RR':
            case 'RO':
            case 'AC':
                freteCalculado = 15
                break
            default: freteCalculado = 300
        }
        setEstado_valorFrete(freteCalculado)

    }

    return <div className="frete">
        <h6>Frete</h6>
        <div className="cepFrete">
            <p>CEP</p>
            <form>
                <input type="text" value={estado_cep} onChange={e=>validarCEP(e)} maxLength={9} placeholder="59000-180" required pattern= "\d{5}-?\d{3}"></input>
                <button type="button" onClick={consultarCEP}>Calcular</button>
            </form>
            <p id="freteCalculado">R$ { estado_validado? estado_valorFrete: "-" }</p>
        </div>
        { estado_msgErro != ""? <p id="msgCep">{ estado_msgErro }</p>: undefined}

        { estado_cidade != ""? <p id='cidadeFrete'>{ estado_cidade }</p> : undefined}
    </div>

}