import styles from "./FoodCard.module.css";
import Link from "next/link";

interface foodI {
    id: number,
    name: string,
    imageUrl: string
    price: number,
    active: boolean
}

export default function FoodCard(food: foodI) {
    return (
        <Link href={`/food/${food.id}`}>
            <div className={styles.foodCard}>
                <div
                    title={`Food Image of: ${food?.name}`}
                    aria-label={`Food Image of: ${food?.name}`}
                    className={styles.foodCardImg}
                    style={{ backgroundImage: `url(${food.imageUrl})` }}
                ></div>
                <div className={styles.foodCardFooter}>
                    <div className={styles.foodCardName}>
                        <h3>{food.name}</h3>
                    </div>
                    <div className={styles.foodCardPrice}>
                        <span>Price(💵)</span>
                        <span>{food.price}</span>
                    </div>
                    <div className={styles.foodCardActive}>
                        <span>Active:</span>
                        <span>{food.active}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}