import { Component } from "react";
import "@/styles/index.less";
import Routers from "@/router";
import { IntlProvider } from "react-intl";
import { useLanguage } from "@/locale";
import ErrorPage from "@/error";

function App() {
    const languagePackage = useLanguage();

    if (!languagePackage) {
        return null;
    }

    return (
        <IntlProvider messages={languagePackage} locale="en">
            <Routers />
        </IntlProvider>
    );
}

class AppContainer extends Component {
    state = {
        isError: false,
    };
    render() {
        if (this.state.isError) {
            return <ErrorPage />;
        }
        return <App />;
    }
    componentDidCatch() {
        this.setState({
            isError: true,
        });
    }
}

export default AppContainer;
