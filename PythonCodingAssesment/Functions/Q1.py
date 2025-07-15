# 1. Write a function to calculate the factorial of a number (non-recursive).

def factorial(n):
    ans = 1
    for i in range(2, n + 1):
        ans *= i
    return ans

number = int(input("Enter a number to determine its factorial : "))
print(factorial(number))
