class InvalidNameError(Exception):
    pass

class InvalidAgeError(Exception):
    pass

def validate_user(name, age):
    if not name.isalpha():
        raise InvalidNameError("Name must contain only alphabetic characters.")
    if age < 0 or age > 120:
        raise InvalidAgeError("Age must be between 0 and 120.")
    print(f"User {name} with age {age} is valid.")

try:
    name = input("Enter name: ")
    age = int(input("Enter age: "))
    validate_user(name, age)
except InvalidNameError as e:
    print(f"Name Error: {e}")
except InvalidAgeError as e:
    print(f"Age Error: {e}")
except ValueError:
    print("Please enter a valid age as an integer.")
