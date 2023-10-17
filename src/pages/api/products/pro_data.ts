import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import  prisma  from '../../../lib/prisma';
// import { useRouter } from 'next/router';


const postHandler = async (
  req:NextApiRequest,res:NextApiResponse
) =>{
    let statusCode = 200;
    const _data = req.body
    const resUser = await prisma.product
    .create({
        data:_data
    })
    .catch((err => {
        statusCode  = 500;
        console.log(err);
        return {error:'Failed to read'};
    }))
    .finally(async () => {
        await prisma.$disconnect();
    })

    res.status(statusCode).json(resUser)

};


const handler: NextApiHandler = (req,res) =>{
    // const router = useRouter();
    // const {pro_data} = router.query;
    switch(req.method){
        case 'POST':
            postHandler(req, res);
            break;
        default:
            return res.status(405).json({error:'Method not allowed.'});
    }
};

export default handler;