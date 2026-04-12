import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeHighlight = ({ codeString }: { codeString: string }) => {
  return (
    <SyntaxHighlighter customStyle={{ padding: "1.5rem 4.25rem 1.5rem 1rem" }} language="typescript" style={nightOwl} wrapLongLines={true}>
      {codeString}
    </SyntaxHighlighter>
  );
};

export default CodeHighlight;
