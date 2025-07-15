# 8. Develop a program to convert a given temperature from Celsius to Fahrenheit and vice versa.

choice = input("Convert to (F)ahrenheit or (C)elsius? ").lower()
# choose c for celsius or f for fahrenheit
temp = float(input("Enter the temperature: "))

if choice == 'f':
    print("In Fahrenheit:", (temp * 9/5) + 32)
elif choice == 'c':
    print("In Celsius:", (temp - 32) * 5/9)
else:
    print("Invalid choice.")
