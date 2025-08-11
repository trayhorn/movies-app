import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import Loader from "./utils/Loader";


export default function SharedLayout() {
  return (
		<>
			<Header />
			<main>
				<Suspense fallback={<Loader />}>
					<Outlet />
				</Suspense>
				<ToastContainer autoClose={6000} theme="dark" />
			</main>
		</>
	);
}