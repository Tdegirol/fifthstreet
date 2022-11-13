import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { React, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactForm from "./pages/ContactForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Home from "./components/Home";
import Cart from "./components/Cart";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <div className="content-container">
            <Routes>
            <Route exact path="/" element={<Home />} />
              <Route exact path="/contact" element={<ContactForm />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route
                render={() => <h1 className="display-2">Wrong page!</h1>}
              />
            </Routes>
          </div>
          <Footer className="footer--pin" />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
