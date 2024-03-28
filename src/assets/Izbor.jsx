import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './css/Izbor.css';

function Izbor({ onLinkClick }) {
    const [exiting, setExiting] = useState(false);

    const handleClick = (component, event) => {
        event.preventDefault();
        setTimeout(() => {
            onLinkClick(component);
        }, 500);
    };

    useEffect(() => {
            setExiting(true);
    }, []);

    return (
        <div className={`container Izbor ${exiting ? 'exiting' : ''}`}>
            <div className="row">
                {/* Dodati ternarni operator za prikaz a tagova */}
                    <>
                        <div className="col-12 mb-5 text-center">
                            <a onClick={(event) => handleClick('Prijem', event)} href="" className="Dugme btn btn-success btn-lg">Prijem</a>
                        </div>
                        <div className="col-12 mb-5 text-center">
                            <a onClick={(event) => handleClick('Lekar', event)} href="" className="Dugme btn btn-success btn-lg">Pregled Lekara</a>
                        </div>
                        <div className="col-12 mb-5 text-center">
                            <a onClick={(event) => handleClick('Psihijatar', event)} href="" className="Dugme btn btn-success btn-lg">Pregled Psihijatra</a>
                        </div>
                    </>
            </div>
        </div>
    );
}

export default Izbor;
