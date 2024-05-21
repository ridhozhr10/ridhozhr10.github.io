import { repoURL } from "@/constants";
import Script from "next/script";
import { RefObject, useEffect, useState } from "react";

type Props = {
  parentRef: RefObject<HTMLElement>;
};

export default function Comment({ parentRef }: Props) {
  // rand based on time so script not getting cached on client side navigation
  const [rand, setRand] = useState(0);
  useEffect(() => {
    setRand(new Date().getTime());

    return () => {
      setRand(0);
    };
  }, []);

  if (rand === 0) {
    return;
  }

  return (
    <>
      <Script
        src={`https://utteranc.es/client.js?rand=${rand}`}
        data-repo={repoURL}
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
    </>
  );
}
