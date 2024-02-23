import { Route, Routes } from 'react-router-dom';
import { Layout } from './components';
import {
	ActivityPage,
	CardPageActivities,
	CardPageWeeks,
	ChartPage,
	HomePage,
	LoginPage,
	RedirectPage,
	TablePage,
} from './pages';

function App() {
	return (
		<div className="">
			<div>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/redirect/exchange_token" element={<RedirectPage />} />
						<Route path="/activities" element={<TablePage />} />
						<Route path="/weekly" element={<CardPageWeeks />} />
						<Route path="/weekly/:yearNumber/:weekNumber" element={<CardPageActivities />} />
					</Route>
				</Routes>
			</div>
		</div>
	);
}

export default App;
