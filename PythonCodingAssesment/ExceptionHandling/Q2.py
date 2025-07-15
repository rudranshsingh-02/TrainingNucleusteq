def get_integer_input():
    try:
        num = int(input("Enter an integer: "))
        print(f"You entered: {num}")
    except ValueError:
        print("Invalid input. Please enter a valid integer.")

get_integer_input()
