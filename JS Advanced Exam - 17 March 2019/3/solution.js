class Hotel {
  constructor(name, capacity) {
    this.name = name;
    this.capacity = capacity;
    this.bookings = [];
    this.currentBookingNumber = 1;
    this.roomCapacity = {
      single: Math.round(this.capacity * 0.5),
      double: Math.round(this.capacity * 0.3),
      maisonette: Math.round(this.capacity * 0.2)
    };
  }

  _roomPrices = { single: 50, double: 90, maisonette: 135 };
  _servicesPricing = { food: 10, drink: 15, housekeeping: 25 };

  get roomPricing() {
    return this._roomPrices;
  }

  get servicesPricing() {
    return this._servicesPricing;
  }

  rentARoom(clientName, roomType, nights) {
    if (this.roomCapacity[roomType] === 0) {
      let availables = Object.entries(this.roomCapacity)
        .filter(x => x[1] > 0)
        .map(x => `Available ${x[0]} rooms: ${x[1]}.`)
        .join(" ");

      return `No ${roomType} rooms available! ${availables}`;
    }
    this.roomCapacity[roomType]--;
    let roomNumber = this.currentBookingNumber++;
    this.bookings.push({
      clientName,
      roomType,
      nights,
      roomNumber
    });
    return `Enjoy your time here Mr./Mrs. ${clientName}. Your booking is ${roomNumber}.`;
  }

  roomService(currentBookingNumber, serviceType) {
    let booking = this.bookings.find(
      x => x.roomNumber === currentBookingNumber
    );
    if (typeof booking === "undefined") {
      return `The booking ${currentBookingNumber} is invalid.`;
    }

    if (typeof this.servicesPricing[serviceType] === "undefined") {
      return `We do not offer ${serviceType} service.`;
    }

    if (!booking.hasOwnProperty("services")) {
      booking["services"] = [];
    }
    booking["services"].push(serviceType);
    return `Mr./Mrs. ${booking.clientName}, Your order for ${serviceType} service has been successful.`;
  }

  checkOut(currentBookingNumber) {
    let booking = this.bookings.find(
      x => x.roomNumber === currentBookingNumber
    );
    if (typeof booking === "undefined") {
      return `The booking ${currentBookingNumber} is invalid.`;
    }
    this.bookings = this.bookings.filter(x => x !== booking); //???
    this.roomCapacity[booking.roomType]++;

    let cost = this.roomPricing[booking.roomType] * booking.nights;
    if (!booking.hasOwnProperty("services")) {
      return `We hope you enjoyed your time here, Mr./Mrs. ${booking.clientName}. The total amount of money you have to pay is ${cost} BGN.`;
    }
    let additionalSevices = 0;
    booking["services"].forEach(s => {
      additionalSevices += this.servicesPricing[s];
    });
    return `We hope you enjoyed your time here, Mr./Mrs. ${
      booking.clientName
    }. The total amount of money you have to pay is ${cost +
      additionalSevices} BGN. You have used additional room services, costing ${additionalSevices} BGN.`;
  }

  report() {
    let resultStr = `${this.name.toUpperCase()} DATABASE:\n${"-".repeat(20)}\n`;
    if (this.bookings.length === 0) {
      return resultStr + "There are currently no bookings.";
    }
    let info = this.bookings
      .map(x => {
        let info = `bookingNumber - ${x.roomNumber}\nclientName - ${x.clientName}\nroomType - ${x.roomType}\nnights - ${x.nights}`;
        if (typeof x["services"] !== "undefined") {
          info += `\nservices: ${x["services"].join(", ")}`;
        }
        return info;
      })
      .join(`\n${"-".repeat(10)}\n`);
    return resultStr + info;
  }
}

let hotel = new Hotel("HotUni", 10);
console.log(hotel.report());

console.log(hotel.rentARoom("Peter", "single", 4));
console.log(hotel.rentARoom("Robert", "double", 4));
console.log(hotel.rentARoom("Geroge", "maisonette", 6));

console.log(hotel.checkOut(2));

hotel.roomService(3, "housekeeping");
hotel.roomService(3, "drink");
hotel.roomService(2, "room");

console.log(hotel.report());
