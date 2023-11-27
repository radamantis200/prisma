import styles from "./Foods.module.css";
import FoodCard from "../components/foodcard";
import { PrismaClient } from "@prisma/client";
import AddFood from "../components/addfood";
import { useState } from "react";

const prisma = new PrismaClient();

interface FoodProps {
    foods: Array<foodI>;
}

interface foodI {
    id: number,
    name: string,
    imageUrl: string
    price: number,
    active: boolean
}

const Foods = (props: FoodProps) => {
    const [showAddFoodModal, setShowAddFoodModal] = useState(false);
    const foods = props.foods;

    return (
        <div className={styles.foodsCnt}>
            <div className={styles.foodsBreadcrumb}>
                <div>
                    <h2>Recipes 🥗🥘🍱🍛</h2>
                </div>
                <div>
                    <button
                        className="btn"
                        style={{
                            paddingLeft: "15px",
                            paddingRight: "15px",
                            fontWeight: "500",
                        }}
                        onClick={() => setShowAddFoodModal((pV) => !pV)}
                    >
                        Add Food
                    </button>
                </div>
            </div>
            <div className={styles.foods}>
                {foods?.map((food: foodI, i) => (
                    <FoodCard key={i} id={food.id} name={food.name} imageUrl={food.imageUrl} price={food.price} active={food.active} />
                ))}
            </div>
            {showAddFoodModal ? (
                <AddFood closeModal={() => setShowAddFoodModal(false)} />
            ) : null}
        </div>
    );
}

export async function getServerSideProps() {
    const allFoods = await prisma.food.findMany();
    return {
        props: {
            foods: allFoods,
        },
    };
}

export default Foods;