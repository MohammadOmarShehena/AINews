import { Queue } from "bullmq";
import { redis } from "../redis";

export const storyAIQueue = new Queue("story-ai", {
  connection: redis as any,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000
    },
    removeOnComplete: true
  }
});

storyAIQueue.on("error", (err) => {
  console.error("Story AI queue error:", err.message);
});

export async function enqueueStoryAI(storyId: string) {
  await storyAIQueue.add(`process-${storyId}`, { storyId }, {
    jobId: `story-${storyId}`, // De-duplicate parallel updates for the same story
  });
}
