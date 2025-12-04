import { inngest } from "./client";
import { createAgent, gemini } from "@inngest/agent-kit";


export const helloWorld = inngest.createFunction(
  { id: "hello-world2" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "summarizer",
      system: "You are an expert next.js developer. You write readable, maintainable code. You write next.js & React snippets.",
      model: gemini({ model: "gemini-2.0-flash", apiKey: process.env.GEMINI_API_KEY }),
    });

    const { output } = await codeAgent.run(
      `Write the following snippet: ${event.data.value}`,
    )
    
    console.log(output);
    return { output };
  },
);