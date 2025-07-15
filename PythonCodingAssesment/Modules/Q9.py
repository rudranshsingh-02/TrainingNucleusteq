# 9. Use `importlib` to dynamically import a module and invoke a func

import importlib

module_name = input("Enter module to use: ")
function_name = input("Enter function to use: ")

import importlib

module_name = input("Enter module to use: ")
function_name = input("Enter function to use: ")

try:
    mod = importlib.import_module(module_name)
    func = getattr(mod, function_name)
    num1 = int(input("Enter number1: "))
    num2 = int(input("Enter number2: "))
    result = func(num1, num2)
    print(f"Result: {result}")

except ModuleNotFoundError:
    print(f"Error: Module '{module_name}' not found.")
except AttributeError:
    print(f"Error: Function '{function_name}' not found in module '{module_name}'.")
except Exception as e: # catch all other exceptions
    print(f"An error occurred: {e}")