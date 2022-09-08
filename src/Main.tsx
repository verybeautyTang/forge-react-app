import React from "react";
import { createRoot } from "react-dom/client";
/** 路由配置器 */
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./components/home/index";

import Team from "./components/team/index";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!); 
root.render(<BrowserRouter>
	<Routes>
		<Route path="/" element={<App />}>
			<Route index element={<Home />} />
			<Route path="teams" element={<Team />}>
				{/* <Route path=":teamId" element={<Team />} />
        <Route path="new" element={<NewTeamForm />} />
        <Route index element={<LeagueStandings />} /> */}
			</Route>
		</Route>
	</Routes>
</BrowserRouter>);
