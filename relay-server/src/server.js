import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';

const app = express();
const port = Number(process.env.PORT || 8080);
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';

if (!token || !chatId) {
  console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
  process.exit(1);
}

const corsOptions = {
  origin: allowedOrigin === '*' ? true : allowedOrigin.split(',').map((v) => v.trim()),
  credentials: false
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024
  }
});

function telegramApiUrl(method) {
  return `https://api.telegram.org/bot${token}/${method}`;
}

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/sendMessage', async (req, res) => {
  try {
    const { text, parse_mode } = req.body || {};
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ ok: false, error: 'text is required' });
    }

    const telegramResponse = await fetch(telegramApiUrl('sendMessage'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: parse_mode || 'HTML'
      })
    });

    const data = await telegramResponse.json();
    return res.status(telegramResponse.status).json(data);
  } catch (error) {
    console.error('sendMessage relay error:', error);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

app.post('/sendDocument', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ ok: false, error: 'document is required' });
    }

    const body = new FormData();
    body.append('chat_id', chatId);
    body.append('document', new Blob([req.file.buffer], { type: req.file.mimetype }), req.file.originalname);

    if (req.body?.caption && typeof req.body.caption === 'string') {
      body.append('caption', req.body.caption);
    }

    const telegramResponse = await fetch(telegramApiUrl('sendDocument'), {
      method: 'POST',
      body
    });

    const data = await telegramResponse.json();
    return res.status(telegramResponse.status).json(data);
  } catch (error) {
    console.error('sendDocument relay error:', error);
    return res.status(500).json({ ok: false, error: 'internal_error' });
  }
});

app.listen(port, () => {
  console.log(`Telegram relay server is running on port ${port}`);
});
