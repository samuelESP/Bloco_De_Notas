import { conetarBD } from "@/middleware/conetarBD";
import { validarTokenJWT } from "@/middleware/validarJWT";
import { NoteModel } from "@/models/NoteModel";
import { respostaPadraoMsg } from "@/types/respostaPadraoMsg";
import type { NextApiRequest, NextApiResponse } from "next";

const endpointNotas =
    async(req: NextApiRequest, res:NextApiResponse<respostaPadraoMsg | any>) => {
        if(req.method ==="GET"){

            const{userId} = req.query;
                
            const notas = await NoteModel.find({idUser: userId});
            
            if(!notas || notas.length < 0 ){
                return res.status(400).json({erro: "O usuário não possui anotações"})
            }
            
            const result = [];
            for(const nota of notas){
                const final = {
                    idNote: nota._id,
                    nameNote: nota.nameNote,
                    anotacao: nota.anotacao,
                    data: nota.data
                }

                result.push(final)
            }
            return res.status(200).json(result)
            
        }

        return res.status(405).json({erro: "Método inválido"})
    }
    

export default validarTokenJWT(conetarBD(endpointNotas))