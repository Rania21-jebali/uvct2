import React from 'react'
import { Button, Form } from 'react-bootstrap'
import '../../Formation.css'
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import MovieIcon from '@material-ui/icons/Movie';


function Informations() {
  return (
    <div>
    <Form className="form-event" >
          <Form.Group className="mb-3" >
             <Form.Label className="label">Titre du formation</Form.Label>
              <Form.Control type="text" 
              placeholder="HR management diploma" 
              name="titre"
              required 
              />
          </Form.Group>
          <Form.Group className="mb-3" >
          <Form.Label className="label">Description</Form.Label>
            <Form.Control as="textarea" rows={5} 
            placeholder="Ecrire ici..." 
            name="details" 
            required 
          />
          </Form.Group>
          <Form.Group className="mb-3" >
          <Form.Label className="label">L’affiche</Form.Label>
          <div className="content-affiche">
              <Form.Label htmlFor="file" > 
              <p> <PhotoSizeSelectActualIcon /> Séléctionnez une image </p>
              </Form.Label>
              </div>
            <Form.Control type="file" id="file"
                style={{display:"none"}}
          />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Vidéo promotionnelle</Form.Label>
            <div className="content-affiche">
              <Form.Label htmlFor="file" > 
              <p> <MovieIcon /> Séléctionnez un vidéo </p>
              </Form.Label>
              </div>
            <Form.Control type="file" id="file"
                style={{display:"none"}}
          />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Catégorie</Form.Label>
            <Form.Select 
                required 
                name="categorie">
                <option value="développement web">développement web</option>
                <option value="développement mobile">développement mobile</option>
                <option value="développement personnel">développement personnel</option>
                <option value="design">design</option>
                <option value="business">business</option>
                <option value="design">design</option>
                <option value="communication">communication</option>
                <option value="photographie">photographie</option>
                <option value="mode de vie">design</option>
                <option value="musique">musique</option>
        </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Niveau</Form.Label>
            <Form.Select 
                required 
                name="Niveau">
                <option value="développement web">Débutant</option>
                <option value="développement mobile">Expert</option>
        </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Prix
            <Form.Check 
            type="switch"
            id="custom-switch"
            label="Gratuit"
          />
          </Form.Label>
            <Form.Control type="number"
            placeholder="0,000 Dt"
            name="prix"
            />
          </Form.Group>
      <div className="content-btn">
          <Button className='btn-annnuler'>Annuler</Button>
          <Button  className='btn-confirme'  type="submit">Confirmer</Button>
      </div>
    </Form>
    </div>
  )
}

export default Informations