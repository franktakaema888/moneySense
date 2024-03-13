import Dashboard from "../Homepage_components/dashboard";
import Api from "../Homepage_components/Api";

export const Home = () => {
	return (
		<div className="flex flex-col h-screen scroll-smooth overflow-y-auto"> 
			<Dashboard/>	
			<Api/>
			<div className="flex-grow"></div>
		</div>
	);
}