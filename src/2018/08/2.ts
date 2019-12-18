import { readFileSync } from "fs";
import * as path from "path";

const numbers = readFileSync(path.join(__dirname, "./input.txt"), {
  encoding: "utf-8"
})
  .trim()
  .split(" ")
  .map(numberString => parseInt(numberString, 10));

interface INode {
  childNodes: INode[];
  metadata: number[];
}

let ptr = 0;

function createTreeNode(): INode {
  const node:any = {
    childNodes: [],
    metadata: []
  };
  const numberOfChildNodes = numbers[ptr++];
  const numberOfMetadataEntries = numbers[ptr++];

  for (
    let childNodePtr = 0;
    childNodePtr < numberOfChildNodes;
    childNodePtr++
  ) {
    node.childNodes.push(createTreeNode());
  }
  for (
    let metaDataPtr = 0;
    metaDataPtr < numberOfMetadataEntries;
    metaDataPtr++
  ) {
    node.metadata.push(numbers[ptr++]);
  }
  return node;
}

const tree = createTreeNode();

function getNodeValue(node: INode): number {
  if (node.childNodes.length === 0) {
    return node.metadata.reduce((prev, val) => prev + val, 0);
  }
  return node.metadata.reduce((prev, val) => {
    const targetChildNode = node.childNodes[val - 1];
    if (!targetChildNode) {
      return prev;
    }
    return prev + getNodeValue(targetChildNode);
  }, 0);
}

console.log(getNodeValue(tree));
