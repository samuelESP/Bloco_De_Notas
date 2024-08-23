import type { NextApiRequest, NextApiResponse } from "next";
import { conetarBD } from "@/middleware/conetarBD";
import type { respostaPadraoMsg } from '@/types/respostaPadraoMsg';


const endpointLogin = (req: NextApiRequest, res: NextApiResponse<respostaPadraoMsg>) => {
    if (req.method === "POST") {
        const { login, password } = req.body;

        if (login === "admin.com" && password === "123") {
            return res.status(200).json({ msg: "Usuário autenticado com êxito" });
        }
        return res.status(405).json({ erro: "Senha ou login informado não válido" });
    }

    return res.status(405).json({ erro: "Método informado não válido" });
};

export default conetarBD(endpointLogin)
 