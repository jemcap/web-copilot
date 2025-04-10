import { tool } from '@langchain/core/tools';
import { z } from 'zod'

export const searchTool = tool(
    async ({ query }: { query: string }) => {
        console.log("Search Query: ", query);
        return `Search results about ${query}`;
    },
    {
        name: 'search',
        description: 'Searches for general information about a given topic',
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
        description: "Use this summarise a block of text",
        schema: z.object({
            text: z.string().describe("The text to summarise.")
        })
    }
)

export const defineTool = tool(async({ term }: { term: string}) => {
    return `Definition of ${term}: a placehlder definition`;
}, {
    name: 'define',
    description: "Use this to define a specific concept or word.",
    schema: z.object({
        term: z.string().describe("To find the definition of the word or phrase.")
    })
})