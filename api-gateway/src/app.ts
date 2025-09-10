import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const HG_BASE = process.env.HG_BASE || 'http://localhost:4002';
const USER_BASE = process.env.USER_BASE || 'http://localhost:4001';

// Proxy routes
app.post('/api/health-goals', async (req, res) => {
  try {
    const r = await axios.post(`${HG_BASE}/health-goals`, req.body, { headers: { authorization: req.headers.authorization ?? '' } });
    res.status(r.status).json(r.data);
  } catch (err: any) {
    const status = err.response?.status || 500;
    res.status(status).json(err.response?.data || { message: err.message });
  }
});

app.get('/api/health-goals', async (req, res) => {
  try {
    const r = await axios.get(`${HG_BASE}/health-goals`, { headers: { authorization: req.headers.authorization ?? '' } });
    res.json(r.data);
  } catch (err: any) {
    const status = err.response?.status || 500;
    res.status(status).json(err.response?.data || { message: err.message });
  }
});
app.put('/api/health-goals/:id', async (req, res) => {
  try {
    const r = await axios.put(
      `${HG_BASE}/health-goals/${req.params.id}`,
      req.body,
      { headers: { authorization: req.headers.authorization ?? '' } }
    );
    res.status(r.status).json(r.data);
  } catch (err: any) {
    const status = err.response?.status || 500;
    res.status(status).json(err.response?.data || { message: err.message });
  }
});

// Delete a health goal
app.delete('/api/health-goals/:id', async (req, res) => {
  try {
    const r = await axios.delete(
      `${HG_BASE}/health-goals/${req.params.id}`,
      { headers: { authorization: req.headers.authorization ?? '' } }
    );
    res.status(r.status).json(r.data);
  } catch (err: any) {
    const status = err.response?.status || 500;
    res.status(status).json(err.response?.data || { message: err.message });
  }
});


app.post('/api/users/register', async (req, res) => {
  try {
    
    const r = await axios.post(`${USER_BASE}/users/register`, req.body);
    res.status(r.status).json(r.data);
  } catch (err: any) {
    const status = err.response?.status || 500;
    res.status(status).json(err.response?.data || { message: err.message });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {

    const r = await axios.post(`${USER_BASE}/users/login`, req.body);
    res.status(r.status).json(r.data);
  } catch (err: any) {
    console.log('err: ', err);
    const status = err.response?.status || 500;
    res.status(status).json(err.response?.data || { message: err.message });
  }
});
app.get('/api/users/me', async (req, res) => {
  try {

     const r = await axios.get(`${USER_BASE}/users/me`, { headers: { authorization: req.headers.authorization ?? '' } });
    res.status(r.status).json(r.data);
  } catch (err: any) {
    console.log('err: ', err);
    const status = err.response?.status || 500;
    res.status(status).json(err.response?.data || { message: err.message });
  }
});
app.get('/health', (_req, res) => res.json({ status: 'api-gateway OK' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`api-gateway listening ${PORT}`));

export default app;
