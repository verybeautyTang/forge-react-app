import React from "react";
import styles  from  "./index.module.less";
import Test from "./pages";
// import "./styles/index.less";
const App = () => {
	console.log("eee");
	return (
		<>
			<div className={styles["bg-red"]}> My name is App2223234</div>
			<Test/>
		</>
	);
};

export default App;