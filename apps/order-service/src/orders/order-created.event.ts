export class OrderCreatedEvent {
    constructor(
        public readonly title: string,
        public readonly userId: number,
        public readonly productId: number,
    ){}
}