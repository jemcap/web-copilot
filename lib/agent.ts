import { ChatAnthropic } from "@langchain/anthropic";
import { config } from "dotenv";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from '@langchain/langgraph'
import { summariseTool, searchTool } from "./tools/search";

config()


    const checkpointSaver = new MemorySaver();

    const tools = [summariseTool, searchTool]

    const model = new ChatAnthropic({
        modelName: 'claude-3-5-sonnet-latest',
        temperature: 0.5,
        maxTokens: 1000,
        apiKey: process.env.ANTHROPIC_API_KEY
    })


  export const agent = await createReactAgent({
    llm: model,
    tools,
    checkpointSaver
  });








