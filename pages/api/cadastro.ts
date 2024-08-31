import type { NextApiRequest, NextApiResponse } from "next";
import { respostaPadraoMsg } from "@/types/respostaPadraoMsg";
import { CadastroRequisicao } from "@/types/cadastroRequisicao";
import { conetarBD } from "@/middleware/conetarBD";
import { UserModel } from "@/models/UserModel";
import md5 from "md5";

const endpointCadastro = 
 async(req: NextApiRequest, res: NextApiResponse<respostaPadraoMsg>) => {
    try {
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
    
            const existedUser = await UserModel.find({email: user.email})
            if(existedUser && existedUser.length > 0){
            return res.status(400).json({erro: "Usuário já existente"})
            }
    
            const usuarioSave = {
                name : user.name,
                email : user.email,
                password : md5(user.password)
            }
    
            await UserModel.create(usuarioSave)
            return res.status(200).json({ msg: "Usuário criado com sucesso" });
            
    
        }
    
        return res.status(405).json({ erro: "Método informado não válido" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({erro: "Não é possível cadastrar usuário no momento, tente mais tarde"})
    }
}

export default conetarBD(endpointCadastro)