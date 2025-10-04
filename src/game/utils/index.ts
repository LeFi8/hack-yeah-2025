export class RangeCounter {
  private val: number
  private max: number | null
  private min: number | null

  constructor(initVal: number, min: number | null, max: number | null) {
    this.val = initVal
    this.min = min
    this.max = max
  }

  add(diffVal: number) {
    this.val += diffVal
    if (this.max !== null) {
      this.val = Math.min(this.max, this.val)
    }
    if (this.min !== null) {
      this.val = Math.max(this.min, this.val)
    }
  }

  get(): number {
    return this.val
  }

}