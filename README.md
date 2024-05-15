
# Getting started

1. `cd react-benchmark && yarn && yarn start` # <http://localhost:3000>
2. `cd solid-benchmark && yarn && yarn dev` # <http://localhost:3001>

## Rendered 50.000 elements without images

- react: 1.3907000000476837s
- solid: 0.17160000002384185s

> ~8.10 faster

## Rendered 50.000 elements with the same image

- react: 3.3494000000953674 seconds
- solid: 2.0585 seconds

> ~1.63 faster

## Rendered 10.000 elements with unique images

- react: 6.283 seconds
- solid: 10.876100000023841 seconds

> ~1.73 slower
