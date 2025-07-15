def nested_error_handling():
    try:
        num = int(input("Enter a number: "))
        try:
            result = 10 / num
            print(f"Result: {result}")
        except ZeroDivisionError:
            print("Error: Division by zero.")
    except ValueError:
        print("Error: Invalid input. Please enter a number.")

nested_error_handling()
