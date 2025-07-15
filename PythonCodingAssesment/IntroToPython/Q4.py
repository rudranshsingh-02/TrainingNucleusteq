# 4. Develop a Python program that reverses a given integer.

num = int(input("Enter a number: "))
reversed_num = int(str(abs(num))[::-1])
if num < 0:
    reversed_num = -reversed_num
print("Reversed number:", reversed_num)
