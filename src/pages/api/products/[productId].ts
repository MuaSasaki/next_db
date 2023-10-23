import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import  prisma  from '../../../lib/Prisma';


const getHandler = async (
    req:NextApiRequest,res:NextApiResponse
)=>{
    let statusCode = 200;
    const { productId } = req.query
    console.log(productId)
    if(!(typeof productId === "string")) {res.status(500).json("invalid value");}
    const productIdNumber = Number(productId)
    console.log("productnumber is ",productId);
    try{
        const resProduct = await prisma.product.findMany({
            where:{
                id:{
                    equals:productIdNumber
                }}})
        res.status(statusCode).json(resProduct)
    }catch (error){
        statusCode  = 500;
        console.log(error);
        return {error:'Failed to read'};
    }finally{
        await prisma.$disconnect();
    }}

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