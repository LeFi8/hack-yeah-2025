import { Possibility } from "../possibility";

export class DecideAboutRetirement extends Possibility {
  title = "You've reached retirement age! Time to decide your future";

  getOptions() {
    const estimatedPension = this.state.zus.getEstimatedPension();
    const replacementRate = this.state.zus.getReplacementRatePercentage();

    return [
      {
        title: `Retire now and enjoy your pension (${estimatedPension.toLocaleString()} PLN/month, ${replacementRate} of current salary)`,
        applyEffects: () => {
          // Force retirement regardless of current job
          this.state.zus.retire(this.state.age);

          // Remove current job if exists
          if (this.state.job) {
            this.state.finishJob();
          }

          // Boost happiness from freedom
          this.state.character.happiness.add(15);

          // Set focus to health and hobbies (no more work focus)
          this.state.focus.work = false;
          this.state.focus.health = true;
        },
      },
      {
        title: "Continue working for a 2 years to boost your pension",
        applyEffects: () => {
          // Stay in current job, don't retire yet
          // Maybe give small health penalty for working past retirement age
          this.state.character.physicalHealth.add(-5);
          this.state.character.happiness.add(-5);
          this.state.zus.delayRetirement(2); // Delay retirement by 2 years

          // But increase monthly expenses slightly (aging)
          this.state.character.monthlyExpenses.add(100);
        },
      },
    ];
  }

  canActivate() {
    // Only activate when character reaches 65 and hasn't retired yet
    return (
      this.state.age >= this.state.zus.retirementAge &&
      !this.state.zus.isRetired()
    );
  }

  getWeight() {
    // High weight when at retirement age to ensure it triggers
    if (this.state.age >= this.state.zus.retirementAge) {
      return 1000;
    }
    return 0;
  }
}
