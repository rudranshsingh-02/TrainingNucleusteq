# 4. Create a function that returns the nth Fibonacci number using recursion.

def fibonacci(n):
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)
        
n = int(input("Enter a number : "))
print("fibonacci number is :", fibonacci(n))
