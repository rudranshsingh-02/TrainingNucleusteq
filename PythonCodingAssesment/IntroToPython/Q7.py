# 7. Write a Python script to determine if a given number is a prime number.

number = int(input("Enter a number: "))
flag = False

if number <= 1:
    flag = True

for i in range(2, number):
    if number % i == 0:
        flag = True
        break  

if flag:
    print(number, "is not a prime number.")
else:
    print(number, "is a prime number.")
