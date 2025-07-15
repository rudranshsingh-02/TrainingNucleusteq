def multiply(a):
    def inner(b):
        return a * b
    return inner

double = multiply(2)
triple = multiply(3)

print(double(5))  # 10
print(triple(4))  # 12
