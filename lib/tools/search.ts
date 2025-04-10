import { tool } from '@langchain/core/tools';
import { z } from 'zod'

export const searchTool = tool(
    async ({ query }: { query: string }) => {
        console.log("Search Query: ", query);
        return `Search results about ${query}`;
    },
    {
        name: 'search',
        description: `
            Use this tool to search the internet for up-to-date or external information.
            Ideal for questions where the assistant is unsure, needs real-time data, or where knowledge may be outdated.
            Input should be a concise search query string.
            Example queries: "current inflation rate", "latest news on AI agents", "who won the 2024 Olympics"
        `,
        schema: z.object({
            query: z.string().describe('The search query to look up.')
        })
    }
)

export const summariseTool = tool(
    async ({ text }: {text: string}) => {
        console.log(`Summarising text: ${text}`)
        return `Summary: "${text.slice(0, 40)}`
    }, {
        name: "summarise",
        description: `
        Use this tool to condense long blocks of text or articles.
        Ideal when a user pastes a lot of content and wants a brief summary.
        Input should be a full paragraph, article, or long content block.
        `,
        schema: z.object({
            text: z.string().describe("The text to summarise.")
        })
    }
)

export const defineTool = tool(async({ term }: { term: string}) => {
    return `Definition of ${term}: a placehlder definition`;
}, {
    name: 'define',
    description: `
            Use this tool to define specific terms, concepts, or keywords.
            Great for short questions like "What is quantum computing?" or "Define recursion".
            Input should be a single word or phrase.
        `,
    schema: z.object({
        term: z.string().describe("To find the definition of the word or phrase.")
    })
})