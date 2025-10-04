import { Game, type GameTickResult } from './game/game.ts';
import * as readline from 'readline';
import type { Possibility } from './game/possibilities/possibility.ts';

console.log("scripts loaded");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

function displayGameState(result: GameTickResult, monthsElapsed: number) {
  console.log(`\n=== Month ${monthsElapsed} (Age: ${result.state.age}) ===`);
  
  if (result.events.length > 0) {
    console.log("\n📅 Events this month:");
    result.events.forEach((event, index) => {
      console.log(`  ${index + 1}. ${event.title}`);
    });
  }

  if (result.possibilities.length > 0) {
    console.log("\n🎯 New Possibilities Available:");
    result.possibilities.forEach((possibility, index) => {
      console.log(`  ${index + 1}. ${possibility.title}`);
      possibility.options.forEach((option, optionIndex) => {
        console.log(`     ${optionIndex + 1}) ${option.title}`);
      });
    });
  }

  console.log(`\n📊 Current State:`);
  console.log(`   Health: ${result.state.character.physicalHealth}`);
  console.log(`   Happiness: ${result.state.character.mentalHealth}`);
  console.log(`   Money: ${result.state.character.balance}`);
  console.log(`   Focus: ${result.state.focus || "None"}`);
}

async function handlePossibilitySelection(game: Game, possibilities: Possibility[]) {
  if (possibilities.length === 0) {
    return;
  }

  const possibilityChoice = await askQuestion(`\nSelect a possibility (1-${possibilities.length}) or 'skip': `);
  
  if (possibilityChoice.toLowerCase() === 'skip') {
    console.log("Skipped selecting a possibility.");
    return;
  }

  const possibilityIndex = parseInt(possibilityChoice) - 1;
  
  if (possibilityIndex < 0 || possibilityIndex >= possibilities.length) {
    console.log("Invalid possibility selection.");
    return;
  }

  const selectedPossibility = possibilities[possibilityIndex];
  
  const optionChoice = await askQuestion(`\nSelect an option (1-${selectedPossibility.options.length}): `);
  const optionIndex = parseInt(optionChoice) - 1;

  if (optionIndex < 0 || optionIndex >= selectedPossibility.options.length) {
    console.log("Invalid option selection.");
    return;
  }

  try {
    game.selectPossibility(selectedPossibility, optionIndex);
    console.log(`\nYou chose: ${selectedPossibility.options[optionIndex].title}`);
    console.log("Effects applied!");
  } catch (error) {
    console.error("Error selecting possibility:", error.message);
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testGameLoop() {
  console.log("Starting Life Simulator...");
  const game = new Game();
  game.start();
  
  const running = true;
  
  while (running && game.isGameRunning()) {
    // Tick the game (advance by 1 month)
    const result = game.tick();
    
    // Display current state
    displayGameState(result, game.getMonthsElapsed());
    
    // Handle possibilities if any
    if (result.possibilities.length > 0) {
      await handlePossibilitySelection(game, result.possibilities);
    }
  
    await delay(500);
  }
  
  console.log(`\nGame ended after ${game.getYearsElapsed()} years and ${game.getMonthsElapsed() % 12} months.`);
  rl.close();
  process.exit(0);
}

// Run the game loop
testGameLoop();