export default function PageView(props) {
  return (
    <div
      className="page-view-container"
      style={{
        height: "95%",
        width: "95%",
        padding: "16px",
        // background: "red",
      }}
    >
      {props.children}
    </div>
  );
}
