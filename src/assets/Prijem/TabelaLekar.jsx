import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState, useEffect } from 'react';
import '../css/Tabela.css';
import axios from 'axios';



function TabelaLekar ({osvezivac, busenProvera}) {


    const [refresh, setRefresh] = useState(false);
    const [oznaceniZaBrisanje, setOznaceniZaBrisanje] = useState([]);
    const [pacijenti, setPacijenti] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/listacekanja');
                setPacijenti(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Greška prilikom dobavljanja podataka:', error);
            }
        }
        fetchData();
    }, [refresh, osvezivac]);

    const handleRefresh = () => {
        // Postavljamo refresh na suprotnu vrijednost kako bi se useEffect ponovno izvršio
        setRefresh(prevRefresh => !prevRefresh);
    }; 

    const handleDeletePacijenta = (id) => {
        const index = oznaceniZaBrisanje.indexOf(id);
        if (index === -1) {
            setOznaceniZaBrisanje([...oznaceniZaBrisanje, id]);
            handleRefresh();
        } else {
            const updatedList = [...oznaceniZaBrisanje];
            updatedList.splice(index, 1);
            setOznaceniZaBrisanje(updatedList);
            handleRefresh();
        }
        
    }; 


    const obrisiPacijenta = async () => {
        try {
            // Store deleted patients for toast notification
            const deletedPatients = [];
    
            await Promise.all(oznaceniZaBrisanje.map(async (id) => {
                // Dobavi sve pacijente iz baze
                const response = await axios.get(`http://localhost:3000/listacekanja`);
                const pacijenti = response.data;
    
                // Pronađi pacijenta čiji je ID jednak trenutnom ID-ju u iteraciji
                console.log(pacijenti)

                oznaceniZaBrisanje.forEach(id => {
                    pacijenti.forEach(pacijent => {
                        if (pacijent.id === id) {
                            console.log(pacijent)
                            deletedPatients.push({ imePrezime: pacijent.imePrezime });
                        }
                    });
                });

                console.log(deletedPatients)

                await axios.delete(`http://localhost:3000/listacekanja/${id}`);
            }));
    
            // Prikaži obaveštenje za svakog obrisnog pacijenta
            deletedPatients.forEach(patient => {
                console.log("BRISANJE",patient);
                busenProvera("4",patient.imePrezime)
            });
    
            // Osvježi podatke i resetuj listu oznaka za brisanje
            handleRefresh();
            setOznaceniZaBrisanje([]);
        } catch (error) {
            console.error('Greška prilikom brisanja pacijenta:', error);
        }
    };

    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        const day = dateObject.getDate().toString().padStart(2, '0');
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObject.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return(

        <>

        <div className="row">
            <div className="col-6">
                 
                <p className='lead listacekanja'><b>Lista čekanja Lekar</b></p>                      
            </div>
            <div className="col-6 d-flex justify-content-end mb-3">
                <Button variant="danger" type="submit" onClick={obrisiPacijenta}>
                    Obriši
                </Button>
            </div>
        </div>


        <div className='tabela' style={{ height: '700px', overflowY: 'auto' }}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Ime i Prezime</th>
                        <th>Broj lične karte</th>
                        <th>Broj telefona</th>
                        <th>Adresa stanovanja</th>
                        <th>Datum Rodjenja</th>
                        <th>Pol</th>
                        <th>Obrisi</th>
                    </tr>
                </thead>
                <tbody>
                        {pacijenti.filter((pacijent) => {
                            return pacijent.izabraniLekar === 'Nataša Djorić' ? pacijent : "";
                        }).map(pacijent => (
                            <tr key={pacijent.id}>
                                <td>{pacijent.imePrezime}</td>
                                <td>{pacijent.brojLK}</td>
                                <td>{pacijent.brojTelefona}</td>
                                <td>{pacijent.adresa}</td>
                                <td>{formatDate(pacijent.datumRodjenja)}</td>
                                <td>{pacijent.pol}</td>                                 
                                <td className='text-center'><Form.Check aria-label="brisanje" name="brisaci" type='radio' onChange={() => handleDeletePacijenta(pacijent.id)} checked={oznaceniZaBrisanje.includes(pacijent.id)} /></td>   
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>


                        
        </>

    );

}
export default TabelaLekar