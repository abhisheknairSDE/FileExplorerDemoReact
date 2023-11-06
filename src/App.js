import { useEffect, useState } from "react";
import "./styles.css";
import Explorer from "./components/Explorer";
import explorer from "./data/DirectoryData";
import useDfs from "./hooks/use-dfs";

export default function App() {
  const [data, setData] = useState(explorer);
  const { insertNode } = useDfs();
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(data, folderId, item, isFolder);
    setData(finalTree);
  };
  console.log(data);
  return (
    <div className="App">
      <Explorer data={data} onInsertNode={handleInsertNode} />
    </div>
  );
}
