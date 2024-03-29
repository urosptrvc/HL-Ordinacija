import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/PrijemPacijenta.css';
import React, {useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';

function PrijemPacijenta ({ handleObjekat, handleObjekatCekanje , pacijentData , busenProvera}){


    const [unos, setUnos] = useState({
        imePrezime: '',
        brojLK: '',
        brojTelefona: '',
        Adresa: '',
        datumRodjenja: '',
        pol: '',
        izabraniLekar: ''
    });

    useEffect(() => {
        if (pacijentData) {
            setUnos({
                imePrezime: pacijentData.imePrezime || '',
                brojLK: pacijentData.brojLK || '',
                brojTelefona: pacijentData.brojTelefona || '',
                Adresa: pacijentData.adresa || '',
                datumRodjenja: pacijentData.datumRodjenja || '',
                pol: pacijentData.pol || '',
                izabraniLekar: pacijentData.izabraniLekar || ''
            });
        }
    }, [pacijentData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUnos(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const isFormValid = unos.imePrezime.trim() !== '' &&
            unos.brojLK.trim() !== '' &&
            unos.brojTelefona.trim() !== '' &&
            unos.Adresa.trim() !== '' &&
            unos.datumRodjenja.trim() !== '' &&
            unos.pol !== '' &&
            unos.izabraniLekar !== '';

        if (!isFormValid) {
            busenProvera("1",null)
            return;
        } 

        if (unos.brojLK.trim().length !== 9) {
            busenProvera("2",null)
            return;
        }



        const noviObjekat = {
          imePrezime: unos.imePrezime,
          brojLK: unos.brojLK,
          brojTelefona: unos.brojTelefona,
          adresa: unos.Adresa,
          datumRodjenja: unos.datumRodjenja,
          pol: unos.pol,
          izabraniLekar: unos.izabraniLekar
        };

        busenProvera("3", noviObjekat.imePrezime)

        if(noviObjekat!=null){
            console.log('Kreiran objekat:', noviObjekat);
            handleObjekat(noviObjekat);
        }

        unos.imePrezime = '';
        unos.brojLK = '';
        unos.brojTelefona = '';
        unos.Adresa = '';
        unos.datumRodjenja = '';
        unos.pol = '';
        unos.izabraniLekar = '';
 
      };



    const unosCekanje = (e) => {
        e.preventDefault();
        
        const isFormValid = unos.imePrezime.trim() !== '' &&
            unos.brojLK.trim() !== '' &&
            unos.brojTelefona.trim() !== '' &&
            unos.Adresa.trim() !== '' &&
            unos.datumRodjenja.trim() !== '' &&
            unos.pol !== '' &&
            unos.izabraniLekar !== '';

        if (!isFormValid) {
            busenProvera("1",null)
            return;
        } 

        if (unos.brojLK.trim().length !== 9) {
            busenProvera("2",null)
            return;
        }



        const noviObjekat = {
          imePrezime: unos.imePrezime,
          brojLK: unos.brojLK,
          brojTelefona: unos.brojTelefona,
          adresa: unos.Adresa,
          datumRodjenja: unos.datumRodjenja,
          pol: unos.pol,
          izabraniLekar: unos.izabraniLekar
        };

        busenProvera("3", noviObjekat.imePrezime)

        if(noviObjekat!=null){
            console.log('Kreiran objekat:', noviObjekat);
            handleObjekatCekanje(noviObjekat);
        }

        unos.imePrezime = '';
        unos.brojLK = '';
        unos.brojTelefona = '';
        unos.Adresa = '';
        unos.datumRodjenja = '';
        unos.pol = '';
        unos.izabraniLekar = '';
 

        // Možete uraditi nešto sa novim objektom ovde, kao što je slanje na server ili ažuriranje stanja aplikacije.
      };

      return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Ime, Roditelj, Prezime</Form.Label>
                    <Form.Control type="text" placeholder="Unesi ime, roditelj, prezime" name="imePrezime" value={unos.imePrezime} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Broj lične karte</Form.Label>
                    <Form.Control type="number" placeholder="Unesi broj lične karte" name="brojLK" value={unos.brojLK} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Broj telefona</Form.Label>
                    <Form.Control type="number" placeholder="Unesi broj telefona" name="brojTelefona" value={unos.brojTelefona} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Adresa</Form.Label>
                    <Form.Control type="text" placeholder="Unesi adresu" name="Adresa" value={unos.Adresa} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Datum rodjenja</Form.Label>
                    <Form.Control type="date" placeholder="Unesi datum rodjenja" name="datumRodjenja" value={unos.datumRodjenja} onChange={handleChange} />
                </Form.Group>

                <div className="row mb-3">
                    <div className="col-5">
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Label>Pol</Form.Label> <br />
                            <Form.Check
                                type="radio"
                                label="Muško"
                                value="Muško" checked={unos.pol === 'Muško'} onChange={handleChange}
                                name="pol"
                                id="Muško"
                            />
                            <Form.Check
                                type="radio"
                                label="Žensko"
                                value="Žensko" checked={unos.pol === 'Žensko'} onChange={handleChange}
                                name="pol"
                                id="Žensko"
                            />
                        </Form.Group>
                    </div>

                    <div className="col-5">
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Label>Lekar</Form.Label> <br />
                            <Form.Check
                                type="radio"
                                label="Nataša Djorić"
                                value="Nataša Djorić" checked={unos.izabraniLekar === 'Nataša Djorić'} onChange={handleChange}
                                name="izabraniLekar"
                                id="Nataša Djorić"
                            />
                            <Form.Check
                                type="radio"
                                label="Milica Arsić"
                                value="Milica Arsić" checked={unos.izabraniLekar === 'Milica Arsić'} onChange={handleChange}
                                name="izabraniLekar"
                                id="Milica Arsić"
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="submit-dugme">
                    <Button variant="success" type="submit" style={{ marginRight: '10px' }}>
                        Sačuvaj i upiši pacijenta
                    </Button>
                    <Button variant="success" type="button" onClick={unosCekanje}>
                        Upiši u listu čekanja
                    </Button>
                </div>
            </Form>

        </>
    );

}

export default PrijemPacijenta;