import "highlight.js/styles/monokai.css";
import "./markdown.css";

type Props = {
  content: string;
};

export default function Markdown(props: Props) {
  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: props.content }}
    />
  );
}
