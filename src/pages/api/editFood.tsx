import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const editFood = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        id,
        name,
        price,
        imageUrl,
        active,
        description,
        ingredients,
    } = req.body;
    try {
        const updateFood = await prisma.food.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
                price,
                imageUrl,
                active,
                description,
                ingredients,
            },
        });
        res.status(200).json(updateFood);
    } catch (error) {
        res.status(403).json({ err: "Error occurred while updating a food item." });
    }
};

export default editFood