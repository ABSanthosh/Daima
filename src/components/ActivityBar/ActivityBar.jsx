import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import "./ActivityBar.scss";

function ActivityBar() {
  const [showMenu, setShowMenu] = React.useState(false);

  const [treeStates, setTreeStates] = React.useState({
    file: false,
    theme: false,
  });

  const outRef = React.useRef(null);
  const currentTheme = useStoreState((state) => state.theme);
  const setCurrentTheme = useStoreActions((actions) => actions.setTheme);

  useOnClickOutside(outRef, () => {
    setShowMenu(false);
    setTreeStates({
      file: false,
      theme: false,
    });
  });

  return (
    <div className="ActivityBarWrapper" ref={outRef}>
      <div
        className={`ActivityBarWrapper__menu
            ${showMenu ? "ActivityBarWrapper__menu--active" : ""}
        `}
        onClick={() => {
          const currentMenuState = showMenu;
          setShowMenu(!currentMenuState);
          if (currentMenuState) {
            setTreeStates({
              file: false,
              theme: false,
            });
          }
        }}
        data-icon="&#60308;"
      />
      {showMenu && (
        <ul className="ActivityBarWrapper__menuBox">
          <li
            className={`ActivityBarWrapper__menuBox--${
              treeStates.file ? "active" : "item"
            }`}
          >
            <button
              onClick={() => {
                setTreeStates({
                  file: true,
                  theme: false,
                });
              }}
              onMouseEnter={() => {
                setTreeStates({
                  file: true,
                  theme: false,
                });
              }}
            >
              <span>File</span>
              <span data-icon="&#60086;" />
            </button>
          </li>
          <li
            className={`ActivityBarWrapper__menuBox--${
              treeStates.theme ? "active" : "item"
            }`}
          >
            <button
              onClick={() => {
                setTreeStates({
                  file: false,
                  theme: true,
                });
              }}
              onMouseEnter={() => {
                setTreeStates({
                  file: false,
                  theme: true,
                });
              }}
            >
              <span>Theme</span>
              <span data-icon="&#60086;" />
            </button>
          </li>
        </ul>
      )}
      {treeStates.file && (
        <ul
          className="ActivityBarWrapper__subMenuBox"
          style={{
            left: "250px",
          }}
        >
          <li className="ActivityBarWrapper__subMenuBox--item">
            <button>Open File</button>
          </li>
          <li className="ActivityBarWrapper__subMenuBox--item">
            <button>Open Folder</button>
          </li>
          <li className="ActivityBarWrapper__subMenuBox--separator" />
          <li className="ActivityBarWrapper__subMenuBox--item">
            <button>Save</button>
          </li>
          <li className="ActivityBarWrapper__subMenuBox--item">
            <button>Save As</button>
          </li>
          <li className="ActivityBarWrapper__subMenuBox--item">
            <button>
              <span>Auto Save</span>
              <span data-icon="&#60082;" />
            </button>
          </li>
        </ul>
      )}

      {treeStates.theme && (
        <ul
          className="ActivityBarWrapper__subMenuBox"
          style={{
            left: "250px",
          }}
        >
          <li className="ActivityBarWrapper__subMenuBox--item">
            <button onClick={() => setCurrentTheme("tomorrow-night-blue")}>
              <span>Tomorrow Night Blue</span>
              {currentTheme === "tomorrow-night-blue" && (
                <span data-icon="&#60082;" />
              )}
            </button>
          </li>
          <li className="ActivityBarWrapper__subMenuBox--item">
            <button onClick={() => setCurrentTheme("github")}>
              <span>Github</span>
              {currentTheme === "github" && <span data-icon="&#60082;" />}
            </button>
          </li>
          <li className="ActivityBarWrapper__subMenuBox--disabled">
            <button disabled onClick={() => setCurrentTheme("blackboard")}>
              <span>Blackboard</span>
              {currentTheme === "blackboard" && <span data-icon="&#60082;" />}
            </button>
          </li>
          <li className="ActivityBarWrapper__subMenuBox--disabled">
            <button
              disabled
              onClick={() => setCurrentTheme("chrome-dev-tools")}
            >
              <span>Chrome Dev Tools</span>
              {currentTheme === "chrome-dev-tools" && (
                <span data-icon="&#60082;" />
              )}
            </button>
          </li>
          <li className="ActivityBarWrapper__subMenuBox--disabled">
            <button disabled onClick={() => setCurrentTheme("ocean-next")}>
              <span>Ocean Next</span>
              {currentTheme === "ocean-next" && <span data-icon="&#60082;" />}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
export default ActivityBar;