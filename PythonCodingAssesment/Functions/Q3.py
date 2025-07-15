# 3. Write a function that accepts a list and returns the sum and average of the numbers.

def sum_and_average(numbers):
    total = sum(numbers)
    avg = total / len(numbers) if numbers else 0
    return total, avg

numbers = list(map(int, input("Enter numbers separated by spaces: ").split()))
total, average = sum_and_average(numbers)
print("The sum of numbers is:",total , "and the average is:", average)
