import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

const addFood = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body;
    try {
        const result = await prisma.food.create({
            data: {
                ...data,
            },
        });
        res.status(200).json(result);
    } catch (err) {
        res.status(403).json({ err: "Error occured while adding a new food." });
    }
};

export default addFood