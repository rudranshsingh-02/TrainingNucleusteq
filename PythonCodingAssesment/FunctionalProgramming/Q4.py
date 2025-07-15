def apply_function(func, data):
    return [func(item) for item in data]

result = apply_function(lambda x: x * 2, [1, 2, 3, 4])
print(result)
