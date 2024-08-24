import type { NextApiRequest, NextApiResponse } from "next";
import { respostaPadraoMsg } from "@/types/respostaPadraoMsg";
import { conetarBD } from "@/middleware/conetarBD";
import { validarTokenJWT } from "@/middleware/validarJWT";
import { UserModel } from "@/models/UserModel";
import { NoteModel } from "@/models/NoteModel";

const endpointDelete = async (req: NextApiRequest, res: NextApiResponse<respostaPadraoMsg>) => {

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
}

export default validarTokenJWT(conetarBD(endpointDelete))