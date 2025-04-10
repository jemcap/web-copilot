

import { z } from 'zod';
import { config } from 'dotenv';
import { agent } from '@/lib/agent';
import { HumanMessage } from '@langchain/core/messages';
import { summariseTool, searchTool, defineTool } from '@/lib/tools/search';

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
            
        const response = await agent.invoke({
            messages: [new HumanMessage(task)]
        }, {
            recursionLimit: 50,
            ...(thread_id ? { configurable: { thread_id }} : {})
        })

        const lastMessageWithContent = response.messages
            .reverse()
            .find((msg: any) => msg.content && typeof msg.content === 'string');

        return Response.json({
             result: lastMessageWithContent?.content || "No content available"
        })
    } catch (error) {
        console.error(error)
        return new Response("Something went wrong", { status: 500 })
    }
}