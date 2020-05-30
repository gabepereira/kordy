import { Router } from 'express';

//Controllers
import UserController from './controllers/UserController';
import ChatController from './controllers/ChatController';

// Middlewares
import isAuth from './middlewares/isAuth';

const router = Router();

router.get('/', (_req, res) => {
    res.json({ version: 'Ultra beta - alpha - sub - test - 0.0.1' });
});

// User
router.post('/createUser', UserController.createUser);
router.post('/auth', UserController.auth);

// Chat
router.get('/chat/:chatId', isAuth, ChatController.getChat);
router.get('/chats', isAuth, ChatController.getChats);
router.post('/createChat', isAuth, ChatController.createChat);
router.post('/joinChat', isAuth, ChatController.joinChat);

// Message
router.get('/messages/:chatId', isAuth, ChatController.getMessagesByChatId);
router.post('/sendMessage', isAuth, ChatController.sendMessage);

export default router;
