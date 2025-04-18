import { Oval } from "react-loader-spinner";

export default function Loader() {
	return (
		<Oval
			visible={true}
			height="80"
			width="80"
			color="#FFB400"
			secondaryColor="#FFB400"
			ariaLabel="oval-loading"
			wrapperClass="loader"
		/>
	);
}
