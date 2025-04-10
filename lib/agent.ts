import { ChatAnthropic } from "@langchain/anthropic";
import { ChatOpenAI } from '@langchain/openai'
import { config } from "dotenv";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from '@langchain/langgraph'
import { summariseTool, searchTool, defineTool } from "./tools/search";

config()


    const checkpointSaver = new MemorySaver();

    const tools = [
      defineTool,
      searchTool,
      summariseTool
    ];

    const model = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo',
      temperature: 0.7,
      openAIApiKey: process.env.OPENAI_API_KEY
    })


  export const agent = await createReactAgent({
    llm: model,
    tools,
    checkpointSaver,
  });








