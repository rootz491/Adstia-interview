import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import TableComponent from "./table.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<TableComponent />
		</MantineProvider>
	</React.StrictMode>
);
