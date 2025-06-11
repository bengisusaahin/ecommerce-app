import { MICROSERVICES } from '@ecommerce/types';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class OrderKafkaProducerService implements OnModuleInit {
    private kafka = new Kafka({
        brokers: [`${MICROSERVICES.KAFKA.host}:${MICROSERVICES.KAFKA.port}`]
    });
    private producer = this.kafka.producer();
    async onModuleInit() {
        await this.producer.connect();
    }
    async emit(topic: string, message: any) {
        await this.producer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }],
        });
    }
}