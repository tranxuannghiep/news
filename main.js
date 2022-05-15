const products = [
  { id: 1, name: "Item 1", quantity: 1 },
  { id: 2, name: "Item 2", quantity: 1 },
  { id: 1, name: "Item 1", quantity: 5 },
  { id: 1, name: "Item 1", quantity: 6 },
  { id: 5, name: "Item 5", quantity: 1 },
];

const newProducts = products.reduce((acc, val) => {
  if (!acc[val.name]) {
    acc[val.name] = 1;
  } else {
    acc[val.name] += 1;
  }
  return acc;
}, {});
console.log(newProducts);

const numbers = [1, 2, 3];

const add = (arr) => {
  console.log(arr);
  // return arr.reduce((acc, val) => acc + val);
};

console.log(add(...numbers));
