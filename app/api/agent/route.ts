

import { z } from 'zod';
import { config } from 'dotenv';
import { agent } from '@/lib/agent';
import { HumanMessage } from '@langchain/core/messages';
import { summariseTool, searchTool } from '@/lib/tools/search';

config();


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const schema = z.object({
            task: z.string().min(1),
            thread_id: z.number().optional()
        })

        const parsed = schema.parse(body);
        const { task, thread_id } = parsed;

        console.log("Received task:", task)

        const searchResult = await searchTool.func({ query: task });

        console.log("Search Tool Result:", searchResult);

        const response = await agent.invoke({
            messages: [new HumanMessage(task)]
        }, thread_id ? { configurable: { thread_id }} : undefined )

        return Response.json({
             result: searchResult || response.structuredResponse?.Root?.content || "No content available"
        })
    } catch (error) {
        console.error(error)
        return new Response("Something went wrong", { status: 500 })
    }
}