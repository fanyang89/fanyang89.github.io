import * as path from "path";
import { defineConfig } from "rspress/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export default defineConfig({
  root: path.join(__dirname, "docs"),
  title: "Constrain Constant",
  description: "",
  globalStyles: path.join(__dirname, "styles/index.css"),
  markdown: {
    rehypePlugins: [rehypeKatex],
    remarkPlugins: [remarkMath],
    showLineNumbers: true,
    defaultWrapCode: true,
    mdxRs: {
      include: (p) => {
        return !p.includes("pangu.mdx") && !p.includes("orthus.mdx");
      },
    },
  },
  mediumZoom: {
    selector: ".rspress-doc img",
  },
  themeConfig: {
    enableContentAnimation: true,
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/fanyang89",
      },
    ],
  },
});
