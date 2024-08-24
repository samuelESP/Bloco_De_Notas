import { conetarBD } from "@/middleware/conetarBD";
import { validarTokenJWT } from "@/middleware/validarJWT";
import { respostaPadraoMsg } from "@/types/respostaPadraoMsg";
import type { NextApiRequest, NextApiResponse } from "next";
import type { notasRequisicao } from "@/types/notasRequisicao";
import { NoteModel } from "@/models/NoteModel";
import { UserModel } from "@/models/UserModel";
import moment from "moment";


let data = moment();
let dataFormatada = data.format('DD/MM/YYYY, HH:mm');

const endpointNote =  async (req:any, res:NextApiResponse<respostaPadraoMsg>) =>{

    if(req.method === "POST"){

        const {userId} = req.query;

        const usuario = await UserModel.findById(userId);
        
        if(!usuario){
            return res.status(400).json({msg: "Usuário não encontrado"})
        }

        const {nameNote, anotacao} = req.body as notasRequisicao;
    
        if(!nameNote){
            return res.status(400).json({msg: "Nome obrigatorio"})
        }
        if(!anotacao){
            return res.status(400).json({msg: "Anotação obrigatoria"})
        }

        const nota = {
            idUser: usuario._id,
            data: dataFormatada,
            nameNote: nameNote,
            anotacao: anotacao
        }

        await NoteModel.create(nota)
        return res.status(200).json({msg: "Nota criada com sucesso"})

    }
    return res.status(405).json({erro: "Método informado não válido" })
}

export default validarTokenJWT(conetarBD(endpointNote));