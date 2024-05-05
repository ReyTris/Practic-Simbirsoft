import Layout from '@/components/Layout';
import { InsurancePage } from '@/pages/InsurancePage/InsurancePage';
import MainPage from '@/pages/MainPage';
import { createBrowserRouter } from 'react-router-dom';
import { PathNames } from './pathNames';

const routes = createBrowserRouter([
	{
		path: PathNames.MAIN_PAGE,
		element: <Layout />,
		children: [
			{ index: true, element: <MainPage /> },
			{ path: PathNames.INSURANCE_PAGE, element: <InsurancePage /> },
			{ path: PathNames.GASOLINE_PAGE, element: <InsurancePage /> },
			{ path: PathNames.PARKING_PAGE, element: <InsurancePage /> },
			{ path: PathNames.SERVICE_PAGE, element: <InsurancePage /> },
			// { path: '*', element: <ErrorPage /> },
		],
	},
]);

export default routes;
