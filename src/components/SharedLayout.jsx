import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";


export default function SharedLayout() {
  return (
		<>
			<Header />
			<main>
				<Suspense fallback={<div>Loading...</div>}>
					<Outlet />
				</Suspense>
				<ToastContainer autoClose={6000} theme="dark" />
			</main>
		</>
	);
}