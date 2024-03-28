import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState, useEffect } from 'react';
import '../css/Tabela.css';
import axios from 'axios';


function Tabela ({ osvezivac, updatePacijentData, busenProvera}){

    const [pacijenti, setPacijenti] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [pretraga, setPretraga] = useState('');
    const [oznaceniZaBrisanje, setOznaceniZaBrisanje] = useState([]);
    const [oznaceniZaUcitavanje, setOznaceniZaUcitavanje] = useState([]);
    const [selectedPacijentData, setSelectedPacijentData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/pacijenti');
                setPacijenti(response.data);
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
        } else {
            const updatedList = [...oznaceniZaBrisanje];
            updatedList.splice(index, 1);
            setOznaceniZaBrisanje(updatedList);
        }
    };

    const handleSelectPacijenta = (id) => {
        setOznaceniZaUcitavanje([id]);
    };
    
    const obrisiPacijenta = async () => {
        try {
            // Store deleted patients for toast notification
            const deletedPatients = [];
    
            await Promise.all(oznaceniZaBrisanje.map(async (id) => {
                // Dobavi sve pacijente iz baze
                const response = await axios.get(`http://localhost:3000/pacijenti`);
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

                await axios.delete(`http://localhost:3000/pacijenti/${id}`);
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
    
    
    
    
    
    
    

    useEffect(() => {
        if (selectedPacijentData) {
            console.log(selectedPacijentData);
            updatePacijentData(selectedPacijentData);
            handleRefresh();
            setOznaceniZaUcitavanje([]);
        }
    }, [selectedPacijentData]);
    
    const ucitajPacijenta = async () => {
        try {
            if (oznaceniZaUcitavanje.length > 0) {
                const id = oznaceniZaUcitavanje[0]; // Uzimamo samo prvi označeni pacijent
                const response = await axios.get(`http://localhost:3000/pacijenti/${id}`);
                console.log(response.data);
                setSelectedPacijentData(response.data);

            } else {
                console.log('Niste odabrali pacijenta za učitavanje.');
            }
        } catch (error) {
            console.error('Greška prilikom učitavanja pacijenta:', error);
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
                        <div className="row mb-3">
                            <div className="col-6">
                                <InputGroup>
                                    <InputGroup.Text >Pretraga pacijenta:</InputGroup.Text>
                                    <Form.Control
                                    aria-label="Large"
                                    aria-describedby="inputGroup-sizing-sm"
                                    onChange={(e) => setPretraga(e.target.value)}
                                    />
                                </InputGroup>                            
                            </div>
                            <div className="col-6 d-flex justify-content-end align-items-center">
                                <Button variant="success" type="submit" style={{marginRight: '20px'}} onClick={ucitajPacijenta}>
                                    Učitaj pacijenta
                                </Button>
                                <Button variant="danger" type="submit" onClick={obrisiPacijenta}>
                                    Obriši
                                </Button>
                            </div>
                        </div>


                        <div className='tabela' style={{ height: '535px', overflowY: 'auto' }}>
                            <Table striped bordered hover>
                                <thead style={{  position: 'sticky', top: 0 }}>
                                    <tr>
                                        <th>#</th>
                                        <th>Ime i Prezime</th>
                                        <th>Broj lične karte</th>
                                        <th>Broj telefona</th>
                                        <th>Adresa stanovanja</th>
                                        <th>Datum Rodjenja</th>
                                        <th>Pol</th>
                                        <th>Izabrani lekar</th>
                                        <th>Učitaj</th>
                                        <th>Obriši</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {pacijenti.filter((pacijent) => {
                                    return pretraga.toLowerCase() === '' ? pacijent : pacijent.imePrezime.toLowerCase().includes(pretraga.toLowerCase())
                                }).map(pacijent => (
                                    <tr key={pacijent.id}>
                                        <td>{pacijent.id}</td>
                                        <td>{pacijent.imePrezime}</td>
                                        <td>{pacijent.brojLK}</td>
                                        <td>{pacijent.brojTelefona}</td>
                                        <td>{pacijent.adresa}</td>
                                        <td>{formatDate(pacijent.datumRodjenja)}</td>
                                        <td>{pacijent.pol}</td>
                                        <td>{pacijent.izabraniLekar}</td>
                                        <td className='text-center'>
                                            <Form.Check
                                                type="radio"
                                                onChange={() => handleSelectPacijenta(pacijent.id)}
                                                checked={oznaceniZaUcitavanje.includes(pacijent.id)}
                                            />
                                        </td>                                   
                                        <td className='text-center'><Form.Check aria-label="brisanje" name="brisaci" type='radio' onChange={() => handleDeletePacijenta(pacijent.id)} checked={oznaceniZaBrisanje.includes(pacijent.id)} /></td>   
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div> 
                        
                        
        </>

    );

}

export default Tabela;