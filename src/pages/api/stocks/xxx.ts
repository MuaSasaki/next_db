import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import  prisma  from '../../../lib/Prisma';

const getHandler = async (
    req:NextApiRequest,res:NextApiResponse
)=>{
    const resUser = await prisma.stock
    .findMany()
    .catch((err => {
        statusCode  = 500;
        console.log(err);
        return {error:'Failed to read'};
    }))
    .finally(async () => {
        await prisma.$disconnect();
    })

    res.status(statusCode).json(resXxxx)
};

const postHandler = async (
    req:NextApiRequest,res:NextApiResponse
) =>{

};


const handler: NextApiHandler = (req,res) =>{
    switch(req.method){
        case 'GET':
            getHandler(req, res);
            break;
        case 'POST':
            postHandler(req, res);
            break;
        default:
            return res.status(405).json({error:'Method not allowed.'});
    }
};

export default handler;