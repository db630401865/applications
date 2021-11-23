import React, { useEffect, useRef } from "react"
import { mount } from "auth/AuthApp"
import { useHistory } from "react-router-dom"

export default function AuthApp({ setStatus }) {
  const ref = useRef()
  const history = useHistory()
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      setStatus,
      initialPath: history.location.pathname, // 传递默认参数通知微应用
      onNavgate({ pathname: nextPathname }) {
        const pathname = history.location.pathname
        if (nextPathname !== pathname) {
          history.push(nextPathname)
        }
      }
    })

    if (onParentNavigate) history.listen(onParentNavigate)
  }, [])
  return <div ref={ref}></div>
}
