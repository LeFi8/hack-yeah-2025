import { Possibility } from "../possibility";

export class HealthCheck extends Possibility {
  title = "You've been feeling strange lately and decided to check your health";

  getOptions() {
    return [
      {
        title: "Get a full body check-up (expensive but thorough)",
        applyEffects: () => {
          if (this.state.character.balance >= 2000) {
            this.state.character.balance -= 2000;
            // Full check-up: 90% chance to detect and treat issues
            if (Math.random() < 0.9) {
              this.state.character.physicalHealth.add(15);
              this.state.character.happiness.add(3);
            } else {
              // 10% chance of false alarm or minor issue
              this.state.character.happiness.add(-2);
            }
          } else {
            // Can't afford it
            this.state.character.happiness.add(-2);
          }
        },
      },
      {
        title: "Get a basic health check (moderate cost)",
        applyEffects: () => {
          if (this.state.character.balance >= 500) {
            this.state.character.balance -= 500;
            // Basic check: 70% chance to detect and treat issues
            if (Math.random() < 0.7) {
              this.state.character.physicalHealth.add(8);
              this.state.character.happiness.add(3);
            } else {
              // 30% chance of missing something or false alarm
              this.state.character.happiness.add(-2);
            }
          } else {
            // Can't afford it
            this.state.character.happiness.add(-1);
          }
        },
      },
      {
        title: "Research symptoms online and self-diagnose (free but risky)",
        applyEffects: () => {
          // Self-diagnosis: 40% chance to help, 60% chance to make things worse
          if (Math.random() < 0.4) {
            // Correct self-diagnosis
            this.state.character.physicalHealth.add(5);
            this.state.character.happiness.add(2);
          } else {
            // Wrong self-diagnosis or health anxiety
            this.state.character.physicalHealth.add(-3);
            this.state.character.happiness.add(-10);
          }
        },
      },
    ];
  }

  canActivate() {
    // Trigger when physical health is below 60 (feeling strange)
    return this.state.character.physicalHealth.get() < 60;
  }

  getWeight() {
    // Higher weight when health is lower
    const health = this.state.character.physicalHealth.get();
    if (health < 30) {
      return 8; // Very urgent
    } else if (health < 45) {
      return 5; // Urgent
    } else {
      return 3; // Moderate concern
    }
  }
}
