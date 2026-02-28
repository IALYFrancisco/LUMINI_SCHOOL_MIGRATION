/* eslint-disable react/no-unescaped-entities */
import { FormationsSlider } from "./formations-slider";
import Link from "next/link";

export function Formations(){
    return(
        <section id="demo-formations">
            <section className="formations-container">
                <div className="head">
                    <h2>Jetez un coup d'oeil à nos formations</h2>
                    <p>On propose aux apprentis des modules de formation de haute qualité avec des supports, fruits de prudence et d'amour. Nos formations sont variées sur tout les secteurs de l'informatique.</p>
                </div>
                <div className="cards-container">
                    <FormationsSlider></FormationsSlider>
                </div>
                <Link href="/formations">
                    <button>Voir toute les formations</button>
                </Link>
            </section>
        </section>
    )
}