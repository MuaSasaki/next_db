import  prisma  from '../../../lib/Prisma';
import { ProductGetType } from '@/types/productType';
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';


const getHandler = async (
    _:NextApiRequest,res:NextApiResponse
)=>{
    let statusCode = 200;
    const resStock = await prisma.product
    .findMany()
    .then((res) => {
        return res;
    })
    .catch((err) => {
        statusCode  = 500;
        console.log(err);
        return {error:'Failed to read'};
    })
    .finally(async () => {
        await prisma.$disconnect();
    })

    res.status(statusCode).json(resStock)
};


const handler: NextApiHandler = (req,res) =>{
    
    switch(req.method){
        case 'GET':
            getHandler(req, res);
            break;

        default:
            return res.status(405).json({error:'Method not allowed.'});
    }
};

export default handler;