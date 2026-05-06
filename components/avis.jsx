/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import Image from "next/image"

export function Avis(){
    return(
        <section className="avis">
            <h2>Ce qu'ils disent à propos de nous 😊 :</h2>
            <p>Tout le monde sont libre de dire ce qu'il pense de nous. S'il s'agit de critique, on améliore. Dans le cas d'encouragement, on s'épanouit de joie. Vos petits mots nous tiennent beaucoup à coeur 🌺.</p>
            <section className="comments-container">
                <div className="card">
                    <div className="info-user">
                        <div className="img-container">
                            <Image src="/images/ialy-francisco-raymond.jpg" alt="Profile de IALY Francisco Raymond" width={100} height={100} priority />
                        </div>
                        <div className="user-name">
                            <h4>IALY Francisco</h4>
                            <h5>Développeur</h5>
                        </div>
                    </div>
                    <div className="message">
                        <p><em>"</em> Le service qu'offre LUMINI School est très utile pour les habitants de Madagascar surtout ceux de Toamasina car la plupart des étudiants, jeunes chercheurs en informatique sont en manque de cadre pédagogique. <em>"</em></p>
                    </div>
                </div>
                <div className="card">
                    <div className="info-user">
                        <div className="img-container">
                            <Image src="/images/michella.jpg" alt="Profile de Muriella" width={100} height={100} priority />
                        </div>
                        <div className="user-name">
                            <h4>Marie Michëlla</h4>
                            <h5>Apprentie en info.</h5>
                        </div>
                    </div>
                    <div className="message">
                        <p><em>"</em> J'adore la méthode que vous employer pour former vos apprentis. Les formateurs sont cool, on s'entend bien avec eux, le courant se passe bien et on se sens bien formé. <br />
                        Vive LUMINI School ✊, <em>#</em>luminischool <em>"</em></p>
                    </div>
                </div>
                <div className="card">
                    <div className="info-user">
                        <div className="img-container">
                            <Image src="/images/sedera.jpg" alt="Profile de Sederaniaina" width={100} height={100} priority />
                        </div>
                        <div className="user-name">
                            <h4>Sederaniaina R.</h4>
                            <h5>A. en appel sortant</h5>
                        </div>
                    </div>
                    <div className="message">
                        <p><em>"</em> Il est temps que tous les jeunes, adultes, enfants de nos povinces soient beaucoup familiarisés au monde de l'informatique. Ainsi ils apprennent les grands moyens afin de réaliser des grandes idées. <em>"</em></p>
                    </div>
                </div>
                <div className="card">
                    <div className="info-user">
                        <div className="img-container">
                            <Image src="/images/tandra.jpg" alt="Profile de Tandra" width={100} height={100} priority />
                        </div>
                        <div className="user-name">
                            <h4>Tandra Mario J.</h4>
                            <h5>DRH d'une société</h5>
                        </div>
                    </div>
                    <div className="message">
                        <p><em>"</em> Avec un tel projet, matûre et ambitieux, on peut espérer qu'on aura plus des manques des ressources humaines d'ici un ans. Chaque post sera occupé de professionnel déterminé, compétant et prêt à donner à fond leurs connaissances. <em>"</em></p>
                    </div>
                </div>
                <div className="card">
                    <div className="info-user">
                        <div className="img-container">
                            <Image src="/images/muriella.jpg" alt="Profile de Francisca Zoë" width={100} height={100} priority />

                        </div>
                        <div className="user-name">
                            <h4>Franciska Zoé</h4>
                            <h5>Etudiante en info.</h5>
                        </div>
                    </div>
                    <div className="message">
                        <p><em>"</em> Je n'ai jamais su que se former en informatique peut être si facile que je le croiais. Mais grâce à LUMINI School tout s'est dévenu possible et je comprends mieux que l'informatique est une base fiable. "Big thx 👌" à leur équipe. <em>"</em></p>
                    </div>
                </div>
                <div className="card">
                    <div className="info-user">
                        <div className="img-container">
                            <Image src="/images/juliot.jpg" alt="Profile de Juliot" width={100} height={100} priority />
                        </div>
                        <div className="user-name">
                            <h4>R. Juliot</h4>
                            <h5>Formateur</h5>
                        </div>
                    </div>
                    <div className="message">
                        <p><em>"</em> Enfin un cadre de formation matûre et fiable pour les apprenants. LUMINI School ravive l'espoir qu'avait nos jeunes en les préparant des formations à objectif bien basé et qui projete vers le monde du futur. On compte sur vous. <em>"</em></p>
                    </div>
                </div>
            </section>
            <div className="actions">
                <a href="#contact">
                    <button>Contacter LUMINI School</button>
                </a>
                <Link href="/formations">
                    <button>Voir toutes les formations</button>
                </Link>
            </div>
        </section>
    )
}