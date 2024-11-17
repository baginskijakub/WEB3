import express from 'express'
import { createUserEndpoint } from './user.create'
import { loginUserEndpoint } from './user.login'

const router = express.Router();

router.post("/register", createUserEndpoint);
router.post("/login", loginUserEndpoint);


export default router;