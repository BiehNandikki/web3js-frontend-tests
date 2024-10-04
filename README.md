# Web3 Benchmarking tool

This library is a benchmarking tool to measure the time between the same methods across Web3.js, Viem, Ethers.
These browser tests are run within cypress and will export the results to a CSV. 

## Getting Started

1. install dependancies `yarn`

2. run test server `npx cypress open`

3. choose component testing and pick the browser you would like your tests to run in - Google chrome works best

**Note**

To create an ethers provider you must add a provider.