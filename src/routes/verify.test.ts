import request from 'supertest';
import app from '../app';

describe('POST /verify', () => {
  it('should return 200 if signature is valid', async () => {
    const response = await request(app)
      .post('/verify')
      .send({
        message: 'This is a text message', // lower
        address: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
        signature: '0x2aeaa98e26062cf65161c68c5cb7aa31ca050cb5bdd07abc80a475d2a2eebc7b7a9c9546fbdff971b29419ddd9982bf4148c81a49df550154e1674a6b58bac84',
      });

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.message).toBe('Signature is valid.');
  });

  it('should return 401 if signature is invalid', async () => {
    const response = await request(app)
      .post('/verify')
      .send({
        message: 'Test is a different text message', // upper
        address: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
        signature: '0x2aeaa98e26062cf65161c68c5cb7aa31ca050cb5bdd07abc80a475d2a2eebc7b7a9c9546fbdff971b29419ddd9982bf4148c81a49df550154e1674a6b58bac84',
      });

    expect(response.status).toBe(401);
    expect(response.body.ok).toBe(false);
    expect(response.body.message).toBe('Signature is invalid.');
  });

  it('should return 400 if the address validation fails', async () => {
    const response = await request(app)
      .post('/verify')
      .send({
        message: 'This is a text message', 
        address: 'invalid',
        signature: '0x2aeaa98e26062cf65161c68c5cb7aa31ca050cb5bdd07abc80a475d2a2eebc7b7a9c9546fbdff971b29419ddd9982bf4148c81a49df550154e1674a6b58bac84',
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid Polkadot address');
  });
  it('should return 400 if the signature is invalid', async () => {
    const response = await request(app)
      .post('/verify')
      .send({
        message: 'This is a text message', 
        address: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
        signature: 'asd',
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid signature length');
  });

  it('should return 400 if the address is invalid', async () => {
    const response = await request(app)
      .post('/verify')
      .send({
        message: '',
        address: '',
        signature: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});
