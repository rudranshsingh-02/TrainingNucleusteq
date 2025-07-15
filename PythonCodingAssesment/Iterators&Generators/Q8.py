def infinite_fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib_gen = infinite_fibonacci()
for _ in range(10):
    print(next(fib_gen))
