def process_numbers(numbers):
    return list(
        map(lambda x: x * 2, filter(lambda x: x % 2 == 0, numbers))
    )

result = process_numbers([1, 2, 3, 4, 5, 6])
print(result) 