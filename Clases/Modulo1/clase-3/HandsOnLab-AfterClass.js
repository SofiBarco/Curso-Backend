class TicketManager {
    #precioBaseDeGanancia;

    constructor () {
        this.eventos = [];
        this.#precioBaseDeGanancia = 0.15;
    }

    getEvents = () => {
        console.log(this.eventos);
        return;
    };

    createEvent = (nombre, lugar, precio, capacidad, fecha) => {
        const event = {
            id: this.eventos.length + 1,
            nombre,
            lugar,
            precio: precio + this.#precioBaseDeGanancia,
            capacidad: capacidad ?? 50,
            fecha: fecha ?? this.#formatDate(),
            participantes: [],
        };

        this.eventos.push(event);
    };

    addParticipant = (eventId, ParticipantId) => {
       const eventIndex = this.eventos.findIndex((event) => event.id === eventId);
        
       if (eventIndex === -1) {
            console.log('This event does not exist');
            return;
       }

       const participantExists =
       this.eventos[eventIndex].participantes.includes(ParticipantId);

       if(participantExists) {
        console.log('The user has already singed up for this event');
        return;
       }


       this.eventos[eventIndex].participantes.push(ParticipantId);
    };

    ReprogramarEvento = (eventId, newLugar, newFecha) => {
      const event = this.eventos.find((event) => event.id === eventId) 

      if(!event) {
        console.log('Event not found');
        return;
      }

      const newEvent = {
            ...event,
            id: this.eventos.length + 1,
            lugar: newLugar,
            fecha: newFecha,
            participantes:[],
      };
        this.eventos.push(newEvent);
    };


    #formatDate = () => {
        const date = new Date();

        const day = date.getDay();
        const month = date.getMonth();
        const year = date.getFullYear();

        return `${day}/${month}/${year}`
    }
}

const ticketManager = new TicketManager();


ticketManager.createEvent('Dev Fest', 'Buenos Aires', 150, 100, '30/03/2023')
ticketManager.createEvent('Comicon', 'Lima', 90);

ticketManager.addParticipant(1, 1);

ticketManager.ReprogramarEvento(1, 'Santiago', '30/06/2023');
ticketManager.getEvents();
