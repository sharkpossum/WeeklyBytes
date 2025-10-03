import express = require("express");
import type { Request, Response, Router } from 'express';

const router : Router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('GET on /meals');
});

module.exports = router