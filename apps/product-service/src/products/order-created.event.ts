export class OrderCreatedEvent {
    constructor(
        public readonly title: string,
        public readonly userId: number,
        public readonly productId: number,
    ){}

    toString() {
        return JSON.stringify({
            title: this.title,
            userId: this.userId,
            productId: this.productId
        });
    }
}