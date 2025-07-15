class InvalidAgeError(Exception):
    pass

def check_age(age):
    if age < 0 or age > 120:
        raise InvalidAgeError("Invalid age entered. Age must be between 0 and 120.")
    else:
        print(f"Valid age: {age}")

try:
    age = int(input("Enter your age: "))
    check_age(age)
except InvalidAgeError as e:
    print(e)
except ValueError:
    print("Please enter a valid integer.")
