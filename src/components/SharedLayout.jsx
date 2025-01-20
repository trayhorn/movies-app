import { Outlet } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";


export default function SharedLayout() {
  return (
		<>
			<Navigation />
			<main>
				<Suspense fallback={<div>Loading...</div>}>
					<Outlet />
				</Suspense>
				<ToastContainer autoClose={3000} />
			</main>
		</>
	);
}