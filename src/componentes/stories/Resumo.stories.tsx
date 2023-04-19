import type { Story } from "@ladle/react"
import Resumo  from "../Resumo"

export const TesteResumo: Story = () => {

    function handleFecharPedido(evento : any, valorTotal: number, cep:string){
        evento.preventDefault()
        let texto : string = ""
        texto = "Obrigada por comprar com a gente!"
        texto += "No valor total de "+ valorTotal.toFixed(2) + " para o cep " + cep
        alert(texto)
    }

    return <Resumo {...{acaoOnClick:handleFecharPedido}}/>
}