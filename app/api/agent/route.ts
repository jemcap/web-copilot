import { model } from "@/lib/claude";
import { HumanMessage } from "@langchain/core/messages";
import { z } from 'zod'

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const schema = z.object({
            task: z.string().min(1)
        })

        const parsed = schema.parse(body);
        const task = parsed.task

        const response = await model.call([
            new HumanMessage(task)
        ])

        return Response.json({
            result: response.content
        })
    } catch (error) {
        console.error(error)
        return new Response("Something went wrong", { status: 500})
    }
}