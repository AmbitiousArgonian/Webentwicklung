import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as crypto from 'crypto';

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


app.use(cookieParser());
app.use(express.json());


//const authService = new AuthService();

let users = []; // temporäre Speicherung für Demo
//let sessions = {}; // sessionId -> username

let sessions = {};

function createSession(userId) {
  const sessionId = crypto.randomBytes(32).toString('hex');

  sessions[sessionId] = {
    userId: userId,
    createdAt: Date.now()
  };

  return sessionId;
}

const cookieOptions = {
 httpOnly: true,
 secure: false, // bei HTTPS auf true setzen
 sameSite: 'lax',
  maxAge: 90 * 60 * 1000, // 90 Minuten
 path: '/'
  };



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


*/app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

   // Session erstellen
    const sessionId = createSession(user.id);
    // Session‑Cookie setzen
     res.cookie('sessionId', sessionId, cookieOptions);
      res.json({ message: 'Logged in' });
       });




// LOGOUT
app.post('/api/logout', (req, res) => {
  const sessionId = req.cookies.sessionId;

  if (sessionId) delete sessions[sessionId];

 // Cookie löschen
 res.clearCookie('sessionId', { path: '/' });
 res.json({ message: 'Logged out' });
});


app.get('/api/session', async (req, res) => {
  const sessionId = req.cookies.sessionId;
 const session = sessions[sessionId];

 if (!session) {
 return res.json({ loggedIn: false });
 }

 const user = await prisma.user.findUnique({
 where: { id: session.userId }
  });

   if (!user) { return res.json({ loggedIn: false }); }

  res.json({ loggedIn: true, name: user.name, email: user.email });
});

// HAUFPTSEITE DATA
app.get('/api/home', (req, res) => {
 const sessionId = req.cookies.sessionId;

 if (!sessions[sessionId]) {
 return res.status(401).json({ message: 'Not authenticated' });
 }

  res.json({
  message: 'Willkommen auf der Hauptseite!', time: new Date()
   });
});

app.listen(8000, () => console.log('Server running on http://localhost:8000'));
