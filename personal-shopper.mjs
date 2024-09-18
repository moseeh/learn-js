import fs from 'fs/promises';
import path from 'path';

const commands = {
  create: 'takes a filename as argument and create it (should have `.json` extension specified)',
  delete: 'takes a filename as argument and delete it',
  add: 'adds a new element to the list in the file or increments its quantity',
  rm: 'removes an element from the list in the file or decrements its quantity',
  ls: 'prints the list in the console',
  help: 'prints all the command lines available, with a description of it'
};

async function readFile(filename) {
  try {
    const data = await fs.readFile(filename, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

async function writeFile(filename, data) {
  await fs.writeFile(filename, JSON.stringify(data, null, 2));
}

async function createFile(filename) {
  await writeFile(filename, {});
  console.log(`File ${filename} created.`);
}

async function deleteFile(filename) {
  await fs.unlink(filename);
  console.log(`File ${filename} deleted.`);
}

async function addItem(filename, item, quantity = 1) {
  const data = await readFile(filename);
  data[item] = (data[item] || 0) + quantity;
  if (data[item] <= 0) {
    delete data[item];
  }
  await writeFile(filename, data);
}

async function removeItem(filename, item, quantity) {
  const data = await readFile(filename);
  if (quantity === undefined) {
    delete data[item];
  } else {
    const numQuantity = Number(quantity);
    if (isNaN(numQuantity)) {
      console.error('Unexpected request: nothing has been removed');
      return;
    }
    if (numQuantity < 0) {
      // If quantity is negative, add instead of remove
      data[item] = (data[item] || 0) - numQuantity; // Subtracting a negative number is the same as adding
    } else {
      data[item] = (data[item] || 0) - numQuantity;
    }
    if (data[item] <= 0) {
      delete data[item];
    }
  }
  await writeFile(filename, data);
}

async function listItems(filename) {
  const data = await readFile(filename);
  if (Object.keys(data).length === 0) {
    console.log('Empty list.');
  } else {
    for (const [item, quantity] of Object.entries(data)) {
      console.log(`- ${item} (${quantity})`);
    }
  }
}

function printHelp() {
  console.log('Commands:');
  for (const [command, description] of Object.entries(commands)) {
    console.log(`- ${command}: ${description}`);
  }
}

async function main() {
  const [,, filename, command, ...args] = process.argv;

  if (!filename || !command) {
    printHelp();
    return;
  }

  try {
    switch (command) {
      case 'create':
        await createFile(filename);
        break;
      case 'delete':
        await deleteFile(filename);
        break;
      case 'add':
        if (!args[0]) {
          console.error('No elem specified.');
          return;
        }
        await addItem(filename, args[0], Number(args[1]) || 1);
        break;
    case 'rm':
            if (!args[0]) {
              console.error('No elem specified.');
              return;
            }
            await removeItem(filename, args[0], args[1]);
            break;
      case 'ls':
        await listItems(filename);
        break;
      case 'help':
        printHelp();
        break;
      default:
        console.error('Unknown command. Use "help" to see available commands.');
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

main();