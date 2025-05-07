class Node {
  constructor(x,y,prev = null) {
    this.x = x;
    this.y = y;
    this.prev = prev;
  }
}

const isValidSquare = (node) => {
  let validity = true;
  if ((node.x > 7 || node.x < 0) || (node.y > 7 || node.y < 0)) {
    validity = false;
  }
  return validity;
}

const possibleSquares = (node) => {
  let possibilities = [];
  let arr = [[1,2],[1,-2],[-1,2],[-1,-2],[2,1],[2,-1],[-2,1],[-2,-1]];
  for (let i = 0; i < arr.length; i++) {
    const neighbor = new Node(node.x + arr[i][0], node.y + arr[i][1], node);
    let possibility = false;

    if (isValidSquare(neighbor)) {
      possibility = true;
    }

    if (node.prev) {
      if (neighbor.x == node.prev.x && neighbor.y == node.prev.y) {
        possibility = false;
      }
    }
    
    if (possibility) {
      possibilities.push(neighbor);
    }
  }
  return possibilities;    
}

const bfs = (arr1, arr2) => {
  const start = new Node(arr1[0], arr1[1]);
  const target = new Node(arr2[0], arr2[1]);
  let queue = [start];
  while (queue) {
    const value = queue.shift();
    if (value.x == target.x && value.y == target.y) {
      return value;
    }
    const possibilities = possibleSquares(value);
    possibilities.forEach(element => {
      queue.push(element);
    });
  }
  return null;
}

const knightMoves = (arr1, arr2) => {
  const search = bfs(arr1, arr2);
  if (!search) {
    return;
  }
  const ans = [];
  let temp = search;
  while(temp) {
    let arr = [temp.x, temp.y];
    temp = temp.prev;
    ans.unshift(arr);
  }
  return ans;
}

console.log(knightMoves([0,0],[3,3]));
