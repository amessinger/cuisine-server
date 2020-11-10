import { ServiceError, ResourceDoesNotExistError } from './services.js';

export function handleErrorResponse(error, res) {
  console.log('The route received an error.', error);

  if (!(error instanceof ServiceError)) {
    console.log('The route received an error that does not inherit from ServiceError, this might be a bad design choice.');
    res.status(500).send('The server encountered an unexpected situation.');
  } else {
    if (error instanceof ResourceDoesNotExistError) {
      res.status(404).send('Resource does not exist.');  
    } else  {
      res.status(500).send('The server encountered an unexpected situation.');
    }
  }
}
