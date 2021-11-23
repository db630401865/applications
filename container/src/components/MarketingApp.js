import React, { useEffect, useRef } from "react"
import { mount } from 'marketing/MarketingApp'
import { useHistory } from 'react-router-dom';

export default function MarketingApp(){
  const ref = useRef()
  const history = useHistory()
  
  // 在组件挂载完成之后，调用mount方法
  useEffect(()=>{
    const { onParentNavigate }= mount(ref.current, {
      initialPath: history.location.pathname, // 传递默认参数通知微应用
      onNavgate ({ pathname: nextPathname }){
        const pathname = history.location.pathname
        if(pathname !== nextPathname){
          history.push(nextPathname)
        }
      }
    })

    if (onParentNavigate) history.listen(onParentNavigate)
  }, [])

  return <div ref={ref}></div>
}