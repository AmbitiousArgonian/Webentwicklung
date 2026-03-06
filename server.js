import "dotenv/config";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as crypto from 'crypto';
import bcrypt from 'bcryptjs';

//import { AuthService } from './src/app/auth/auth.service';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
console.log("Prisma DB URL:", process.env.DATABASE_URL);

async function ensureAdminUser() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@villa-mondial.local';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin1234';

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (existing) {
    if (existing.role !== 'admin') {
      await prisma.user.update({
        where: { email: adminEmail },
        data: { role: 'admin' }
      });
      console.log('Admin role updated for:', adminEmail);
    } else {
      console.log('Admin user exists:', adminEmail);
    }
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin'
    }
  });

  console.log('Admin user created:', adminEmail);
}


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
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });

    res.json({
      message: 'User created',
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });

  } catch (err) {
    res.status(400).json({ message: 'Email already exists' });
  }
});


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
   // Session erstellen
    const sessionId = createSession(user.id);
    // Session‑Cookie setzen
     res.cookie('sessionId', sessionId, cookieOptions);
res.json({
  message: 'Logged in',
  name: user.name,
  email: user.email,
  role: user.role
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

res.json({ loggedIn: true, id: user.id, name: user.name, email: user.email, role: user.role });

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

// CUSTOMER: get or create conversation
app.post('/api/chat/conversation', async (req, res) => {
  const sessionId = req.cookies.sessionId;
  const session = sessions[sessionId];

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = session.userId;

  let conversation = await prisma.conversation.findFirst({
    where: { customerId: userId }
  });

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: {
        customerId: userId
      }
    });
  }

  res.json(conversation);
});

// CUSTOMER: send message (creates conversation if missing)
app.post('/api/chat/messages', async (req, res) => {
  const sessionId = req.cookies.sessionId;
  const session = sessions[sessionId];

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = session.userId;
  const { text } = req.body;

  if (!text || typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ message: 'Message text is required' });
  }

  // find or create conversation
  let conversation = await prisma.conversation.findFirst({
    where: { customerId: userId }
  });

  if (!conversation) {
    conversation = await prisma.conversation.create({
      data: { customerId: userId }
    });
  }

  const msg = await prisma.message.create({
    data: {
      conversationId: conversation.id,
      senderRole: 'customer',
      text: text.trim()
    }
  });

  res.json(msg);
});


// CUSTOMER: get my messages
app.get('/api/chat/messages', async (req, res) => {
  const sessionId = req.cookies.sessionId;
  const session = sessions[sessionId];

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = session.userId;

  const conversation = await prisma.conversation.findFirst({
    where: { customerId: userId }
  });

  if (!conversation) {
    return res.json([]); // no conversation yet => no messages
  }

  const messages = await prisma.message.findMany({
    where: { conversationId: conversation.id },
    orderBy: { createdAt: 'asc' }
  });

  res.json(messages);
});


// ADMIN: get all conversations
app.get('/api/admin/chat/conversations', async (req, res) => {
  const sessionId = req.cookies.sessionId;
  const session = sessions[sessionId];

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId }
  });

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const conversations = await prisma.conversation.findMany({
    include: {
      customer: {
        select: { id: true, name: true, email: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  res.json(conversations);
});


// ADMIN: get messages of a conversation
app.get('/api/admin/chat/messages/:conversationId', async (req, res) => {
  const sessionId = req.cookies.sessionId;
  const session = sessions[sessionId];

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId }
  });

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const { conversationId } = req.params;

  const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'asc' }
  });

  res.json(messages);
});


// ADMIN: send message to a conversation
app.post('/api/admin/chat/messages/:conversationId', async (req, res) => {
  const sessionId = req.cookies.sessionId;
  const session = sessions[sessionId];

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId }
  });

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const { conversationId } = req.params;
  const { text } = req.body;

  if (!text || typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ message: 'Message text is required' });
  }

  const msg = await prisma.message.create({
    data: {
      conversationId,
      senderRole: 'admin',
      text: text.trim()
    }
  });

  res.json(msg);
});


//************ */
//app.listen(8000, () => console.log('Server running on http://localhost:8000'));
ensureAdminUser()
  .then(() => {
    app.listen(8000, () => console.log('Server running on http://localhost:8000'));
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });