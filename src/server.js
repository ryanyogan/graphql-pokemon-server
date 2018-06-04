import express from 'express';
import setupMiddleware from './middleware';
import { connect } from './db';

const app = express();

setupMiddleware(app);
connect();

app.use('*', (req, res) => res.json({ ok: true }));

export default app;
