import express from 'express'

const router = express.Router();

router.post("/", (_, res) => {
  res.send("Health");
})


export default router;