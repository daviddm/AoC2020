enum Map {
  Tree = "#",
  Free = ".",
}

export const traverseMap = (slopeX: number, slopeY: number, map: string[]) => {
  const mapWidth = map[0].length;
  const mapHeight = map.length;

  let [positionX, positionY] = [0, 0];

  let treesEncounter = 0;

  while (true) {
    positionX += slopeX;
    positionY += slopeY;
    if (positionX >= mapWidth) {
      positionX -= mapWidth;
    }
    if (positionY >= mapHeight) {
      break;
    }
    if (map[positionY][positionX] === Map.Tree) {
      treesEncounter++;
    }
  }

  return treesEncounter;
};
