import logging

logging.basicConfig(filename='decorator_errors.log', level=logging.ERROR)

def exception_logger(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            logging.error(f"Exception in {func.__name__}: {e}")
            print(f"An error occurred in {func.__name__}. Check decorator_errors.log.")
    return wrapper

@exception_logger
def divide(a, b):
    return a / b

divide(10, 0)
