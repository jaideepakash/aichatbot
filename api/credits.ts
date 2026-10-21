export default function handler(req: any, res: any) {
  const nextMidnight = new Date();
  nextMidnight.setUTCHours(24, 0, 0, 0);

  res.status(200).json({
    totalDailyCredits: 150,
    usedCredits: 0,
    remainingCredits: 150,
    costPerMessage: 1,
    resetAt: nextMidnight.toISOString(),
    resetTimestamp: nextMidnight.getTime(),
  });
}
