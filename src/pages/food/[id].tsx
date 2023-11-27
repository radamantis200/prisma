import styles from "./Food.module.css";
import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import EditFood from "../components/editfood";
import axios from "axios";
import { useRouter } from "next/router";

const prisma = new PrismaClient();

interface foodI {
    id: number,
    name: string,
    imageUrl: string
    price: number,
    ingredients: string,
    description: string,
    active: boolean
}

const FoodId = (props: any) => {
    const [showEditFoodModal, setShowEditFoodModal] = useState(false);
    const router = useRouter();
    const food = props.food as foodI;

    async function deleteFood() {
        if (window.confirm("Do you want to delete this food?")) {
            // ...
            await axios.post("/api/deleteFood", { id: food.id });
            router.push("/foods");
        }
    }

    return (
        <div className={styles.foodContainer}>
            <div className={styles.food}>
                <div
                    title={`Food Image of: ${food?.name}`}
                    aria-label={`Food Image of: ${food?.name}`}
                    className={styles.foodImage}
                    style={{ backgroundImage: `url(${food?.imageUrl})` }}
                ></div>
                <div className={styles.foodDetails}>
                    <div className={styles.foodName}>
                        <h1>{food?.name}</h1>
                    </div>
                    <div style={{ padding: "5px 0" }}>
                        <span>
                            <button
                                onClick={() => setShowEditFoodModal((pV) => !pV)}
                                style={{ marginLeft: "0" }}
                                className="btn"
                            >
                                Edit
                            </button>
                            <button onClick={deleteFood} className="btn btn-danger">
                                Delete
                            </button>
                        </span>
                    </div>
                    <div style={{ padding: "5px 0" }}>
                        <span> Price(💵): {food?.price}</span>
                    </div>
                    <div className={styles.foodDescIngreCnt}>
                        <h2>Ingredients</h2>
                        <div className={styles.foodSynopsis}>{food?.ingredients}</div>
                    </div>
                    <div className={styles.foodDescIngreCnt}>
                        <h2>Description</h2>
                        <div className={styles.foodSynopsis}>{food?.description}</div>
                    </div>
                </div>
            </div>
            {showEditFoodModal ? (
                <EditFood closeModal={() => setShowEditFoodModal(false)} food={food}/>
            ) : null}
        </div>
    );
}

export async function getServerSideProps(context: any) {
    const id = Number(context.params.id)
    const food = await prisma.food.findUnique({
        where: {
            id: id,
        }
    });
    return {
        props: {
            food,
        },
    };
}

export default FoodId;