import {BrowserRouter, Route, Routes} from "react-router";
import PageComponents from "./pages/page-components.tsx";
import LayoutMain from "./pages/layout-main.tsx";
import PageHome from "./pages/page-home.tsx";
import PagePhotoDetails from "./pages/page-photo-details.tsx";

export default function App() {
	return (
        <BrowserRouter>
            <Routes>
                <Route element={<LayoutMain />}>
                    <Route index element={<PageHome />} />
                    <Route path={"/fotos/:id"} element={<PagePhotoDetails />} />
                    <Route path={"/componentes"} element={<PageComponents />} />
                </Route>
            </Routes>
        </BrowserRouter>
	);
}
