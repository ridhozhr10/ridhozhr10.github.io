import Script from "next/script";
import { RefObject } from "react";

type Props = {
  parentRef: RefObject<HTMLElement>;
};

export default function Comment({ parentRef }: Props) {
  return (
    <Script
      src="https://utteranc.es/client.js"
      data-repo="ridhozhr10/ridhozhr10.github.io"
      data-issue-term="url"
      data-theme="github-dark"
      data-crossorigin="anonymous"
      data-async
      async
      onReady={() => {
        const utteranceDOM = document.getElementsByClassName("utterances")[0];
        if (!utteranceDOM) {
          return;
        }
        // https://stackoverflow.com/a/33724397
        const fragment = document.createDocumentFragment();
        fragment.appendChild(utteranceDOM);
        parentRef?.current?.appendChild(fragment);
      }}
    />
  );
}
