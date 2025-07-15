# 6. Implement a decorator that measures execution time of any function.

import time

def decorator(func):
    def wrapper():
        start_time = time.time()
        func()
        end_time = time.time()
        print("Execution time for this function is: ", end_time-start_time)
    return wrapper
    
@decorator
def hello_world():
    print("Hello World!")
        
hello_world()