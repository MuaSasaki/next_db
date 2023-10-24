import  prisma  from '../../../lib/Prisma';
import { ProductGetType } from '@/types/productType';
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';


const putHandler = async (
    req:NextApiRequest,res:NextApiResponse
)=>{
    let statusCode = 200;
    const reqData:ProductGetType = req.body
    // const reqData:ProductGetType = JSON.parse(body)
    const resStock = await prisma.product
    .update({
        where:{
            id:reqData.id,
        },
        data:{
            pro_name:reqData.pro_name,
            maker:reqData.maker,
            category:reqData.category,
            price:reqData.price,
        },
    })
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
        case 'PUT':
            putHandler(req, res);
            break;

        default:
            return res.status(405).json({error:'Method not allowed.'});
    }
};

export default handler;