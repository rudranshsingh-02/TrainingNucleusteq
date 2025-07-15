# 2. Use the `math` module to calculate square root, factorial, and power of a number.
import math

try:
    num1 = int(input("Enter a number to calculate its square-root: "))
    if num1 < 0:
        print("Cannot calculate the square root of a negative number.")
    else:
        print("The square root is:", math.sqrt(num1))
except ValueError:
    print("Please enter a valid number for square root.")

try:
    num2 = int(input("Enter a number to calculate its factorial: "))
    if num2 < 0:
        print("Factorial is not defined for negative numbers.")
    else:
        print("The factorial is:", math.factorial(num2))
except ValueError:
    print("Please enter a valid integer for factorial.")

try:
    num3 = float(input("Enter a number to calculate its power: "))
    num3_power = float(input("Enter the power: "))
    print(f"{num3} raised to the power {num3_power} is:", math.pow(num3, num3_power))
except ValueError:
    print("Please enter valid numbers for power calculation.")