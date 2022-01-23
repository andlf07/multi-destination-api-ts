import express, { Router, Response } from 'express';

export const home = express.Router();


home.get('/welcome', ( req, res: Response ) => {
   res.json({
      hi: "Welcome to multi-destinaion-api"
   });
});
