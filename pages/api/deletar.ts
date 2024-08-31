import type { NextApiRequest, NextApiResponse } from "next";
import { respostaPadraoMsg } from "@/types/respostaPadraoMsg";
import { conetarBD } from "@/middleware/conetarBD";
import { validarTokenJWT } from "@/middleware/validarJWT";
import { UserModel } from "@/models/UserModel";
import { NoteModel } from "@/models/NoteModel";
import { CORS } from "@/middleware/CORS";

const endpointDelete = async (req: NextApiRequest, res: NextApiResponse<respostaPadraoMsg>) => {

    try {
        if (req.method === "DELETE") {

            const {userId} = req.query;
            const usuario = await UserModel.findById(userId);
            
            const notaId = req?.query?.notaId;
    
            if(notaId){
                const notaDeletada = await NoteModel.findByIdAndDelete({_id: notaId});
    
                if (!notaDeletada) {
                    return res.status(404).json({ erro: 'Nota não encontrada' });
                }
                usuario.notes--;
                await UserModel.findByIdAndUpdate({_id: usuario._id}, usuario);
    
                return res.status(200).json({msg: "Nota deletada com sucesso"})
    
            }
            return res.status(400).json({ msg: 'Necessário selecionar uma nota para ser excluida' });
        }
        return res.status(405).json({ erro: "Método inválido" })   
    } catch (e) {
        console.log(e);
        return res.status(500).json({erro: "Erro ao deletar nota"})
    }
}

export default CORS(validarTokenJWT(conetarBD(endpointDelete))) 