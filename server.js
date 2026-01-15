import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
//import { AuthService } from './src/app/auth/auth.service';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
console.log("Prisma DB URL:", process.env.DATABASE_URL);

const app = express();
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
/*app.options('*', (req, res) => {
  res.sendStatus(200);
});*/

app.use(cookieParser());
app.use(express.json());


//const authService = new AuthService();

let users = []; // temporäre Speicherung für Demo
let sessions = {}; // sessionId -> username

function createSession(name) {
  const sessionId = Math.random().toString(36).substring(2);
  sessions[sessionId] = name;
  return sessionId;
}


/*
app.post('/api/register', (req, res) => {
  console.log('Body received:', req.body);
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

  // Überprüfe, ob E-Mail schon existiert
  if (users.find(u => u.email === email)) return res.status(400).json({ message: 'Email already exists' });

  const user = { name, email, password };
  users.push(user);
  res.json({ message: 'Registered successfully', user });
});
*/

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: { name, email, password }
    });

    res.json({ message: 'User created', user });
  } catch (err) {
    res.status(400).json({ message: 'Email already exists' });
  }
});


// LOGIN
/*
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const sessionId = createSession(user.name);
  res.cookie('sessionId', sessionId, { httpOnly: true, maxAge: 90 * 60 * 1000 });
  res.json({ message: 'Logged in' });

});
*/app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Session erzeugen
    const sessionId = Math.random().toString(36).substring(2);
    sessions[sessionId] = user.id;

    res.cookie('sessionId', sessionId, { httpOnly: true });
    res.json({ message: 'Logged in', user });
  });





// LOGOUT
app.post('/api/logout', (req, res) => {
  const sessionId = req.cookies.sessionId;
  if (sessionId) delete sessions[sessionId];
  res.clearCookie('sessionId');
  res.json({ message: 'Logged out' });
});

// SESSION CHECK
/*
app.get('/api/session', (req, res) => {
  const name = sessions[req.cookies.sessionId];
  res.json({ loggedIn: !!name, name });
});
*/
app.get('/api/session', async (req, res) => {
  const sessionId = req.cookies.sessionId;
  const userId = sessions[sessionId];

  if (!userId) {
    return res.json({ loggedIn: false });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  res.json({ loggedIn: true, name: user.name, email: user.email });
});

// HAUFPTSEITE DATA
app.get('/api/home', (req, res) => {
  res.json({ message: 'Willkommen auf der Hauptseite!', time: new Date() });
});

app.listen(8000, () => console.log('Server running on http://localhost:8000'));
