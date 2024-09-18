import fs from 'fs/promises';
import path from 'path';

async function readGuestFile(filePath) {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

async function processGuests(guestDir) {
  const files = await fs.readdir(guestDir);
  const guests = await Promise.all(
    files.map(file => readGuestFile(path.join(guestDir, file)))
  );
  return guests.filter(guest => guest.answer === 'yes');
}

function calculateDrinks(vips) {
  const drinks = {};
  const categories = {
    beer: vips.filter(g => g.drink === 'beer').length,
    water: vips.filter(g => g.drink === 'water').length,
    wine: vips.filter(g => g.drink === 'wine').length,
    soft: vips.filter(g => g.drink === 'soft').length,
  };

  if (categories.beer > 0) drinks['6-packs-beers'] = Math.ceil(categories.beer / 6);
  if (categories.water > 0) drinks['water-bottles'] = Math.ceil(categories.water / 4);
  if (categories.wine > 0) drinks['wine-bottles'] = Math.ceil(categories.wine / 4);
  if (categories.soft > 0) drinks['soft-bottles'] = Math.ceil(categories.soft / 4);

  return drinks;
}

function calculateFood(vips) {
  const food = {};
  const categories = {
    veggie: vips.filter(g => ['veggie', 'vegan'].includes(g.food)).length,
    carnivore: vips.filter(g => g.food === 'carnivore').length,
    fish: vips.filter(g => g.food === 'fish').length,
    omnivore: vips.filter(g => ['omnivore', 'everything'].includes(g.food)).length,
  };

  // Calculate vegan/veggie food
  if (categories.veggie > 0) {
    const veggieCount = Math.ceil(categories.veggie / 3);
    food.eggplants = veggieCount;
    food.courgettes = veggieCount;
    food.mushrooms = categories.veggie; // Directly using the number of vegan/veggie guests
    food.hummus = veggieCount;
  }

  if (categories.carnivore > 0) food.burgers = categories.carnivore;
  if (categories.fish > 0) food.sardines = categories.fish;
  if (categories.omnivore > 0) food.kebabs = categories.omnivore;

  // Count all VIPs for potatoes, regardless of food preference
  const totalGuests = vips.length;
  if (totalGuests > 0) food.potatoes = totalGuests;

  return food;
}

async function updateShoppingList(filePath, newItems) {
  let existingItems = {};
  try {
    const data = await fs.readFile(filePath, 'utf8');
    existingItems = JSON.parse(data);
  } catch (error) {
    // File doesn't exist or is empty, start with an empty object
  }

  const updatedItems = { ...existingItems, ...newItems };
  await fs.writeFile(filePath, JSON.stringify(updatedItems, null, 2));
}

async function main() {
  const [, , guestDir, shoppingListFile] = process.argv;

  if (!guestDir || !shoppingListFile) {
    console.error('Please provide both guest directory and shopping list file paths.');
    process.exit(1);
  }

  try {
    const vips = await processGuests(guestDir);

    if (vips.length === 0) {
      console.log('No one is coming.');
      process.exit(0);
    }

    const drinks = calculateDrinks(vips);
    const food = calculateFood(vips);
    const shoppingList = { ...drinks, ...food };

    await updateShoppingList(shoppingListFile, shoppingList);
    console.log('Shopping list updated successfully.');
  } catch (error) {
    console.error('An error occurred:', error.message);
    process.exit(1);
  }
}

main();
