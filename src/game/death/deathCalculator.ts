import type { State } from "../state";

export interface DeathResult {
  isDead: boolean;
  reason?: string;
}

export class DeathCalculator {
  static shouldGameEnd(state: State): DeathResult {
    // Check for death conditions
    const deathResult = this.checkDeath(state);
    if (deathResult.isDead) {
      return deathResult;
    }

    // Natural lifespan (very old age)
    if (state.age >= 100) {
      return {
        isDead: true,
        reason: "Natural death from old age",
      };
    }

    if (state.character.happiness.get() <= 0 && state.age > 25) {
      return {
        isDead: true,
        reason: "Severe mental health crisis",
      };
    }

    // Bankruptcy with no way to recover
    if (state.character.balance < -50000 && state.age > 30) {
      return {
        isDead: true,
        reason: "Financial ruin and homelessness",
      };
    }

    return { isDead: false };
  }

  static checkDeath(state: State): DeathResult {
    // Immediate death from zero physical health
    if (state.character.physicalHealth.get() <= 0) {
      return {
        isDead: true,
        reason: "Critical health failure",
      };
    }

    // Age-based death probability
    const deathProbability = this.calculateDeathProbability(state);
    if (Math.random() < deathProbability) {
      return {
        isDead: true,
        reason: this.getDeathReasonByCondition(state),
      };
    }

    return { isDead: false };
  }

  private static getDeathReasonByCondition(state: State): string {
    const health = state.character.physicalHealth.get();
    const happiness = state.character.happiness.get();
    const age = state.age;

    // Determine death reason based on conditions
    if (health <= 10 && happiness <= 10) {
      return "Complete physical and mental breakdown";
    } else if (health <= 10) {
      return "Severe illness and physical deterioration";
    } else if (happiness <= 10) {
      return "Mental health crisis leading to fatal complications";
    } else if (age >= 90) {
      return "Natural death from advanced age";
    } else if (age >= 75) {
      return "Age-related health complications";
    } else if (health <= 25) {
      return "Health complications and organ failure";
    } else if (health <= 50 && age >= 60) {
      return "Age and health-related natural causes";
    } else {
      return "Unexpected natural causes";
    }
  }

  static calculateDeathProbability(state: State): number {
    const health = state.character.physicalHealth.get();
    const happiness = state.character.happiness.get();

    // Base death probability by age (per month)
    let baseProbability = 0;

    if (state.age < 30) {
      baseProbability = 0.0001; // 0.01% per month (very low)
    } else if (state.age < 50) {
      baseProbability = 0.0005; // 0.05% per month
    } else if (state.age < 65) {
      baseProbability = 0.002; // 0.2% per month
    } else if (state.age < 75) {
      baseProbability = 0.006; // 0.6% per month
    } else if (state.age < 85) {
      baseProbability = 0.015; // 1.5% per month
    } else if (state.age < 95) {
      baseProbability = 0.035; // 3.5% per month
    } else {
      baseProbability = 0.08; // 8% per month
    }

    // Health multipliers
    let healthMultiplier = 1;

    if (health <= 10) {
      healthMultiplier = 5; // Very high risk
    } else if (health <= 25) {
      healthMultiplier = 3; // High risk
    } else if (health <= 50) {
      healthMultiplier = 2; // Moderate risk
    } else if (health >= 80) {
      healthMultiplier = 0.5; // Lower risk
    }

    // Mental health impact
    let happinessMultiplier = 1;

    if (happiness <= 10) {
      happinessMultiplier = 2;
    } else if (happiness <= 25) {
      happinessMultiplier = 1.5;
    } else if (happiness >= 80) {
      happinessMultiplier = 0.8;
    }

    // Combined health effects
    let combinedHealthPenalty = 1;
    if (health <= 25 && happiness <= 25) {
      combinedHealthPenalty = 1.5;
    }

    return (
      baseProbability *
      healthMultiplier *
      happinessMultiplier *
      combinedHealthPenalty
    );
  }
}
