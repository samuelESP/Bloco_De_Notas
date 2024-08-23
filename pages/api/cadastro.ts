import type { NextApiRequest, NextApiResponse } from "next";
import { respostaPadraoMsg } from "@/types/respostaPadraoMsg";
import { CadastroRequisicao } from "@/types/cadastroRequisicao";
import { conetarBD } from "@/middleware/conetarBD";
import { UserModel } from "@/models/UserModel";

const endpointCadastro = 
 async(req: NextApiRequest, res: NextApiResponse<respostaPadraoMsg>) => {


    if(req.method === "POST"){
        const user = req.body as CadastroRequisicao;

        if(!user.name || user.name.length < 2){
            return res.status(400).json({erro: "Nome inválido"})
        }
        if(!user.email || user.email.length < 5 || !user.email.includes('@') || !user.email.includes('.')){
            return res.status(400).json({erro: "email inválido"})
        }
        if(!user.password || user.password.length < 4){
            return res.status(400).json({erro: "senha inválido"})
        }



        await UserModel.create(user)
        return res.status(200).json({ msg: "Usuário criado com sucesso" });
        

    }

    return res.status(405).json({ erro: "Método informado não válido" });
}

export default conetarBD(endpointCadastro)