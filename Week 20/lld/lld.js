class ParkingLot {
  constructor(capacity) {
    this.capacity = capacity;
    this.slots = new Array(capacity);
    this.registrationNumbersByColor = {};
    this.slotNumbersByColor = {};
    this.slotNumberByRegistrationNumber = {};
  }

  parkCar(registrationNumber, color) {
    if (this.isFull()) {
      return "Sorry, parking lot is full";
    }

    const slotNumber = this.getNextAvailableSlot();
    this.slots[slotNumber] = { registrationNumber, color };

    this.updateDataStructures(slotNumber, registrationNumber, color);

    return `Allocated slot number: ${slotNumber + 1}`;
  }

  leaveSlot(slotNumber) {
    if (this.isValidSlot(slotNumber)) {
      const { registrationNumber, color } = this.slots[slotNumber];

      delete this.slots[slotNumber];
      this.removeDataStructures(slotNumber, registrationNumber, color);

      return `Slot number ${slotNumber + 1} is free`;
    }

    return "Invalid slot number";
  }

  getStatus() {
    let status = "Slot No. Registration No Colour\n";

    this.slots.forEach((slot, index) => {
      if (slot) {
        const { registrationNumber, color } = slot;
        status += `${index + 1} ${registrationNumber} ${color}\n`;
      }
    });

    return status.trim();
  }

  getRegistrationNumbersByColor(color) {
    if (this.registrationNumbersByColor[color]) {
      return this.registrationNumbersByColor[color].join(", ");
    }

    return "Not found";
  }

  getSlotNumbersByColor(color) {
    if (this.slotNumbersByColor[color]) {
      return this.slotNumbersByColor[color].join(", ");
    }

    return "Not found";
  }

  getSlotNumberByRegistrationNumber(registrationNumber) {
    if (this.slotNumberByRegistrationNumber[registrationNumber]) {
      return this.slotNumberByRegistrationNumber[registrationNumber] + 1;
    }

    return "Not found";
  }

  isFull() {
    return !this.slots.every((slot) => slot !== undefined);
  }

  getNextAvailableSlot() {
    return this.slots.findIndex((slot) => slot === undefined);
  }

  isValidSlot(slotNumber) {
    return (
      slotNumber >= 0 && slotNumber < this.capacity && this.slots[slotNumber]
    );
  }

  updateDataStructures(slotNumber, registrationNumber, color) {
    if (!this.registrationNumbersByColor[color]) {
      this.registrationNumbersByColor[color] = [];
    }
    this.registrationNumbersByColor[color].push(registrationNumber);

    if (!this.slotNumbersByColor[color]) {
      this.slotNumbersByColor[color] = [];
    }
    this.slotNumbersByColor[color].push(slotNumber + 1);

    this.slotNumberByRegistrationNumber[registrationNumber] = slotNumber;
  }

  removeDataStructures(slotNumber, registrationNumber, color) {
    const regNumbers = this.registrationNumbersByColor[color];
    const slotNumbers = this.slotNumbersByColor[color];

    const regIndex = regNumbers.indexOf(registrationNumber);
    const slotIndex = slotNumbers.indexOf(slotNumber + 1);

    if (regIndex !== -1) {
      regNumbers.splice(regIndex, 1);
    }
    if (slotIndex !== -1) {
      slotNumbers.splice(slotIndex, 1);
    }

    delete this.slotNumberByRegistrationNumber[registrationNumber];
  }
}

// Test commands
function processCommand(command) {
  const parts = command.trim().split(" ");
  const action = parts[0];

  if (action === "create_parking_lot") {
    const capacity = parseInt(parts[1]);
    parkingLot = new ParkingLot(capacity);
    return `Created a parking lot with ${capacity} slots`;
  } else if (!parkingLot) {
    return "Please create a parking lot first";
  }

  switch (action) {
    case "park":
      const registrationNumber = parts[1];
      const color = parts[2];
      return parkingLot.parkCar(registrationNumber, color);

    case "leave":
      const slotNumber = parseInt(parts[1]) - 1;
      return parkingLot.leaveSlot(slotNumber);

    case "status":
      return parkingLot.getStatus();

    case "registration_numbers_for_cars_with_colour":
      const colorToSearch = parts[1];
      return parkingLot.getRegistrationNumbersByColor(colorToSearch);

    case "slot_numbers_for_cars_with_colour":
      const colorToSearchSlots = parts[1];
      return parkingLot.getSlotNumbersByColor(colorToSearchSlots);

    case "slot_number_for_registration_number":
      const regNumberToSearch = parts[1];
      return parkingLot.getSlotNumberByRegistrationNumber(regNumberToSearch);

    default:
      return "Invalid command";
  }
}

// Process commands from file or interactive prompt
function processCommands(input) {
  const lines = input.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const command = lines[i].trim();
    if (command === "exit") {
      break;
    }

    const output = processCommand(command);
    console.log(output);
  }
}

// Example usage with interactive prompt
const interactiveInput = `create_parking_lot 6
park KA-01-HH-1234 White
park KA-01-HH-9999 White
park KA-01-BB-0001 Black
park KA-01-HH-7777 Red
park KA-01-HH-2701 Blue
park KA-01-HH-3141 Black
leave 4
status
park KA-01-P-333 White
park DL-12-AA-9999 White
registration_numbers_for_cars_with_colour White
slot_numbers_for_cars_with_colour White
slot_number_for_registration_number KA-01-HH-3141
slot_number_for_registration_number MH-04-AY-1111
exit`;

processCommands(interactiveInput);
