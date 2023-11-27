import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();


const deleteMethod = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.body;
    try {
        const deleteFood = await prisma.food.delete({
            where: {
                id,
            },
        });

        if (!deleteFood) {
            return res.status(404).json({ error: 'Food item not found' });
        }
        res.status(200).json(deleteFood);
    } catch (error) {
        res.status(403).json({ err: "Error occured while deleting a food item." });
    }
};

export default deleteMethod