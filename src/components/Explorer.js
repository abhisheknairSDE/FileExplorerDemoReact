import { useState } from "react";

const Explorer = (props) => {
  const [showList, setShowList] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null
  });

  const handleNewItem = (event, isFolder) => {
    event.stopPropagation();
    setShowInput({
      visible: true,
      isFolder: isFolder
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      setShowInput({ ...showInput, visible: false });
      props.onInsertNode(props.data.id, event.target.value, showInput.isFolder);
    }
  };

  if (props.data.isFolder) {
    return (
      <div>
        <div
          className="folder"
          onClick={() => {
            setShowList(!showList);
          }}
        >
          <span>📁 {props.data.name}</span>
          <div>
            <button onClick={(e) => handleNewItem(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewItem(e, false)}> File +</button>
          </div>
        </div>
        {showInput.visible && (
          <div className="inputContainer" style={{ paddingLeft: 25 }}>
            <span>{showInput.isFolder ? "📁" : "📄"}</span>
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              onBlur={() => setShowInput({ ...showInput, visible: false })}
              onKeyDown={onAddFolder}
            ></input>
          </div>
        )}

        {showList && (
          <div style={{ paddingLeft: 25 }}>
            {props.data.items.map((item) => {
              return (
                <Explorer
                  data={item}
                  key={item.id}
                  onInsertNode={props.onInsertNode}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <div
          className="file"
          onClick={() => {
            setShowList(!showList);
          }}
        >
          <span>📄 {props.data.name}</span>
        </div>

        {showList && (
          <div>
            {props.data.items.map((item) => {
              return (
                <Explorer
                  data={item}
                  key={item.id}
                  onInsertNode={props.onInsertNode}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
};

export default Explorer;
