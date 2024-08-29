import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let platform=inject(PLATFORM_ID)
  let header:any
  if(isPlatformBrowser(platform)){
    if(localStorage.getItem('userToken') !=null)
    header = {token:localStorage.getItem('userToken')!}
    req= req.clone({
      setHeaders:header
    }) 
  }

  return next(req);
};
