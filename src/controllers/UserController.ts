import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { Request, Response } from 'express';

import UserService from '../services/UserService';

const GET = {};

const POST = {
    createUser: async (req: Request, res: Response) => {
        try {
            const { kordy, email, password, name } = req.body;

            const userService = new UserService();

            const hash = await bcrypt.hash(password, 8);

            userService
                .createUser({ kordy, email, password: hash, name })
                .then((user) => res.status(201).send(user))
                .catch((error) => res.status(500).send(error));
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },

    auth: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const userService = new UserService();

            const user = await userService.getUserByAttribute('email', email);

            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new Error('Invalid credentials');
            }

            const userPayload = {
                id: user.id,
                kordy: user.kordy,
                email: user.email,
            };

            const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
                expiresIn: '1d',
            });

            res.status(200).send({ token });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    },
};

export default { ...GET, ...POST };
