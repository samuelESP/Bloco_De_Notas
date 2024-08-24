import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import type { respostaPadraoMsg } from '../types/respostaPadraoMsg';

import  jwt, { JwtPayload }  from 'jsonwebtoken';
import { Console } from 'console';

export  const validarTokenJWT = (handler: NextApiHandler) => 
    (req: NextApiRequest, res:NextApiResponse<respostaPadraoMsg>) => {


        try {
        const {CHAVE_JWT} = process.env;

        if(!CHAVE_JWT){
            return res.status(500).json({erro: `ENV de chave JWT não informada na execução do processo`})
        }

        if(!req || !req.headers){
            return res.status(401).json({erro: `Não foi possível validar o token de acesso`})
        }

        if(req.method !== "OPTIONS"){
            const authorization = req.headers['authorization'];
            if(!authorization){
                return res.status(401).json({erro: `Não foi possível validar o token de acesso`})
            }
            const token = authorization.substring(7);
            if(!token){
                return res.status(401).json({erro: `Não foi possível validar o token de acesso`})

            }

            const decoded = jwt.verify(token, CHAVE_JWT) as JwtPayload;
            
            if(!decoded){
                return res.status(401).json({erro: `Não foi possível validar o token de acesso`})
            }
            if(!req.query){
                req.query= {};
            }
            req.query.userId = decoded.id;
            
        }
        } catch (e) {
            console.log(e);
            return res.status(401).json({erro: `Não foi possível validar o token de acesso`})

        }
        console.log("Usuairo Validado com sucesso")
        return handler(req, res)

    }