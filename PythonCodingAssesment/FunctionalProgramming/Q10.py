def compose(*functions):
    def composed(x):
        for f in reversed(functions):
            x = f(x)
        return x
    return composed

def add2(x): return x + 2
def multiply3(x): return x * 3
def square(x): return x * x

pipeline = compose(square, multiply3, add2)
print(pipeline(2)) 
