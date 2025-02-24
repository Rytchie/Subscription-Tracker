import {Router} from 'express';

const subscriptionsRouter = Router();

subscriptionsRouter.get('/', (req, res) => res.send({title: 'GET all subscriptions'}));

subscriptionsRouter.get('/id', (req, res) => res.send({title: 'GET subscription details'}));

subscriptionsRouter.post('/', (req, res) => res.send({title: 'CREATE a subscription'}));

subscriptionsRouter.put('/', (req, res) => res.send({title: 'UPDATE subscriptions'}));

subscriptionsRouter.delete('/', (req, res) => res.send({title: 'DELETE subscriptions'}));

subscriptionsRouter.get('/users/:id', (req, res) => res.send({title: 'GET all users subscriptions'}));

subscriptionsRouter.put('/user/:id', (req, res) => res.send({title: 'CANCEL subscriptions'}));

subscriptionsRouter.get('/', (req, res) => res.send({title: 'GET upcoming renewals'}));

export default subscriptionsRouter;