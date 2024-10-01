import { app } from "./app";

const port = 5001;

const server = app.listen(port, () => {
  const appUrl = `http://localhost:${port}/health`;

  console.log(`Server is ready on: ${appUrl}`, port);
});

export { server };