export const findBus = (timestamp: number, buses: string[]) => {
  const availableBuses = buses.filter((bus) => bus != "x").map((bus) => +bus);
  const next = availableBuses.reduce(
    (earliest, bus) => {
      const timeToNext = timeLeftToDeparture(timestamp, bus);
      if (timeToNext < earliest.wait) {
        earliest.bus = bus;
        earliest.wait = timeToNext;
        return earliest;
      }
      return earliest;
    },
    { bus: 0, wait: +Infinity }
  );

  return result(next.bus, next.wait);
};

const result = (bus: number, wait: number) => bus * wait;

const timeLeftToDeparture = (timestamp: number, bus: number) => {
  const timeLeft = bus - (timestamp % bus);
  return timeLeft;
};

export const matchBuses = (_buses: string[]) => {
  const buses = _buses
    .map((bus, i) => ({ number: +bus, offset: i }))
    .filter((bus) => !Number.isNaN(bus.number));

  let multiplier = buses[0].number;

  return buses.slice(1).reduce((x, bus) => {
    while (true) {
      if ((x + bus.offset) % bus.number === 0) {
        multiplier *= bus.number;
        break;
      }
      x += multiplier;
    }
    return x
  }, 0);
};
