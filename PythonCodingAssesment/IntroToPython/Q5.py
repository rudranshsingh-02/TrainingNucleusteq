# 5. Write a script that swaps two variables without using a third variable.

a = int(input("Enter value of a: "))
b = int(input("Enter value of b: "))

a, b = b, a 

print("After swapping:")
print("a =", a)
print("b =", b)
