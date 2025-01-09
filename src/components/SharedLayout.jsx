import { Outlet } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import { Suspense } from "react";


export default function SharedLayout() {
  return (
		<>
			<Navigation />
			<main>
				<Suspense fallback={<div>Loading...</div>}>
					<Outlet />
				</Suspense>
			</main>
		</>
	);
}