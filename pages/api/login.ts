import type { NextApiRequest, NextApiResponse } from "next";
import { conetarBD } from "@/middleware/conetarBD";
import type { respostaPadraoMsg } from '@/types/respostaPadraoMsg';
import md5 from "md5";
import { UserModel } from "@/models/UserModel";
import jwt from "jsonwebtoken";
import { loginResposta } from "@/types/loginResposta";




const endpointLogin = async (req: NextApiRequest, res: NextApiResponse<respostaPadraoMsg | loginResposta>) => {
    if (req.method === "POST") {

        const{CHAVE_JWT}= process.env;

        if(!CHAVE_JWT){
            return res.status(500).json({erro: "ENV JWT não informado"})
        }

        const { login, password } = req.body;

        const usersFounders = await UserModel.find({email: login, password: md5(password)})
        if(usersFounders && usersFounders.length > 0){
            const userFound = usersFounders[0];

            const token = jwt.sign({id: userFound._id}, CHAVE_JWT);

            return res.status(200).json({ name: userFound.name, email: userFound.email, token });
        }
       
        return res.status(405).json({ erro: "Senha ou login informado não válido" });
    }

    return res.status(405).json({ erro: "Método informado não válido" });
};

export default conetarBD(endpointLogin)
 