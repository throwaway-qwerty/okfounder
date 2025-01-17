import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { ThemeProvider, theme, CSSReset } from "@chakra-ui/core"
import AllPosts from "./AllPosts"
import LoginWrapper from "./auth/LoginWrapper"
import LogoutPage from "./auth/LogoutPage"
import Frame from "./ui/Frame"
import Home from "./Home"

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <LoginWrapper>
          {({ username, logout }) => (
            <Frame username={username}>
              <Switch>
                <Route path="/logout">
                  <LogoutPage logout={logout} />
                </Route>
                <Route path="/all-posts">
                  <AllPosts username={username} />
                </Route>
                <Route path="/">
                  <Home username={username} />
                </Route>
              </Switch>
            </Frame>
          )}
        </LoginWrapper>
      </ThemeProvider>
    </Router>
  )
}

export default App
