# 6. Create a program that simulates a simple calculator supporting +, -, *, / with input parsing.

num1 = int(input("Enter number 1: "))
num2 = int(input("Enter number 2: "))

operation = input("Choose an operation to perform (+, -, *, /): ")

if operation == '+':
    print("Addition:", num1 + num2)
elif operation == '-':
    print("Subtraction:", num1 - num2)
elif operation == '*':
    print("Multiplication:", num1 * num2)
elif operation == '/':
    if num2 == 0:
        print("Error: Divisor cannot be zero.")
    else:
        print("Division:", num1 / num2)
else:
    print("Invalid operation selected.")
