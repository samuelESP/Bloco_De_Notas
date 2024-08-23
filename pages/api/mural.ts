import { validarTokenJWT } from "@/middleware/validarJWT";
import { respostaPadraoMsg } from "@/types/respostaPadraoMsg";
import type { NextApiRequest, NextApiResponse } from "next";


const endpointMural =  (req:NextApiRequest, res:NextApiResponse<respostaPadraoMsg>) =>{
    return res.status(200).json({msg:'Usuario autenticado com sucesso'})
}

export default validarTokenJWT(endpointMural);