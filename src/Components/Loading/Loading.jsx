import Loader from "react-loader-spinner";

export default function Loading({ isLoading }) {
  return isLoading ? (
    <div className="flex justify-center ">
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
        visible={isLoading} //3 secs
      />
    </div>
  ) : (
    <></>
  );
}
