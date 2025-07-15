# 6. Build a command-line utility using `argparse` to perform arithmetic operations.

import argparse

parser = argparse.ArgumentParser(description="Simple arithmetic calculator")

parser.add_argument("num1", type=float, help="First number")
parser.add_argument("num2", type=float, help="Second number")
parser.add_argument("operation", choices=["add", "sub", "mul", "div"], help="Operation to perform")

args = parser.parse_args()

if args.operation == "add":
    result = args.num1 + args.num2
elif args.operation == "sub":
    result = args.num1 - args.num2
elif args.operation == "mul":
    result = args.num1 * args.num2
elif args.operation == "div":
    if args.num2 == 0:
        result = "Error: Cannot divide by zero"
    else:
        result = args.num1 / args.num2

print("Result:", result)
