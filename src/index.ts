import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { QueueMessage } from './QueueMessage';

const app = express();
const port = 3000;

const queueMessage = new QueueMessage();

app.use(bodyParser.json());

app.post('/api/:queueName', (req: Request, res: Response) => {
    const queueName = req.params.queueName;
    const message = req.body;
    queueMessage.enqueue(queueName, message);
    res.status(200).send('Message enqueued successfully');
});

app.get('/api/:queueName', async (req: Request, res: Response) => {
    const queueName = req.params.queueName;
    const timeoutMs = parseInt(req.query.timeout as string) || 10000; // default timeout 10 seconds

    const message = await queueMessage.dequeue(queueName, timeoutMs);
    if (message) {
        res.json(message);
    } else {
        res.status(204).send('no message');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
