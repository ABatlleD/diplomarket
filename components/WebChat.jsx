import React from 'react'
import Script from 'next/script'

const WeChat = () => {
  return (
    <Script
      type={'text/javascript'}
      strategy={'lazyOnload'}
      id={'service chat'}
      dangerouslySetInnerHTML={{
        __html: `var onWebChat={ar:[], set: function(a,b){if (typeof onWebChat_==='undefined'){this.ar.
push([a,b]);}else{onWebChat_.set(a,b);}},get:function(a){return(onWebChat_.get(a));},
w:(function(){ var ga=document.createElement('script'); ga.type = 'text/javascript';
ga.async=1;ga.src=('https:'==document.location.protocol?'https:':'http:') + 
'//www.onwebchat.com/clientchat/6b597786d1f70ec57072fe3a04b3c3f7';var s=
document.getElementsByTagName('script')[0];s.parentNode.insertBefore(ga,s);})()}`
      }}
    />
  )
}

export default WeChat
