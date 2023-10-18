import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import  prisma  from '../../../lib/Prisma';
import { StockPostType } from '@/types/post';


const getHandler = async (
    _:NextApiRequest,res:NextApiResponse
)=>{
    let statusCode = 200;
    const resStock = await prisma.stock
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

const postHandler = async (
    req:NextApiRequest,res:NextApiResponse
)=>{
    let statusCode = 200;
    const body:StockPostType = req.body;
    const resStock = await prisma.stock
    .create({data:{
        stock_num:(body.stock_number),
        pro_id:(body.pro_id)
    }})
    .then((res) => {
        return res;
    })
    .catch((err => {
        statusCode  = 500;
        console.log(err);
        return {error:'Failed to read'};
    }))
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
        case 'POST':
            postHandler(req, res);
            break;

        default:
            return res.status(405).json({error:'Method not allowed.'});
    }
};

export default handler;