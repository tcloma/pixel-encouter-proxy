import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
dotenv.config();
const port = process.env.PORT;
const baseUrl = process.env.API_URL;

app.get('/', (req, res) => {
   res.send({ message: 'Hello from Proxy! 👋' });
});

app.get('/json/random', async (req, res) => {
   const data = await fetch(`${baseUrl}/basic/monsters/random/json`);
   res.send(await data.json());
});

app.get('/json/custom', async (req, res) => {
   const {
      primaryColor = 'FFFFFF',
      secondaryColor = 'FFFFFF',
      fillType = '0',
   } = req.query;
   const data = await fetch(
      `${baseUrl}/basic/svgmonsters/json?primaryColor=%23${primaryColor}&secondaryColor=%23${secondaryColor}&fillType=${fillType}`
   );
   res.send(await data.json());
});

app.listen(port, () => {
   console.log(`🪐 Server listening at http://localhost:${port} ✨`);
});
