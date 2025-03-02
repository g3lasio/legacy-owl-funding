import { Route, Switch } from "wouter";
import HomePage from "./pages/Home";
import TermsPage from "./pages/terms";
import PrivacyPage from "./pages/privacy";
import QualifyPage from "./pages/qualify";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/qualify" component={QualifyPage} />
      </Switch>
      <Footer />
      <FloatingContact />
    </>
  );
}

export default App;
