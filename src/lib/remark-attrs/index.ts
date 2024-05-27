// ref:
// - https://github.com/arobase-che/remark-attr/issues/22#issuecomment-1013672211
// - https://gist.github.com/cah4a/9b75c531540e2891599453863dd24881

import parseAttributes from "./util";

type Iteratee = (node: any, index: number | null, parent: any) => any;
const map = (tree: any, iteratee: Iteratee) => {
  const preorder: Iteratee = (node, index, parent) => {
    const newNode = iteratee(node, index, parent);

    if (Array.isArray(newNode.children)) {
      newNode.children = newNode.children.map((child: any, index: number) => {
        return preorder(child, index, node);
      });
    }

    return newNode;
  };

  return preorder(tree, null, null);
};

export default function remarkAttrs(): any {
  return (tree: any) => {
    return map(tree, (node, index, parent) => {
      if (node.type == "text" && node.value[0] == "{" && parent && index) {
        const endof = node.value.indexOf("}");
        const prev = parent.children[index - 1];
        const attrs =
          endof && prev && parseAttributes(node.value.slice(1, endof));

        if (attrs) {
          prev.data = {
            ...prev.data,
            hProperties: attrs,
          };
          return {
            ...node,
            value: node.value.slice(endof + 1),
          };
        }
      }

      return node;
    });
  };
}
