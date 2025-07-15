# 3. Write a program that uses `random` to generate a password of given length.

import random
import string

def generate_password(length):
    characters = string.ascii_letters + string.digits  # A–Z, a–z, 0–9
    password = ''
    for _ in range(length):
        password += random.choice(characters)
    return password

length = int(input("Enter password length: "))
print("Generated password:", generate_password(length))
