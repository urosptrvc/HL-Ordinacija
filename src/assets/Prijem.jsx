
import PrijemPacijenta from "./Prijem/PrijemPacijenta";
import Tabela from "./Prijem/Tabela";
import React, { useState, useEffect } from 'react';
import './css/Prijem.css';
import TabelaLekar from "./Prijem/TabelaLekar";
import TabelaPsihijatar from "./Prijem/TabelaPsihijatar";
import Alert from '@mui/material/Alert';

function Prijem() {

    const [osvezivac, setOsvezivac] = useState(false);
    const [activate, setActivate] = useState("");
    const [objekatpacijent, setObjekatpacijent] = useState("");
    const handleObjekat = async (objekat) => {
        try {
            // Učitavanje podataka iz db.json
            const response = await fetch("http://localhost:3000/pacijenti", {
                mode: 'cors'
            });
            if (!response.ok) {
                throw new Error("Neuspješno preuzimanje podataka");
            }
            const data = await response.json();

            let maxId = 0;
            data.forEach(pacijent => {
                const id = parseInt(pacijent.id);
                if (id > maxId) {
                    maxId = id;
                }
            });

            // Generiranje novog ID-a
            const newId = maxId + 1;

            // Kreiranje novog objekta s generiranim ID-om
            const noviObjekat = { id: newId.toString(), ...objekat };
    
            // Slanje novih podataka nazad na server
            await fetch("http://localhost:3000/pacijenti", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(noviObjekat),
                mode: 'cors'
            });
            

            setOsvezivac(prevOsvezivac => !prevOsvezivac);
            // Ovdje možete postaviti logiku za osvježavanje tabele ili nešto slično ako je potrebno
        } catch (error) {
            console.error("Došlo je do greške:", error);
        }
    };
    const handleObjekatCekanje = async (objekat) => {
        try {
            // Učitavanje podataka iz db.json
            const response = await fetch("http://localhost:3000/listacekanja", {
                mode: 'cors'
            });
            if (!response.ok) {
                throw new Error("Neuspješno preuzimanje podataka");
            }
            const data = await response.json();

            let maxId = 0;
            data.forEach(pacijent => {
                const id = parseInt(pacijent.id);
                if (id > maxId) {
                    maxId = id;
                }
            });

            // Generiranje novog ID-a
            const newId = maxId + 1;

            // Kreiranje novog objekta s generiranim ID-om
            const noviObjekat = { id: newId.toString(), ...objekat };
    
            // Slanje novih podataka nazad na server
            await fetch("http://localhost:3000/listacekanja", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(noviObjekat),
                mode: 'cors'
            });
            

            setOsvezivac(prevOsvezivac => !prevOsvezivac);
            // Ovdje možete postaviti logiku za osvježavanje tabele ili nešto slično ako je potrebno
        } catch (error) {
            console.error("Došlo je do greške:", error);
        }
    };
    
    const [pacijentData, setPacijentData] = useState(null);

    const handleUpdatePacijentData = (data) => {
        setPacijentData(data);
    };

    const busenProvera = (data, objekat) => {
        if(data==="1"){
            setActivate("nepotnun")
            setTimeout(() => {
                setActivate("");
            }, 3000);
        }
        else if(data==="2"){
            setActivate("licna")
            setTimeout(() => {
                setActivate("");
            }, 3000);
        }
        else if(data==="3"){
            setActivate("sveok")
            setObjekatpacijent(objekat)
            setTimeout(() => {
                setActivate("");
            }, 3000);
        }
        else if(data==="4"){
            setActivate("brisanje")
            setObjekatpacijent(objekat)
            setTimeout(() => {
                setActivate("");
            }, 3000);
        }
    }




    return (
        <>  
            <div className="">
                <div className="row">
                    <div className="col-lg-6 Alertovi">
                        {activate=="sveok" && (
                            <Alert variant="filled" severity="success">
                                Uspesan unos pacijenta {objekatpacijent}
                            </Alert>
                        )}
                    </div>
                    <div className="col-lg-6 Alertovi2">
                        {activate=="nepotnun" && (
                            <Alert variant="filled" severity="error">
                                Neuspesan unos pacijenta {objekatpacijent}, niste ispravno uneli podatke
                            </Alert>
                        )}
                        {activate=="licna" && (
                            <Alert variant="filled" severity="error">
                                Niste ispravno uneli br licne karte za pacijenta {objekatpacijent}
                            </Alert>
                        )}
                        {activate=="brisanje" && (
                            <Alert variant="filled" severity="warning">
                                Obrisan pacijent {objekatpacijent}
                            </Alert>
                        )}
                    </div>
                </div>
            </div>




            <div className="Prijem">
                <div className="text-center" style={{marginBottom: '20px'}}>
                    <img src="./logo2.png" alt="" className="logoPrijem"/>
                </div>

                <div className="Prijem1 container-fluid">
                
                    <div className="row Prijem1Row">
                        <div className="col-lg-3 col-sm-12 md-3 UnosPacijenta">
                            <PrijemPacijenta handleObjekat={handleObjekat} handleObjekatCekanje={handleObjekatCekanje} busenProvera={busenProvera} pacijentData={pacijentData}/>
                        </div>
                        <div className="col-lg-9 col-sm-12 UnosTabela">
                            <Tabela osvezivac={osvezivac} updatePacijentData={handleUpdatePacijentData} busenProvera={busenProvera}/>
                        </div>
                    </div>
                </div>

            </div>

            <div className="Prijem2 container-fluid d-flex justify-content-center align-items-center">
                <div className="row Prijem2Row" >
                    <div className="col-lg-6 col-sm=12 md-3">
                        <TabelaLekar osvezivac={osvezivac} busenProvera={busenProvera}/>
                    </div>
                    
                    <div className="col-lg-6 col-sm=12 md-3">
                        <TabelaPsihijatar osvezivac={osvezivac} busenProvera={busenProvera}/>
                    </div>  
                </div>
            </div>
            
            <div>
                <p>
                    aa
                </p>
            </div>
            
        </>
    );
}

export default Prijem;



