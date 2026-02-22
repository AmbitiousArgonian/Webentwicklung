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


app.post('/api/login', async (req, res) => {
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
res.json({
  message: 'Logged in',
  name: user.name,
  email: user.email
});
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



app.post('/api/booking', async (req, res) => {
  const sessionId = req.cookies.sessionId;
  const session = sessions[sessionId];

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = session.userId;

  const {
    apartment,
    startDate,
    endDate,
    adults,
    children,
    message,
    referral
  } = req.body;

  /*try {
    const booking = await prisma.booking.create({
      data: {
        apartment,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        adults,
        children,
        message,
        referral,
        userId
      }
    });*/
     try {
      let booking;

      await prisma.$transaction(async (tx) => {
       // Overlap-Check
      const overlapping = await tx.booking.findFirst({
      where: {
      apartment: apartment,

       AND: [
       { startDate: { lte: new Date(endDate) } },
       { endDate: { gte: new Date(startDate) } }
          ]
        }
      });

        if (overlapping) {
        throw new Error("OVERLAP");
        }

      // Buchung speichern
        booking = await tx.booking.create({
         data: {
           apartment,
           startDate: new Date(startDate),
           endDate: new Date(endDate),
           adults,
           children,
           message,
           referral,
           userId

             }
           });
        });

    res.json({ message: 'Booking saved', booking });

  } catch (err) {
   if (err.message === "OVERLAP") {
   return res.status(409).json({
    message: "Diese Wohnung ist im gewählten Zeitraum bereits belegt." });

  }


    console.error(err);
    res.status(500).json({ message: 'Error saving booking' });
  }
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
