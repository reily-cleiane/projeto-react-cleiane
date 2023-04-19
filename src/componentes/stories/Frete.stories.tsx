import type { Story } from "@ladle/react"
import Frete from "../Frete"
import { useContext, useState } from 'react'

export const TesteFrete: Story = () => {


    function handleFreteUpdate(valor:number, validado:boolean, cep:string=""){
        console.log("valor: ", valor, " validado: ", validado, " cep: ", cep)
    }

    return <Frete acaoOnUpdate={(valor:number, validado:boolean, cep:string="") => handleFreteUpdate(valor, validado,cep)}/>
}