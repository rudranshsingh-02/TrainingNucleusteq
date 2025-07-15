# 10. Implement a memoized version of the Fibonacci sequence.

def fibonacci(n, memo={}):
    if n in memo:
        return memo[n] 
    if n <= 1:
        return n
    memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)
    return memo[n]


print(fibonacci(6))
