# 6. Implement a function that validates a strong password based on given criteria.

import string

def check_password(password):
    if len(password) < 8:
        return "Password too short. Must be at least 8 characters."

    has_upper = any(char.isupper() for char in password)
    has_lower = any(char.islower() for char in password)
    has_digit = any(char.isdigit() for char in password)
    has_special = any(char in string.punctuation for char in password)

    if not has_upper:
        return "Password must contain at least one uppercase letter."
    if not has_lower:
        return "Password must contain at least one lowercase letter."
    if not has_digit:
        return "Password must contain at least one digit."
    if not has_special:
        return "Password must contain at least one special character."

    return "Strong password!"

password = input("Enter a password : ")
print(check_password(password))