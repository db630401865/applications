import React from "react"
import ReactDOM from "react-dom"
import { createMemoryHistory, createBrowserHistory } from "history"
import App from "./App"

function mount(el, { onNavgate, defaultHistory,initialPath }) {
  const history = defaultHistory || createMemoryHistory({
    initialEntries:[initialPath]
  })
  if(onNavgate) history.listen(onNavgate)
  ReactDOM.render(<App history={history}/>, el)
  return {
    // 微应用获取到容器应用的路由进行判断
    onParentNavigate({ pathname: nextPathname }) {
      const pathname = history.location.pathname
      if (nextPathname !== pathname) {
        history.push(nextPathname)
      }
    }
  } 
}

// 是否属于开发环境
if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#dev-marketing")

  if (el)
    mount(el, {
      defaultHistory: createBrowserHistory()
    })
}

export { mount }
