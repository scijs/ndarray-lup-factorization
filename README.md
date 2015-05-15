# ndarray-lup-factorization-2 is deprecated. Please use [ndarray-lup-factorization](https://www.npmjs.com/package/ndarray-lup-factorization) instead.

# ndarray-lup-factorization-2

[![Build Status](https://travis-ci.org/scijs/ndarray-lup-factorization-2.svg?branch=master)](https://travis-ci.org/scijs/ndarray-lup-factorization-2) [![npm version](https://badge.fury.io/js/ndarray-lup-factorization-2.svg)](http://badge.fury.io/js/ndarray-lup-factorization-2)  [![Dependency Status](https://david-dm.org/scijs/ndarray-lup-factorization-2.svg)](https://david-dm.org/scijs/ndarray-lup-factorization-2)

LU factorization with pivoting for ndarrays

## Introduction

This module performs an in-place LUP factorization (LU with partial pivoting) on matrix A. Be advised that the rows are physically swapped which is slightly sub-optimal.

The resulting factorization is PA = LU where P is a permutation matrix.

For an alternate version, see: [ndarray-lup-factorization](https://github.com/scijs/ndarray-lup-factorization)

## Installation

`npm install ndarray-lup-factorization-2`

## Usage

Sample usage:

```javascript
var lup = require('ndarray-lup-factorization-2')

var P = [],
    A = ndarray([1,2,6,3],[2,2])

lup.factorize( A, A, P )
```


#### `factorize( A, L, P )`

Inputs:
- A: An n x n ndarray. This matrix is overwritten during the factorization. At the end of the factorization, the upper-triangular portion contains U and the lower-triangular portion contains zeros.
- L: An n x n ndarray. At the end of the factorization, this array contains the lower-triangular portion of the factorization with ones on the diagonal.
- P: An `Array`. At the end of the factorization, this contains a vector representation of the permutation matrix. The P[i]th element of the ith row of the permutation matrix is one; all others elements are zero.

Returns:
`true` upon successful completion; `false` otherwise.

#### `factorize( A, A, P )`

- A: An n x n ndarray. If the first and second arguments are identical, both L and U are stored in the A matrix. U is the upper triangular portion (including diagonal) and L is the lower-triangular portion (excluding diagonal; ones on the diagonal are implicit).
- P: An `Array`. At the end of the factorization, this contains a vector representation of the permutation matrix for which the P[i]th element of the ith row of the permutation matrix is one and all others elements are zero.

Returns:
`true` upon successful completion; `false` otherwise.

## Credits
(c) 2015 Ricky Reusser. MIT License

