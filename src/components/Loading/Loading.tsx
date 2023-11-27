import { ColorRing } from "react-loader-spinner";

const Loading = ()=>{
    return <div
    style={{
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["#001529", "#25415C", "#76C9DF", "#99CEFF", "#C4DDF5"]}
    />
  </div>
}

export default Loading;