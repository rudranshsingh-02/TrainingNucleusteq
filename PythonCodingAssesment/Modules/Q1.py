# 1. Create a custom module with functions to add, subtract, multiply, and divide two numbers.

import Calculator

a = int(input("Enter first number: "))
b = int(input("Enter second number: "))

print("Addition:", Calculator.add(a, b))
print("Subtraction:", Calculator.subtract(a, b))
print("Multiplication:",Calculator.multiply(a, b))
print("Division:", Calculator.divide(a, b))
