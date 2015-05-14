'use strict'

var blas = require('ndarray-blas-level1')

function lup ( A, L, P ) {
  var i,j,k, Ljk, Uk, Ukk, m=A.shape[1], U=A, tmp

  for(i=0;i<m;i++) {
    P[i] = i
  }

  for(k=0; k<m; k++) {
    L.set(k,k,1)

    i = blas.iamax(U.pick(null,k).lo(k).hi(m-k))+k

    Uk = U.pick(k,null)
    blas.swap( Uk.lo(k).hi(m-k), U.pick(i,null).lo(k).hi(m-k) )
    blas.swap( L.pick(k,null).hi(k), L.pick(i,null).hi(k) )

    tmp=P[i], P[i]=P[k], P[k]=tmp

    Ukk = U.get(k,k)
    for(j=k+1; j<m; j++) {
      Ljk = U.get(j,k)/Ukk
      L.set(j,k,Ljk)
      blas.axpy(-Ljk, Uk.lo(k).hi(m-k), U.pick(j,null).lo(k).hi(m-k))
    }
  }

  return [ L, U, P ]
}

module.exports = lup

/*
function lupWithoutSwap ( A, L, P ) {
  var i,j,k, m=A.shape[1], U=A, tmp
  var Ljk, Uk, Ukk
  for(i=0;i<m;i++) { P[i] = i }
  var umax, imax,tmp;
  for(k=0; k<m; k++) {
    L.set(k,k,1)
    for(imax=k,umax=-Infinity,i=k;i<m;i++) {
      if( (tmp=Math.abs(U.get(P[i],k))) > umax ) {
        umax = tmp, imax=i
      }
    }
    i = imax
    Uk = U.pick(k,null)
    blas.swap( L.pick(k,null).hi(k), L.pick(i,null).hi(k) )
    tmp=P[i], P[i]=P[k], P[k]=tmp
    Ukk = U.get(P[k],k)
    for(j=k+1; j<m; j++) {
      Ljk = U.get(P[j],k)/Ukk
      L.set(j,k,Ljk)
      blas.axpy(-Ljk, U.pick(P[k],null).lo(k).hi(m-k), U.pick(P[j],null).lo(k).hi(m-k))
    }
  }

  return [ L, U, P ]
}*/
