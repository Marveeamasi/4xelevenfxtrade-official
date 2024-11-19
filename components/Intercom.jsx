'use client';
import Script from 'next/script';
import { useEffect } from 'react';

export default function Intercom({ user }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && user) {
      window.intercomSettings = {
        api_base: 'https://api-iam.intercom.io',
        app_id: 'wk6r3jm3',
        user_id: user.id, 
        name: user.name, 
        email: user.email, 
        created_at: user.createdAt, 
      };
    }
  }, [user]);

  return (
    <>
      <Script
        id="intercom-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              var w=window;
              var ic=w.Intercom;
              if(typeof ic==="function"){
                ic('reattach_activator');
                ic('update',w.intercomSettings);
              } else {
                var d=document;
                var i=function(){i.c(arguments);};
                i.q=[];
                i.c=function(args){i.q.push(args);};
                w.Intercom=i;
                var l=function(){
                  var s=d.createElement('script');
                  s.type='text/javascript';
                  s.async=true;
                  s.src='https://widget.intercom.io/widget/wk6r3jm3';
                  var x=d.getElementsByTagName('script')[0];
                  x.parentNode.insertBefore(s,x);
                };
                if(document.readyState==='complete'){
                  l();
                } else if(w.attachEvent){
                  w.attachEvent('onload',l);
                } else {
                  w.addEventListener('load',l,false);
                }
              }
            })();
          `,
        }}
      />
    </>
  );
}
