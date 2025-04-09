import { tool } from '@langchain/core/tools';

export const searchTool = tool(
    async({query}: {query:string}) => {
        console.log(`Search query: ${query}`)
        return `Search results about ${query}`
    }, {
        name: 'search',
        description: 'Use this to search for general information about a topic'
    }
)

export const summariseTool = tool(
    async ({ text }: {text: string}) => {
        console.log(`Summarising text: ${text}`)
        return `Summary: "${text.slice(0, 40)}`
    }, {
        name: "summarise",
        description: "Use this summarise a block of text"
    }
)