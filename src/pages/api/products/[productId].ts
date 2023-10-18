import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import  prisma  from '../../../lib/Prisma';

const getHandler = async (
    req:NextApiRequest,res:NextApiResponse
)=>{
    let statusCode = 200;
    const { productId } = req.query

    // if(!productId || productId.length !== 0) {res.status(500).json("invalid value");}
    const productIdNumber = Number(productId)
    const resStock = prisma.product
    try{await resStock.findMany({
        where: {
            id:productIdNumber
        }
    })}
    catch(error){
        statusCode  = 500;
        console.log(error);
        return {error:'Failed to read'};
    }
    finally{async () => {
        await prisma.$disconnect();
    }}

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