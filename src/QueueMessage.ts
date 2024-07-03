export class QueueMessage {
    private queues: { [key: string]: any[] } = {};

    // Method to add a message to the specified queue
    enqueue(queueName: string, message: any): void {
        if (!this.queues[queueName]) {
            this.queues[queueName] = [];
        }
        this.queues[queueName].push(message);
    }

    async dequeue(queueName: string, timeoutMs: number): Promise<any | null> {
        const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        let startTime = Date.now();
        while (Date.now() - startTime < timeoutMs) {
            if (this.queues[queueName] && this.queues[queueName].length > 0) {
                return this.queues[queueName].shift();
            }
            await wait(100); // Check every 100ms
        }
        return null;
    }
}

