'use strict'

var lup = require('../lib'),
    pool = require('ndarray-scratch'),
    ndt = require('ndarray-tests'),
    ndarray = require('ndarray'),
    assert = require('assert'),
    show = require('ndarray-show'),
    gemm = require('ndgemm')

describe('lup',function() {

  var A, L, U, LU, P

  beforeEach(function() {

    // The example from p.157 of Trefethen and Bau's Numerical Linear Algebra:
    A = ndarray([2,1,1,0, 4,3,3,1, 8,7,9,5, 6,7,9,8], [4,4])
    L = pool.zeros([4,4])
    U = pool.zeros([4,4])
    LU = pool.zeros([4,4])
    P = [0,1,2,3]
  })

  it('factors a matrix',function() {
    lup(A, L, P)

    var Aexp = ndarray([8,7,9,5, 0,7/4,9/4,17/4, 0,0,-6/7,-2/7, 0,0,0,2/3],[4,4])
    var Lexp = ndarray([1,0,0,0, 3/4,1,0,0, 1/2,-2/7,1,0, 1/4,-3/7,1/3,1],[4,4])
    var Pexp = [2,3,1,0]


    console.log('L = \n'+show(L.transpose(1,0)))
    console.log('U = \n'+show(A.transpose(1,0)))
    console.log('P =',P)

    assert( ndt.approximatelyEqual( Aexp, A, 1e-8 ) )
    assert( ndt.approximatelyEqual( Lexp, L, 1e-8 ) )
    assert( ndt.approximatelyEqual( ndarray(Pexp), ndarray(P)) )

    gemm(LU,L,A)

    console.log(show(LU.transpose(1,0)))

  })
})

