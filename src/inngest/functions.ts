import { createAgent, gemini } from "@inngest/agent-kit";
import { Sandbox } from "@e2b/code-interpreter";

import { inngest } from "./client";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world2" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("open-lovable-nextjs-template-2");
      return sandbox.sandboxId;
    });
    
    const codeAgent = createAgent({
      name: "summarizer",
      system: "You are an expert next.js developer. You write readable, maintainable code. You write next.js & React snippets.",
      model: gemini({ model: "gemini-2.0-flash", apiKey: process.env.GEMINI_API_KEY }),
    });

    const { output } = await codeAgent.run(
      `Write the following snippet: ${event.data.value}`,
    )

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `https://${host}`;


    });
    
    return { output, sandboxUrl };
  },
);