import supertest from 'supertest';
import { database, server } from '../../main.js';

const request = supertest(server);

async function resetDatabase() {
  await database.sync({force: true});
}

beforeEach(async () => {
  await resetDatabase();
});

it('GET /', async done => {
  const response = await request.get('/');

  expect(response.status).toBe(200);
  expect(response.text).toBe('ok');
  done();
});

it('GET /recipes', async done => {
  await database.models.recipe.create({
    title: 'title',
    body: 'body'
  });

  const response = await request.get('/recipes');

  expect(response.status).toBe(200);
  expect(response.body.length).toBe(1);
  done();
});

it('POST /recipes', async done => {
  const payload = {
    title: 'title',
    body: 'body'
  };
  const response = await request.post('/recipes').send(payload);

  expect(response.status).toBe(200);
  expect(response.body.id).toBe(1);
  expect(response.body.title).toBe('title');
  expect(response.body.body).toBe('body');
  expect(await database.models.recipe.count()).toBe(1);
  done();
});

it('GET /recipes/1', async done => {
  await database.models.recipe.create({
    title: 'title',
    body: 'body'
  });

  const response = await request.get('/recipes/1');

  expect(response.status).toBe(200);
  expect(response.body.id).toBe(1);
  expect(response.body.title).toBe('title');
  expect(response.body.body).toBe('body');
  done();
});

it('PUT /recipes', async done => {
  await database.models.recipe.create({
    title: 'title',
    body: 'body'
  });

  const payload = {
    title: 'title updated',
    body: 'body updated'
  };
  const response = await request.put('/recipes/1').send(payload);

  expect(response.status).toBe(200);
  expect(response.body.id).toBe(1);
  expect(response.body.title).toBe('title updated');
  expect(response.body.body).toBe('body updated');
  expect(await database.models.recipe.count()).toBe(1);
  done();
});

it('PATCH /recipes', async done => {
  await database.models.recipe.create({
    title: 'title',
    body: 'body'
  });

  const payload = {
    title: 'title updated'
  };
  const response = await request.patch('/recipes/1').send(payload);

  expect(response.status).toBe(200);
  expect(response.body.id).toBe(1);
  expect(response.body.title).toBe('title updated');
  expect(response.body.body).toBe('body');
  expect(await database.models.recipe.count()).toBe(1);
  done();
});

it('DELETE /recipes/1', async done => {
  await database.models.recipe.create({
    title: 'title',
    body: 'body'
  });

  const response = await request.delete('/recipes/1');

  expect(response.status).toBe(200);
  expect(await database.models.recipe.count()).toBe(0);
  done();
});