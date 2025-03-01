import { useState } from 'react';
import { Route, Switch } from 'wouter';
import HomePage from './pages/Home';
import TermsPage from './pages/terms';
import PrivacyPage from './pages/privacy';
import QualifyPage from './pages/qualify';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact'; // Added FloatingContact import

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
      <FloatingContact /> {/* Added FloatingContact component */}
    </>
  );
}

export default App;

// Dummy FloatingContact component (replace with your actual implementation)
const FloatingContact = () => {
  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
      <p>Contact us!</p>
      <a href="tel:+15551234567">Call us</a> <br/>
      <a href="mailto:contact@example.com">Email us</a>
    </div>
  );
};