import { ChatAnthropic } from "@langchain/anthropic";
import { config } from "dotenv";

config()

export const model = new ChatAnthropic({
    modelName: 'claude-3-5-sonnet-latest',
    temperature: 0.5,
    maxTokens: 1000,
    apiKey: process.env.ANTHROPIC_API_KEY
})