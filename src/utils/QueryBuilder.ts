class QueryBuilder {
  private static readonly queryHelper =
    "Summarize my life in 200 words based on the following aspects and data. " +
    "Use human language (do not make it sound like AI, or use overly complicated words, make it easy to read) and make it engaging. " +
    "Do not repeat the aspects. Make it sound like a story. " +
    "Aspects and data: ";

  // FIXME: stats will be structured object not string, then unpack and adujst
  public static build(stats: string): string {
    return this.queryHelper + stats;
  }
}

export default QueryBuilder;
