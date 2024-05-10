import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const ProblemInfo = (props) => {
  const info = props.info;

  return <ReactMarkdown>
    {info.description}
  </ReactMarkdown>
}

export default ProblemInfo;
