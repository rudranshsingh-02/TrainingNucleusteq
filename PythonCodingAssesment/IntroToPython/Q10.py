# 10. Implement a basic number guessing game where the computer selects a random number.

import random
number = random.randint(1, 10)
guess = int(input("Guess a number between 1 and 10: "))
if guess == number:
    print("Correct! You guessed it.")
elif (guess>10) or (guess<1):
    print("Please choose a number between 1 and 10.")
else:
    print("Wrong! The number was", number)
