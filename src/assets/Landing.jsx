import { useEffect, useState } from "react";
import './css/LandingPageCss.css';
import logo2 from './logo2.png';
import 'bootstrap/dist/css/bootstrap.css';
import Izbor from "./Izbor";

function Landing( { onLinkClick }) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = logo2;
        img.onload = () => {
            setLoaded(true);
        };
    }, []);

    const handleClick = (component, event) => {
        event.preventDefault(); // sprečava podrazumevano ponašanje klika
        onLinkClick(component);
    };

    return (
        <>
                <div className="Pocetna" onClick={(event) => handleClick('Izbor', event)}>
                    <div className={`img-container ${loaded ? 'img-loaded' : ''}`}>
                        <img src={logo2} alt="logo" className="logoPocetna" />
                    </div>
                </div>
        </>
    );
}

export default Landing;
