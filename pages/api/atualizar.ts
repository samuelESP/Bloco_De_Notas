import type { NextApiRequest, NextApiResponse } from "next";
import { conetarBD } from "@/middleware/conetarBD";
import { validarTokenJWT } from "@/middleware/validarJWT";
import { respostaPadraoMsg } from "@/types/respostaPadraoMsg";
import { NoteModel } from "@/models/NoteModel";
import moment from "moment";


let data = moment();
let dataFormatada = data.format('DD/MM/YYYY, HH:mm');

const atualizar = async (req: NextApiRequest, res: NextApiResponse<respostaPadraoMsg>) => {

    try {
        if (req.method === "PUT") {
    
            const { notaId } = req?.query;
    
            const nota = await NoteModel.findOne({ _id: notaId });
            
            if (!nota) {
                return res.status(404).json({ erro: 'Nota não encontrada' });
            }
    
            if (!req.body.nameNote && !req.body.anotacao) {
                return res.status(400).json({ erro: "É necessário fornecer ao menos um campo para atualizar" });
            }
    
            const notaAtualizada = {
                idUser: nota.idUser,
                data: dataFormatada,
                nameNote: req.body.nameNote,
                anotacao:req.body.anotacao
            }
    
            await NoteModel.updateOne(nota,notaAtualizada)
    
            return res.status(200).json({ msg: "Dados atualizados com sucesso" });
    
        }
        
        return res.status(405).json({ erro: "Método inválido" })
    } catch (e) {
        console.log(e);
        return res.status(500).json({erro: "Erro ao tentar atualizar nota"})
    }

}

export default validarTokenJWT(conetarBD(atualizar))