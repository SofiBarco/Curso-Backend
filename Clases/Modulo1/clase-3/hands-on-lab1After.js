class TicketManager {
    #baseProfit;

    constructor() {
        this.events = [];
        this.#baseProfit = 0.15;
    }

    getEvents = () => {
        console.log(this.events);
        return this.events;
    };

    createEvent = (name, place, price, capacity, date) => {
        const event = {
            id: this.events.length + 1,
            name,
            place,
            price: price + this.#baseProfit,
            capacity: capacity ?? 50,
            date: date ?? this.#formatDate(),
            participants:[], 
        };

        this.events.push(event);
    };

    addParticipant = (eventId, participantId) => {

    }

    #formatDate = () => {
        const date = new Date();

        const day = date.getDay();
        const month = date.getMonth();
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
  };
}
const ticketManager = new TicketManager();


ticketManager.createEvent('Dev Fest', 'Buenos Aires', 150, 100, '30/03/2023' )
ticketManager.createEvent('Comicon', 'Lima', 90)


ticketManager.getEvents();